const Administrator = require('../models/Administrator');

const mostrarAdminArea = async(req,res) => {
  // console.log(req.session);
  // console.log(req.user);
  // console.log("cargar datos");
  const administrator = await Administrator.findById(req.user._id).lean();
  console.log(administrator);
  res.render('admin/admin-area',{
    title: 'Administrador',
    admin: administrator
  })
}

const mostrarInformacionAdministrador = async(req,res) => {
  const administrator = await Administrator.findById(req.user._id).lean();
  res.render('admin/listar-admin',{
    title: 'Administrador',
    admin: administrator
  })
}

const agregarAdministrador = async(req,res) => {
  console.log(req.body)
  const data = req.body;
  const {dni,email} = req.body;
  // validar que no exista alguien registrado con el mismo dni o correo
  let admin = await Administrator.findOne({dni: dni});

  if(admin){
    return res.status(400).json({
      ok: false,
      msg: "El dni ya se encuentra registrado"
    });
  }
  admin = await Administrator.findOne({email: email});

  if(admin) {
    return res.status(400).json({
      ok: false,
      msg: "El correo ya se encuentra registrado"
    });
  }
  // se registra un nuevo adminsitrador
  const administrator = new Administrator(data);
  await administrator.save().catch((error) => {
    return res.status(400).json({
      ok: false,
      error
    });
  });

  res.json({
    ok: true,
    administrator,
    msg: "Administrador registrado con exito"
  });
}

const obtenerAdministratorID = async(req,res) => {
  let id = req.params.id;
  const administrator = await Administrator.findById(id).catch((err) => {
    return res.status(401).status({
      ok: false,
      err
    });
  });

  if(!administrator) return res.status(400).json({
    ok: false,
    err: {
      msg: "El administrador no existe"
    }
  });

  res.json({
    ok: true,
    administrator
  });
}

const obtenerAdministradorActual = async(req,res) => {
  // console.log(req.administrator);
  const administrator = await Administrator.findById(req.administrator._id).catch((err) => {
    return res.status(500).json({
      ok: false,
      err
    });
  });

  if(!administrator) return res.status(400).json({
    ok: false,
    err: {
      msg : "EL administrador no existe"
    }
  });

  res.json({
    ok: true,
    administrator
  });
}

const obtenerAdministradores = (req,res) => {
  res.json({
    admin : req.administrator
  })
}


module.exports = {
  mostrarAdminArea,
  agregarAdministrador,
  obtenerAdministradores,
  obtenerAdministratorID,
  obtenerAdministradorActual,
  mostrarInformacionAdministrador
}