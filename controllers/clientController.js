const Logger = require('../config/loggerService');
const logger = new Logger('app');
const microprofiler = require('microprofiler');
const Administrator = require('../models/Administrator');
const Business = require('../models/Business');
const Client = require('../models/Client');
const {existsCompetitionSimple,existsCatalogoBusiness} = require('../middlewares/exists');

const mostrarClientesTotales = async(req,res) => {
  let start = microprofiler.start();
  let clientes = await clientesTotales(req.user._id);

  // let clientesI = await clientesInactivos(req.user._id);

  const administrator = await Administrator.findById(req.user._id).lean();
  const existeConcursoSimple = await existsCompetitionSimple(req.user._id);
  const existeCatalogoBusiness = await existsCatalogoBusiness(req.user._id);
  res.render('admin/listar-clientes-totales',{
    title: "Clientes",
    admin: administrator,
    existeConcursoSimple,
    existeCatalogoBusiness,
    clientes,
    
  })
  let elapsedUs = microprofiler.measureFrom(start,'code');
  let stats = microprofiler.getStats('code');
  logger.debug('Procesar request mostrarClientesTotales',stats)
}

const mostrarClientesActivos = async(req,res) => {
  const administrator = await Administrator.findById(req.user._id).lean();
  const existeConcursoSimple = await existsCompetitionSimple(req.user._id);
  const existeCatalogoBusiness = await existsCatalogoBusiness(req.user._id);
  let activos = await clientesActivos(req.user._id);
  res.render('admin/listar-clientes-activos',{
    title: "Clientes",
    admin: administrator,
    existeConcursoSimple,
    existeCatalogoBusiness,
    activos
  })
}

const mostrarClientesInactivos = async(req,res) => {
  const administrator = await Administrator.findById(req.user._id).lean();
  const existeConcursoSimple = await existsCompetitionSimple(req.user._id);
  const existeCatalogoBusiness = await existsCatalogoBusiness(req.user._id);
  let inactivos = await clientesInactivos(req.user._id);
  res.render('admin/listar-clientes-inactivos',{
    title: "Clientes",
    admin: administrator,
    existeConcursoSimple,
    existeCatalogoBusiness,
    inactivos
  })
}

const clientesTotales = async(id) => {
  console.log(id)
  let clientesActuales = [];
  const business = await Business.findOne({administrador: id});
  const {clientes} = business;
  for (let cliente of clientes) {
    let clienteInfo = await Client.findById(cliente.idCliente).lean();
    for (let puntuacion of clienteInfo.puntuacion) {
      if(JSON.stringify(puntuacion.idBusiness) === JSON.stringify(business._id)){
        clienteInfo.puntuacion = puntuacion.puntos;
      }
    }
    clientesActuales.push(clienteInfo);
  }
  return clientesActuales;
}

const clientesActivos = async(id) => {
  let clientesActuales = [];
  const business = await Business.findOne({administrador: id});
  const {clientes} = business;
  for (let cliente of clientes) {
    let clienteInfo = await Client.findById(cliente.idCliente).lean();
    if(clienteInfo.estado){
      for (let puntuacion of clienteInfo.puntuacion) {
        if(JSON.stringify(puntuacion.idBusiness) === JSON.stringify(business._id)){
          clienteInfo.puntuacion = puntuacion.puntos;
        }
      }
      clientesActuales.push(clienteInfo);
    }
  }
  return clientesActuales;
}

const clientesInactivos = async(id) => {
  let clientesActuales = [];
  const business = await Business.findOne({administrador: id});
  const {clientes} = business;
  for (let cliente of clientes) {
    let clienteInfo = await Client.findById(cliente.idCliente).lean();
    if(!clienteInfo.estado){
      for (let puntuacion of clienteInfo.puntuacion) {
        if(JSON.stringify(puntuacion.idBusiness) === JSON.stringify(business._id)){
          clienteInfo.puntuacion = puntuacion.puntos;
        }
      }
      clientesActuales.push(clienteInfo);
    }
  }
  return clientesActuales;
}

module.exports = {
  mostrarClientesTotales,
  mostrarClientesActivos,
  mostrarClientesInactivos
}