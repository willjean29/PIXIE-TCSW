const Client = require('../models/Client');
const Category = require('../models/Category');
const Catalog = require('../models/Catalog');
const Business = require('../models/Business');
const Prize = require('../models/Prize');
const passport = require('passport');
const paginate = require('handlebars-paginate');
// verificar si el cliente esta esta autenticado
const clienteAutenticado = (req,res,next) => {

  if(req.isAuthenticated()){
    return next();
  }
  return res.redirect('/login');
}
const autenticarClliente = passport.authenticate('localCliente',{
  successRedirect: '/business',
  failureRedirect: '/login',
  failureFlash: true,
  badRequestMessage: 'Ambos compos son obligatorios'
})

const mostrarListadoEmpresas = async(req,res) => {
  // console.log(req.user)
  // console.log(req.session)
  //  cargar las empresas asosciadas
  let empresas = []
  for (let puntuacion of req.user.puntuacion) {
    const empresa = await Business.findById(puntuacion.idBusiness);
    const data = {
      id: empresa._id,
      nombre : empresa.razonSocial,
      puntos : puntuacion.puntos
    }
    empresas.push(data);
  }
  req.session.afiliadas = empresas;
  res.render('user/listar-empresas.hbs',{
    layout: 'user.hbs',
    empresas
  })
}

const mostrarCatalogoEmpresa = async (req,res) => {
  const categorias = await obtenerCategorias(req.params.id);
  const catalogo = await Catalog.findOne({business: req.params.id});
  // premios por pagina
  let premio = 6;
  let paginaActual = req.query.p || 1;

  const premios = await Prize.find({catalog: catalogo._id})
    .skip((premio * paginaActual) - premio)
    .limit(premio).lean();

  const premiosTotales = await Prize.count({catalog: catalogo._id});

  const paginasTotales = Math.ceil(premiosTotales / premio);

  // obtener datos de la empresa actual
  let empresaActual;
  for (let empresa of req.session.afiliadas) {
    if(req.params.id === empresa.id){
      empresaActual = empresa;
    }
  }

  res.render('user/listar-catalogo.hbs',{
    layout: 'user.hbs',
    categorias,
    premios,
    pagination: {
      page: paginaActual,       // The current page the user is on
      pageCount: paginasTotales  // The total number of available pages
    },
    empresa: empresaActual
  })
}

const mostrarCategoriaCatalogo = async (req,res) => {
  const categorias = await obtenerCategorias(req.params.id);
  const catalogo = await Catalog.findOne({business: req.params.id});
  const category = await Category.findOne({name: req.params.category});

  // premios por pagina
  let premio = 6;
  let paginaActual = req.query.p || 1;

  const premios = await Prize.find({catalog: catalogo._id, category: category._id})
    .skip((premio * paginaActual) - premio)
    .limit(premio).lean();
  console.log(premios)
  const premiosTotales = await Prize.count({catalog: catalogo._id,category: category._id});

  const paginasTotales = Math.ceil(premiosTotales / premio);

  // obtener datos de la empresa actual
  let empresaActual;
  for (let empresa of req.session.afiliadas) {
    if(req.params.id === empresa.id){
      empresaActual = empresa;
    }
  }

  res.render('user/listar-catalogo-categoria.hbs',{
    layout: 'user.hbs',
    categorias,
    premios,
    pagination: {
      page: paginaActual,       // The current page the user is on
      pageCount: paginasTotales  // The total number of available pages
    },
    empresa: empresaActual
  })
}

const registrarCliente = async (req,res) => {
  const {dni,email,password,sexo} = req.body;
  // validar si ya existe el cliente 
  console.log(req.body)
  let cliente = await Client.findOne({email: email});

  if(cliente){
    return res.status(400).json({
      ok: false,
      msg: "El correo ya se encuentra registrado"
    });
  }

  // registrar o activar cuenta
  cliente = await Client.findOne({dni: dni});
  
  if(cliente){
    // activar cuenta / actualizar datos
    cliente.email = email;
    cliente.password = password;
    cliente.sexo = sexo;
    cliente.estado = true;
    await cliente.save();

    return res.json({
      ok: true,
      cliente,
      msg: "Cliente actualizado"
    })
  }

  // registrar nuevo clientes

  cliente = new Client(req.body);
  cliente.estado = true;
  await cliente.save().catch((error) => {
    return res.status(400).json({
      ok: false,
      error
    });
  });

  res.json({
    ok: true,
    cliente,
    msg: "Cliente registrado"
  })
}

const obtenerCategorias = async (idBusiness) => {
  const catalogo = await Catalog.findOne({business: idBusiness});
  const premios = await Prize.find({catalog: catalogo._id});

  let categorias = []
  let categories = new Set();

  for (let premio of premios) {
    const category = await Category.findById(premio.category);
    categories.add(category.name)
  }

  categories = Array.from(categories).sort();
  for (let category of categories) {
    let data;
     data = {
      name: category,
      empresa: idBusiness,
      catalogo: catalogo._id
    }
    categorias.push(data);
  }

  return categorias;
}

const premiosPaginas = async (req,res) => {
  let premio = 6;
  let paginaActual = req.params.page || 1;
  console.log(req.url)
  const premios = await Prize.find({})
    .skip((premio * paginaActual) - premio)
    .limit(premio);
  console.log(premios);
  res.json({
    ok: true,
    premios
  })
}

module.exports = {
  autenticarClliente,
  clienteAutenticado,
  mostrarListadoEmpresas,
  mostrarCatalogoEmpresa,
  mostrarCategoriaCatalogo,
  registrarCliente,
  premiosPaginas
}