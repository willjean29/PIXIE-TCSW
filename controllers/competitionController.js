const Competition = require('../models/Competition');
const Business = require('../models/Business');
const Administrator = require('../models/Administrator');
const moment = require('moment');

const mostrarCrearConmcursoSimple = (req,res) => {
  res.render('admin/crear-concurso-simple',{
    title: 'Administrador'
  });
}

const mostrarConcursoSimple = async(req,res) => {
  const administrator = await Administrator.findById(req.user._id).lean();
  const business = await Business.findOne({administrador: administrator._id}).lean();
  console.log(business)
  const competition = await Competition.findOne({business: business.administrador}).lean();

  console.log(competition.reglas.parametro)
  res.render('admin/listar-concurso-simple',{
    title: 'Administrador',
    admin: administrator,
    empresa: business,
    concurso: competition,
  });
}

const mostrarModificarConcursoSimple = async(req,res) => {
  console.log("hola modifcar");
  const administrator = await Administrator.findById(req.user._id).lean();
  const business = await Business.findOne({administrador: administrator._id}).lean();
  const competition = await Competition.findOne({business: business.administrador}).lean();

  let fechaInicio = moment(competition.fechaInicio).format('L');
  console.log(fechaInicio);
  res.render('admin/modificar-concurso-simple',{
    title: 'Administrador',
    admin: administrator,
    empresa: business,
    concurso: competition,
    fechaInicio
  });
}

const registrarConcurso = async(req,res) => {
  console.log(req.body);
  console.log(req.user);
  const idAdministrator = req.user._id;
  // conmprobar que el administrador cuente con una empresa asociada
  const business = await Business.findOne({administrador: idAdministrator}).catch((err) => {
    return res.status(400).json({
      ok: false,
      err
    });
  })
  console.log(business);
  if(!business) return res.status(400).json({
    ok: false,
    err: {
      msg: "El Administrador no cuenta con una empresa asociada"
    }
  });

  const {name,fechaInicio,fechaFin,soles,puntos,tipo} = req.body;

  const reglas = {parametro : soles,puntos}
  const competition = new Competition({
    name,
    fechaInicio,
    business: req.user._id,
    fechaFin,
    tipo,
    reglas
  });

  console.log(competition);
  await competition.save().catch((err) => {
    return res.status(400).json({
      ok: false,
      err
    });
  });

  res.json({
    ok: true,
    competition,
    msg: "Concurso Registro"
  });
}

module.exports = {
  mostrarCrearConmcursoSimple,
  registrarConcurso,
  mostrarConcursoSimple,
  mostrarModificarConcursoSimple
}