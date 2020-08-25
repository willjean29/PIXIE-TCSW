const Prize = require('../models/Prize');
const File = require('../models/File');
const Client = require('../models/Client');
const Business = require('../models/Business');
const Competition = require('../models/Competition');
const Catalog = require('../models/Catalog');

const premiosTotales = async(idAdministrator) => {
  const business = await Business.findOne({administrador: idAdministrator});
  const catalog = await Catalog.findOne({business: business._id});
  const prizes = await Prize.find({catalog: catalog._id}).lean();
  return prizes.length;
}

const registrosTotales = async(idAdministrator) => {
  const business = await Business.findOne({administrador: idAdministrator});
  const files = await File.find({business: business._id}).lean();
  return files.length;
}

const clientesTotales = async(idAdministrator) => {
  const business = await Business.findOne({administrador: idAdministrator});
  return business.clientes.length;
}

const concursosActivvos = async(idAdministrator) => {
  const business = await Business.findOne({administrador: idAdministrator});
  const competition = await Competition.find({business: business._id}).lean();
  return competition.length;
}

const clientesTop = async(idAdministrator) => {
  let clientesPuntos = [];
  let clientesDatos = [];
  let total = [];
  const business = await Business.findOne({administrador: idAdministrator});
  if(!business){
     return [clientesDatos,clientesPuntos];
  }
  const {clientes} = business;

  if(clientes.length > 0){
    for (let cliente of clientes) {
      let clienteInfo = await Client.findById(cliente.idCliente).lean();
      for (let puntuacion of clienteInfo.puntuacion) {
        if(JSON.stringify(puntuacion.idBusiness) === JSON.stringify(business._id)){
          total.push({
            puntos: puntuacion.puntos,
            info: clienteInfo.dni
          })
        }
      }
    }
  }

  total.sort(function(a, b){
    if (a.puntos > b.puntos) {
      return -1;
    }
    if (a.puntos < b.puntos) {
      return 1;
    }
    // a must be equal to b
    return 0;
  })
  total = total.splice(0,5);
  clientesPuntos = total.map((info) => info['puntos']);
  clientesDatos = total.map((info) => info['info']);

  return [clientesDatos,clientesPuntos]
}

const clientesEstado = async (idAdministrator) => {
  const business = await Business.findOne({administrador: idAdministrator});
  if(!business){
    return [];
  }
  const {clientes} = business;
  let clientesActivvos = 0;
  let clientesInactivos = 0;
  if(clientes.length > 0){
    for (let cliente of clientes) {
      let clienteInfo = await Client.findById(cliente.idCliente).lean();
      if(clienteInfo.estado){
        clientesActivvos++;
      }else{
        clientesInactivos++;
      }
    }
  }

  return [clientesInactivos, clientesActivvos];
}

const productosTop = async(idAdministrator) => {
  const business = await Business.findOne({administrador: idAdministrator});
  const catalog = await Catalog.findOne({business: business._id});
  const prizes = await Prize.find({catalog: catalog._id}).lean();
  let prizesTop = [];
  if(prizes.length > 5){
    prizesTop = prizes.slice(0,5);
  }else{
    prizesTop = prizes;
  }
  return prizesTop;
}

const clientesGeneros = async(idAdministrator) => {
  const business = await Business.findOne({administrador: idAdministrator});
  if(!business){
     return [];
  }
  let clientesHombres = 0;
  let clientesMujeres = 0;
  const {clientes} = business;

  if(clientes.length > 0){
    for (let cliente of clientes) {
      let clienteInfo = await Client.findById(cliente.idCliente).lean();
      if(clienteInfo.sexo == "M"){
        clientesHombres++;
      }else{
        clientesMujeres++;
      }
    }
  }
  return [clientesMujeres,clientesHombres];
}
module.exports = {
  premiosTotales,
  registrosTotales,
  clientesTotales,
  concursosActivvos,
  clientesTop,
  clientesEstado,
  productosTop,
  clientesGeneros
}
