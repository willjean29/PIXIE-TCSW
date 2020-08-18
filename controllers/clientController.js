const Logger = require('../config/loggerService');
const logger = new Logger('app');
const microprofiler = require('microprofiler');
const Business = require('../models/Business');
const Client = require('../models/Client');
const mostrarClientesTotales = async(req,res) => {
  let start = microprofiler.start();
  let clientes = await clientesTotales(req.user.id);
  // console.log(clientes)
  res.render('admin/listar-clientes-totales',{
    title: "Clientes",
    clientes
  })
  let elapsedUs = microprofiler.measureFrom(start,'code');
  let stats = microprofiler.getStats('code');
  logger.debug('Procesar request mostrarClientesTotales',stats)
}

const clientesTotales = async(id) => {
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

module.exports = {
  mostrarClientesTotales
}