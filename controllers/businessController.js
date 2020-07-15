const Business = require('../models/Business');
const axios = require('axios');
require('dotenv').config({ path : "variables.env"});

const mostrarRegistroEmpresa = (req,res) => {
  res.render('admin/crear-empresa',{
    title: 'Administrador'
  })
}

const mostrarInformacionEmpresa = (req,res) => {
  res.render('admin/listar-empresa',{
    title: 'Administrador'
  })
}

const mostrarModificarEmpresa = (req,res) => {
  res.render('admin/modificar-empresa',{
    title: 'Administrador'
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


  const {ruc,nombreComercial,razonSocial,tipo,estado,direccion,
    departamento,provincia,distrito,web,facebook,red} = req.body;
  const redes = {web,facebook,red};


  const business = new Business({
    administrador: req.administrator._id,
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

module.exports = {
  validarRUC,
  registrarEmpresa,
  mostrarRegistroEmpresa,
  mostrarInformacionEmpresa,
  mostrarModificarEmpresa
}