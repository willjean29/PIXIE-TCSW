const Business = require('../models/Business');
const Administrator = require('../models/Administrator');
const axios = require('axios');
require('dotenv').config({ path : "variables.env"});

const mostrarRegistroEmpresa = async(req,res) => {
  const administrator = await Administrator.findById(req.user._id).lean();
  res.render('admin/crear-empresa',{
    title: 'Administrador',
    admin: administrator
  })
}

const mostrarInformacionEmpresa = async(req,res) => {
  const administrator = await Administrator.findById(req.user._id).lean();
  // console.log(administrator);
  const business = await Business.findOne({administrador: administrator._id}).lean();
  // console.log(business)
  res.render('admin/listar-empresa',{
    title: 'Administrador',
    admin: administrator,
    empresa: business
  })
}

const mostrarModificarEmpresa = async(req,res) => {
  const administrator = await Administrator.findById(req.user._id).lean();
  // console.log(administrator);
  const business = await Business.findOne({administrador: administrator._id}).lean();
  // console.log(business)
  res.render('admin/modificar-empresa',{
    title: 'Administrador',
    admin: administrator,
    empresa: business
  })
}

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
}

const registrarEmpresa = async(req,res) => {

  console.log(req.user);
  const {ruc,nombreComercial,razonSocial,tipo,estado,direccion,
    departamento,provincia,distrito,web,facebook,red} = req.body;
  const redes = {web,facebook,red};


  const business = new Business({
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

module.exports = {
  validarRUC,
  registrarEmpresa,
  mostrarRegistroEmpresa,
  mostrarInformacionEmpresa,
  mostrarModificarEmpresa,
  agregarAvatarEmpresa
}