const Business = require('../models/Business');
const Administrator = require('../models/Administrator');
const {existsCompetitionSimple,existsCatalogoBusiness} = require('../middlewares/exists');
const axios = require('axios');
require('dotenv').config({ path : "variables.env"});

const mostrarRegistroEmpresa = async(req,res) => {
  const administrator = await Administrator.findById(req.user._id).lean();
  const existeConcursoSimple = await existsCompetitionSimple(req.user._id);
  const existeCatalogoBusiness = await existsCatalogoBusiness(req.user._id);
  res.render('admin/crear-empresa',{
    title: 'Administrador',
    admin: administrator,
    existeConcursoSimple,
    existeCatalogoBusiness
  })
}//mostrara el registro de la empresa

const mostrarInformacionEmpresa = async(req,res) => {
  const administrator = await Administrator.findById(req.user._id).lean();
  // console.log(administrator);
  const business = await Business.findOne({administrador: administrator._id}).lean();
  const existeConcursoSimple = await existsCompetitionSimple(req.user._id);
  const existeCatalogoBusiness = await existsCatalogoBusiness(req.user._id);
  // console.log(business)
  res.render('admin/listar-empresa',{
    title: 'Administrador',
    admin: administrator,
    empresa: business,
    existeConcursoSimple,
    existeCatalogoBusiness
  })
}//mostrara informacion de la empresa

const mostrarModificarEmpresa = async(req,res) => {
  const administrator = await Administrator.findById(req.user._id).lean();
  // console.log(administrator);
  const business = await Business.findOne({administrador: administrator._id}).lean();
  const existeConcursoSimple = await existsCompetitionSimple(req.user._id);
  const existeCatalogoBusiness = await existsCatalogoBusiness(req.user._id);
  // console.log(business)
  res.render('admin/modificar-empresa',{
    title: 'Administrador',
    admin: administrator,
    empresa: business,
    existeConcursoSimple,
    existeCatalogoBusiness
  })
}// mostrara modificacion de la empresa

const validarRUC = async(req,res) => {
  const {ruc} = req.body;
  const url = `${process.env.LINK_API_RUC}/${ruc}?token=${process.env.API_KEY}`;
  console.log(url);

  try {
    const response = await axios.get(url);
    return res.json({
      ok: true,
      business: response.data
    });
  } catch (error) {
    // console.log(error);
    console.log("error 404");
    return res.status(404).json({
      ok: false,
      err: {
        msg: "El RUC ingresado no existe"
      }
    });
  }
}//validando ruc

const registrarEmpresa = async(req,res) => {

  console.log(req.user);
  const rucBusiness = req.body.ruc;
  const administrator = await Administrator.findById(req.user._id).catch((err) => {
    return res.status(400).json({
      ok: false,
      err
    });
  })

  if(!administrator) return res.status(400).json({
    ok: false,
    err: {
      msg: "El administrator no existe o no tiene permisos"
    }
  });//registro de empresa

  // validamos que sea unica
  let business = await Business.findOne({ruc: rucBusiness}).catch((err) => {
    return res.status(400).json({
      ok: false,
      err
    });
  });
  console.log("hay empresa");
  if(business) return res.status(400).json({
    ok: false,
    err: {
      msg: "La empresa ya se encuentra registrada"
    }
  });

  // se valido y se crea una nueva
  const {ruc,nombreComercial,razonSocial,tipo,estado,direccion,
    departamento,provincia,distrito,web,facebook,red} = req.body;
  const redes = {web,facebook,red};


  business = new Business({
    administrador: req.user._id,
    ruc,
    nombreComercial,
    razonSocial,
    tipo,
    estado,
    direccion,
    departamento,
    provincia,
    distrito,
    redes
  });

  await business.save().catch((err) => {
    return res.status(400).json({
      ok: false,
      err
    });
  });

  // actualizar el estado del administrador
  administrator.estado = true;
  try {
    await administrator.save();
  } catch (error) {
    return res.status(400).json({
      ok: false,
      err
    });
  }

  res.json({
    ok: true,
    business
  });
}

const agregarAvatarEmpresa = async(req,res) => {
  const id = req.user._id;
  const administrator = await Administrator.findById(id).catch((err) => {
    return res.status(400).json({
      ok: false,
      err
    });
  })

  if(!administrator) return res.status(400).json({
    ok: false,
    err: {
      msg: "El administrator no existe o no tiene permisos"
    }
  });

  const business = await Business.findOne({administrador: administrator._id}).catch((err) => {
    return res.status(400).json({
      ok: false,
      err
    });
  });

  if(!business) return res.status(400).json({
    ok: false,
    err: {
      msg: "El administrator no tiene relación con la empresa"
    }
  });

  if(req.file){
    business.imagen = req.file.filename;
  }

  try {
    await business.save();
  } catch (err) {
    return res.status(400).json({
      ok: false,
      err: {
        msg: "No se pudo guardar la imagen"
      }
    }); 
  }

  res.json({
    ok: true,
    business
  });


}

const modificarEmpresa = async(req,res) => {
  const id = req.user._id;
  const {web,facebook,red} = req.body;
  const redes = {web,facebook,red};
  const data = {
    redes: redes
  }
  console.log(req.body)
  console.log(data)
  const business = await Business.findOneAndUpdate({administrador: id},data,{new: true, runValidators: true}).catch((err) => {
    return res.status(400).json({
      ok: false,
      err
    });
  })

  if(!business) return res.status(400).json({
    ok: false,
    err: {
      msg: "La empresa no se encuentra registrada"
    }
  });


  res.json({
    ok: true,
    business
  });


}

module.exports = {
  validarRUC,
  registrarEmpresa,
  mostrarRegistroEmpresa,
  mostrarInformacionEmpresa,
  mostrarModificarEmpresa,
  agregarAvatarEmpresa,
  modificarEmpresa
}