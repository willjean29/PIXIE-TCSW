const Competition = require('../models/Competition');
const Business = require('../models/Business');
const Administrator = require('../models/Administrator');
const {existsCompetitionSimple} = require('../middlewares/exists');
const moment = require('moment');

const mostrarCrearConmcursoSimple = async(req,res) => {
  const administrator = await Administrator.findById(req.user._id).lean();
  const existeConcursoSimple = await existsCompetitionSimple(req.user._id);
  res.render('admin/crear-concurso-simple',{
    title: 'Administrador',
    admin: administrator,
    existeConcursoSimple
  });
}

const mostrarConcursoSimple = async(req,res) => {
  const administrator = await Administrator.findById(req.user._id).lean();
  const existeConcursoSimple = await existsCompetitionSimple(req.user._id);
  const business = await Business.findOne({administrador: administrator._id}).lean();
  console.log(business)
  const competition = await Competition.findOne({business: business._id}).lean();
  console.log(competition);
  let fechaInicio = moment(competition.fechaInicio).add(1, 'day').format('L'); 
  let fechaFin = moment(competition.fechaFin).add(1, 'day').format('L'); 
  console.log(competition.reglas.parametro)
  res.render('admin/listar-concurso-simple',{
    title: 'Administrador',
    admin: administrator,
    empresa: business,
    concurso: competition,
    fechaFin,
    fechaInicio,
    existeConcursoSimple
  });
}

const mostrarModificarConcursoSimple = async(req,res) => {
  console.log("hola modifcar");
  const administrator = await Administrator.findById(req.user._id).lean();
  const business = await Business.findOne({administrador: administrator._id}).lean();
  const competition = await Competition.findOne({business: business._id}).lean();
  const existeConcursoSimple = await existsCompetitionSimple(req.user._id);
  let fechaInicio = moment(competition.fechaInicio).add(1, 'day').format('L'); 
  let fechaFin = moment(competition.fechaFin).add(1, 'day').format('L'); 
  console.log(fechaInicio);
  res.render('admin/modificar-concurso-simple',{
    title: 'Administrador',
    admin: administrator,
    empresa: business,
    concurso: competition,
    fechaInicio,
    fechaFin,
    existeConcursoSimple
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
    business: business._id,
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

const agregarAvatarCompetition = async (req,res) => {
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

  const competition = await Competition.findOne({business: business._id}).catch((err) => {
    return res.status(400).json({
      ok: false,
      err
    });
  })

  if(!competition) return res.status(400).json({
    ok: false,
    err: {
      msg: "No se ha encontrado ningún concurso"
    }
  });

  if(req.file){
    competition.image = req.file.filename;
  }

  try {
    await competition.save();
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
    competition
  });
}

const modificarCompetition = async(req,res) => {
  const id = req.user._id;
  const {soles,puntos} = req.body;
  const reglas = {parametro : soles,puntos};
  const data = {
    ...req.body,
    reglas
  };
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

  const competition = await Competition.findOneAndUpdate({business: business._id},data,{new: true, runValidators: true}).catch((err) => {
    return res.status(400).json({
      ok: false,
      err
    });
  })

  if(!competition) return res.status(400).json({
    ok: false,
    err: {
      msg: "El concurso no se encuntra registrado"
    }
  });

  res.json({
    ok: true,
    competition
  });
}

module.exports = {
  mostrarCrearConmcursoSimple,
  registrarConcurso,
  mostrarConcursoSimple,
  mostrarModificarConcursoSimple,
  agregarAvatarCompetition,
  modificarCompetition
}