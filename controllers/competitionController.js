const Competition = require('../models/Competition');
const Business = require('../models/Business');
const mostrarCrearConmcursoSimple = (req,res) => {
  res.render('admin/crear-concurso-simple',{
    title: 'Administrador'
  });
}

const registrarConcurso = async(req,res) => {
  console.log(req.body)
  console.log(req.administrator);
  const idAdministrator = req.administrator._id;
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
    business: req.administrator._id,
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
  registrarConcurso
}