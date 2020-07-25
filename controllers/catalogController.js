const Catalog = require('../models/Catalog');
const Business = require('../models/Business');
const Prize = require('../models/Prize');
const mostrarCrearCatalogo = (req,res) => {
  res.render('admin/crear-concurso',{
    title: 'Adminstrador'
  });
}

const registrarCatalogoPremios = async(req,res) => {
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


  console.log(req.body);
  // crear catalogo de premios
  const catalog = new Catalog({
    name: "Cátalogo de Premios",
    description: "Lista de premios a canjear",
    business: business._id
  });

  await catalog.save();
  if(req.files){
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
  }
  // console.log(req.files);
  console.log("registrar");
  res.json({
    ok: true,
    msg: "Se registro con exito"
  })
}

const registrarPremio = async(dataPremio) => {
  const prize = new Prize(dataPremio);
  await prize.save();
}
module.exports = {
  mostrarCrearCatalogo,
  registrarCatalogoPremios
}