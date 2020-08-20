const File = require('../models/File');
const Business = require('../models/Business');
const {leerCSV} = require('../utils/leerCSV');

const registrarArchivo = async(req,res) => {
  let file;
  const id = req.user._id;
  const business = await Business.findOne({administrador: id}).catch((err) => {
    return res.status(400).json({
      ok: false,
      err
    })
  });

  if(!business) return res.status(400).json({
    ok: false,
    err: {
      msg: "La empresa no se encuentra registrada"
    }
  })

  if(req.file){
    file = new File({
      name: req.file.filename,
      type: req.file.mimetype,
      business: business._id
    })

    await file.save();
  }

  res.json({
    ok: true,
    file
  })

}

const obtenerDatosArchivo = async(req,res) => {
  const id = req.params.id;
  const file = await File.findById(id).catch((err) => {
    return res.status(400).json({
      ok: false,
      err
    })
  })

  if(!file) return res.status(400).json({
    ok: false,
    err: {
      msg: "Archivo no registrado"
    }
  })

  const datos = leerCSV(file.name);
  console.log(datos);
  res.render('admin/listar-file-detalles',{
    datos
  })

}

const eliminarArchivo = async(req,res) => {
  let file;
  const id = req.user._id;
  const business = await Business.findOne({administrador: id}).catch((err) => {
    return res.status(400).json({
      ok: false,
      err
    })
  });

  if(!business) return res.status(400).json({
    ok: false,
    err: {
      msg: "La empresa no se encuentra registrada"
    }
  })

  if(req.file){
    file = new File({
      name: req.file.filename,
      type: req.file.mimetype,
      business: business._id
    })

    await file.save();
  }

  res.json({
    ok: true,
    file
  })

}
module.exports = {
  registrarArchivo,
  obtenerDatosArchivo,
  eliminarArchivo
}