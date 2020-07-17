const Administrator = require('../models/Administrator');
const Business = require('../models/Business');
const Competition = require('../models/Competition');

const existsCompetitionSimple = async (idAdministrator) => {
  // buscamos administrador
  let existe = false;
  const administrator = await Administrator.findById(idAdministrator);
  console.log(administrator)
  if(!administrator) return existe;

  const business = await Business.findOne({administrador: administrator._id});
  console.log(business);
  if(!business) return existe;

  // buscar concurso simple referente a la empresa de
  const competition = await Competition.findOne({business: business._id});

  if(!competition){
    return existe;
  }
  

  if(competition.tipo === "simple"){
    existe = true;
    return existe;
  }
  
}

module.exports =  {
  existsCompetitionSimple
}