const Catalog = require('../models/Catalog');
const Administrator = require('../models/Administrator');
const Prize = require('../models/Prize');
const Business = require('../models/Business');
const {existsCompetitionSimple,existsCatalogoBusiness} = require('../middlewares/exists');

const mostrarCrearCatalogo = async(req,res) => {
  const administrator = await Administrator.findById(req.user._id).lean();
  const business = await Business.findOne({administrador: administrator._id}).lean(); 
  const existeConcursoSimple = await existsCompetitionSimple(req.user._id);
  const existeCatalogoBusiness = await existsCatalogoBusiness(req.user._id);
  res.render('admin/crear-catalogo',{
    title: 'Adminstrador',
    admin: administrator,
    existeConcursoSimple,
    existeCatalogoBusiness
  });
}

const mostrarListaCatalogo = async(req,res) => {
  console.log("hola desde ctalgo")
  const administrator = await Administrator.findById(req.user._id).lean();
  const business = await Business.findOne({administrador: administrator._id}).lean(); 
  const catalog = await Catalog.findOne({business: business._id}).lean();
  const prizes = await Prize.find({catalog: catalog._id}).lean();
  const existeConcursoSimple = await existsCompetitionSimple(req.user._id);
  const existeCatalogoBusiness = await existsCatalogoBusiness(req.user._id);
  // console.log(existeCatalogoBusiness);
  // console.log(prizes)
  res.render('admin/listar-catalogo',{
    title: 'Adminstrador',
    admin: administrator,
    premios: prizes,
    existeConcursoSimple,
    existeCatalogoBusiness
  })
}

const registrarCatalogoPremios = async(req,res) => {
  console.log(req.body)
  console.log(req.files)
  const id = req.user._id;
  const business = await Business.findOne({administrador: id}).catch((err) => {
    return res.status(500).json({
      ok: false,
      err
    });
  });

  if(!business) return res.status(400).json({
    ok: false,
    err: {
      msg: "No tiene una empresa registrada"
    }
  });

  // revisar si ya existe un catalog de la empresa
  let catalog = await Catalog.findOne({business: business._id});
  if(!catalog){
    // crear catalogo de premios
    catalog = new Catalog({
      name: "Cátalogo de Premios",
      description: "Lista de premios a canjear",
      business: business._id
    });
    await catalog.save();
  }


  
  if(req.files){
    if(req.files.length > 1){
      req.files.forEach((file,index) => {
        const dataPremio = {
          name: req.body.nombre[index],
          image: file.filename,
          description: req.body.descripcion[index],
          points: req.body.puntos[index],
          price: req.body.precio[index],
          catalog: catalog._id
        }
        registrarPremio(dataPremio);
      })
    }else{
      const dataPremio = {
        name: req.body.nombre,
        image: req.files[0].filename,
        description: req.body.descripcion,
        points: req.body.puntos,
        price: req.body.precio,
        catalog: catalog._id
      }
      registrarPremio(dataPremio);
    }
  }
  // console.log(req.files);
  console.log("registrar");
  res.json({
    ok: true,
    msg: "Se registro con exito"
  })
}

const registrarPremio = async(dataPremio) => {
  console.log(dataPremio)
  const prize = new Prize(dataPremio);
  await prize.save();
}
module.exports = {
  mostrarCrearCatalogo,
  mostrarListaCatalogo,
  registrarCatalogoPremios
}