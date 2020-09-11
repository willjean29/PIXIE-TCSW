const moment = require('moment');
const Logger = require('../config/loggerService');
const logger = new Logger('app');
const microprofiler = require('microprofiler');
const Administrator = require('../models/Administrator');
const Business = require('../models/Business');
const Competition = require('../models/Competition');
const File = require('../models/File');
const cloudinary = require('../config/cloudinary');
const fs = require('fs-extra');
const {existsCompetitionSimple,existsCatalogoBusiness} = require('../middlewares/exists');
const {premiosTotales, registrosTotales, clientesTotales, 
  concursosActivvos, clientesTop, clientesEstado, productosTop, clientesGeneros
} = require('../utils/statistics');

const mostrarTemplateAdministrador = async(req,res) => {
  let start = microprofiler.start();

  const administrator = await Administrator.findById(req.user._id).lean();
  const business = await Business.findOne({administrador: administrator._id});

  const existeConcursoSimple = await existsCompetitionSimple(req.user._id);
  const existeCatalogoBusiness = await existsCatalogoBusiness(req.user._id);
  const filesVentas = await File.find({business: business._id}).lean();
  
  res.render('admin/descargar-template',{
    title: 'Administrador',
    admin: administrator,
    existeConcursoSimple,
    existeCatalogoBusiness,
    filesVentas,

  })
  let elapsedUs = microprofiler.measureFrom(start,'code');
  let stats = microprofiler.getStats('code');
  logger.debug('Procesar request mostrarTemplateAdministrador',stats)
}
const mostrarAdminArea = async(req,res) => {
  let totalPremios,totalRegistros,totalConcursos,totalClientes,premios;
  let start = microprofiler.start();

  const administrator = await Administrator.findById(req.user._id).lean();
  const existeConcursoSimple = await existsCompetitionSimple(req.user._id);
  const existeCatalogoBusiness = await existsCatalogoBusiness(req.user._id);
  if(existeConcursoSimple && existeCatalogoBusiness){
    totalPremios = await premiosTotales(req.user._id);
    totalRegistros = await registrosTotales(req.user._id);
    totalConcursos = await concursosActivvos(req.user._id);
    premios = await productosTop(req.user._id);
    totalClientes = await clientesTotales(req.user._id);
    // let {puntos, info} = await clientesTop(req.user._id);
    // let estadoClientes = await clientesEstado(req.user._id);
  }

  res.render('admin/admin-area',{
    title: 'Administrador',
    admin: administrator,
    existeConcursoSimple,
    existeCatalogoBusiness,
    totalPremios,
    totalRegistros,
    totalClientes,
    totalConcursos,
    // puntos,
    // info,
    // estadoClientes,
    premios
  });
  let elapsedUs = microprofiler.measureFrom(start,'code');
  let stats = microprofiler.getStats('code');
  logger.debug('Procesar request mostrarAdminArea',stats)
}

const mostrarInformacionAdministrador = async(req,res) => {
  let start = microprofiler.start();
  const administrator = await Administrator.findById(req.user._id).lean();
  const existeConcursoSimple = await existsCompetitionSimple(req.user._id);
  let fechaNacimiento = moment(administrator.fechaNacimiento).add(1, 'day').format('L'); 
  const existeCatalogoBusiness = await existsCatalogoBusiness(req.user._id);

  res.render('admin/listar-admin',{
    title: 'Administrador',
    admin: administrator,
    fechaNacimiento,
    existeConcursoSimple,
    existeCatalogoBusiness
  })
  let elapsedUs = microprofiler.measureFrom(start,'code');
  let stats = microprofiler.getStats('code');
  logger.debug('Procesar request mostrarInformacionAdministrador',stats)
}

const mostrarVistaPrevia = async(req,res) => {
  const administrator = await Administrator.findById(req.user._id).lean();
  const business = await Business.findOne({administrador: administrator._id}).lean();
  const existeConcursoSimple = await existsCompetitionSimple(req.user._id);
  const existeCatalogoBusiness = await existsCatalogoBusiness(req.user._id);
  res.render('admin/listar-info-empresa',{
    title: 'Administrador',
    admin: administrator,
    empresa: business,
    existeConcursoSimple,
    existeCatalogoBusiness,
  });
}

const agregarAdministrador = async(req,res) => {

  const data = req.body;
  const {dni,email} = req.body;
  // validar que no exista alguien registrado con el mismo dni o correo
  let admin = await Administrator.findOne({dni: dni});

  if(admin){
    return res.status(400).json({
      ok: false,
      msg: "El dni ya se encuentra registrado"
    });
  }
  admin = await Administrator.findOne({email: email});

  if(admin) {
    return res.status(400).json({
      ok: false,
      msg: "El correo ya se encuentra registrado"
    });
  }
  // se registra un nuevo adminsitrador
  const administrator = new Administrator(data);
  await administrator.save().catch((error) => {
    return res.status(400).json({
      ok: false,
      error
    });
  });

  res.json({
    ok: true,
    administrator,
    msg: "Administrador registrado con exito"
  });
}

const obtenerAdministratorID = async(req,res) => {
  let id = req.params.id;
  const administrator = await Administrator.findById(id).catch((err) => {
    return res.status(401).status({
      ok: false,
      err
    });
  });

  if(!administrator) return res.status(400).json({
    ok: false,
    err: {
      msg: "El administrador no existe"
    }
  });

  res.json({
    ok: true,
    administrator
  });
}

const obtenerAdministradorActual = async(req,res) => {

  const administrator = await Administrator.findById(req.administrator._id).catch((err) => {
    return res.status(500).json({
      ok: false,
      err
    });
  });

  if(!administrator) return res.status(400).json({
    ok: false,
    err: {
      msg : "EL administrador no existe"
    }
  });

  res.json({
    ok: true,
    administrator
  });
}

const modificarAdministrador = async(req,res) => {

  const id = req.user._id;
  
  const data = req.body;
  const administrator = await Administrator.findByIdAndUpdate(id,data,{new: true, runValidators: true})
    .catch((err) => {
      return res.status(500).json({
        ok: false,
        err
      });
    })
  if(!administrator) return res.status(400).json({
    ok: false,
    err: {
      msg: "El administrador no existe"
    }
  });

  res.json({
    ok: true,
    administrator
  });
}

const agregarAvatarAdministrador = async(req,res) => {
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

  if(req.file){
    const result = await cloudinary.v2.uploader.upload(req.file.path);
    administrator.image = result.secure_url;
    await fs.unlink(req.file.path);
  }

  try {
    await administrator.save();
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
    administrator
  });
  // res.redirect('/admin/profile');
}

const obtenerAdministradores = (req,res) => {
  res.json({
    admin : req.administrator
  })
}

const statusGenero = async(req,res) => {
  let generoClientes = await clientesGeneros(req.user._id);
  res.json({
    generoClientes
  })
}

const statusCuenta = async(req,res) => {
  let estadoClientes = await clientesEstado(req.user._id);
  res.json({
    estadoClientes
  })
}

const statusPuntos = async(req,res) => {
  let [infoClientes,puntosClientes] = await clientesTop(req.user._id);
  res.json({
    infoClientes,
    puntosClientes,
  })
}


module.exports = {
  mostrarTemplateAdministrador,
  mostrarAdminArea,
  agregarAdministrador,
  obtenerAdministradores,
  obtenerAdministratorID,
  obtenerAdministradorActual,
  mostrarInformacionAdministrador,
  modificarAdministrador,
  agregarAvatarAdministrador,
  statusGenero,
  statusCuenta,
  statusPuntos,
  mostrarVistaPrevia
}