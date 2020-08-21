const moment = require('moment');
const Administrator = require('../models/Administrator');
const {existsCompetitionSimple,existsCatalogoBusiness} = require('../middlewares/exists');

const mostrarTemplateAdministrador = async(req,res) => {
  const administrator = await Administrator.findById(req.user._id).lean();
  console.log(req.user._id)
  const existeConcursoSimple = await existsCompetitionSimple(req.user._id);
  const existeCatalogoBusiness = await existsCatalogoBusiness(req.user._id);
  console.log(existeConcursoSimple);
  res.render('admin/descargar-template',{
    title: 'Administrador',
    admin: administrator,
    existeConcursoSimple,
    existeCatalogoBusiness
  })
}
const mostrarAdminArea = async(req,res) => {
  // console.log(req.session);
  // console.log(req.user);
  // console.log("cargar datos");
  const administrator = await Administrator.findById(req.user._id).lean();
  console.log(req.user._id);
  const existeConcursoSimple = await existsCompetitionSimple(req.user._id);
  const existeCatalogoBusiness = await existsCatalogoBusiness(req.user._id);
  console.log(existeConcursoSimple);
  res.render('admin/admin-area',{
    title: 'Administrador',
    admin: administrator,
    existeConcursoSimple,
    existeCatalogoBusiness
  })
}

const mostrarInformacionAdministrador = async(req,res) => {
  const administrator = await Administrator.findById(req.user._id).lean();
  const existeConcursoSimple = await existsCompetitionSimple(req.user._id);
  let fechaNacimiento = moment(administrator.fechaNacimiento).add(1, 'day').format('L');
  const existeCatalogoBusiness = await existsCatalogoBusiness(req.user._id);
  console.log(fechaNacimiento)
  res.render('admin/listar-admin',{
    title: 'Administrador',
    admin: administrator,
    fechaNacimiento,
    existeConcursoSimple,
    existeCatalogoBusiness
  })
}

subirfoto(){

  if(!this.fotoSeleccionada){
    swal.fire('Error Upload: ', 'debe seleccionar una foto','error');
  }else{
  this.clienteService.subirFoto(this.fotoSeleccionada, this.cliente.id)
  .subscribe( event =>{
    if(event.type === HttpEventType.UploadProgress){
      this.progreso = Math.round((event.loaded/event.total)*100);
    }else if(event.type === HttpEventType.Response){
      let response: any = event.body;
      this.cliente = response.cliente as Cliente;

      this.modalService.notificarUpload.emit(this.cliente);
      swal.fire('la foto se ha subido completamente!', response.mensaje, 'success');
    }

    //this.cliente = cliente;
  //  swal.fire('La foto no se ha subido!', `por favor inicie session: ${this.cliente.foto}`, 'success');
  })
  }
}


delete(cliente: Cliente): void{
  const swalWithBootstrapButtons = swal.mixin({
    customClass: {
    confirmButton: 'btn btn-success',
    cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })

  swalWithBootstrapButtons.fire({
  title: 'Está seguro?',
  text: `¡Seguro que desea eliminar al cliente ${cliente.nombre} ${cliente.apellido}?`,
  icon: 'warning',
  showCancelButton: true,
  confirmButtonText: 'Si, eliminar!',
  cancelButtonText: 'No, cancelar!',
  reverseButtons: true
  }).then((result) => {
    if (result.value) {

      this.clienteService.delete(cliente.id).subscribe(
          response => {
            this.clientes = this.clientes.filter(cli => cli !== cliente)
            swalWithBootstrapButtons.fire(
              'Cliente Eliminado',
              `Cliente ${cliente.nombre} eliminado con éxito.`,
              'success'
            )
          }
        )
      }
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

const modificarAdministrador = async(req,res) => {
  // console.log(req.user);
  console.log(req.body)
  const id = req.user._id;

  console.log("modificar admin nodejs")
  const data = req.body;
  const administrator = await Administrator.findByIdAndUpdate(id,data,{new: true, runValidators: true})
    .catch((err) => {
      return res.status(500).json({
        ok: false,
        err
      });
    })
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

const agregarAvatarAdministrador = async(req,res) => {
  const id = req.user._id;
  console.log(id);
  console.log(req.file)
  const administrator = await Administrator.findById(id).catch((err) => {
    return res.status(400).json({
      ok: false,
      err
    });
  })

  if(!administrator) return res.status(400).json({
    ok: false,
    err: {
      msg: "El administrator no existe o no tiene permisos"
    }
  });

  if(req.file){
    administrator.image = req.file.filename;
  }

  try {
    await administrator.save();
  } catch (err) {
    return res.status(400).json({
      ok: false,
      err: {
        msg: "No se pudo guardar la imagen"
      }
    });
  }

  res.json({
    ok: true,
    administrator
  });
  // res.redirect('/admin/profile');
}

const obtenerAdministradores = (req,res) => {
  res.json({
    admin : req.administrator
  })
}


module.exports = {
  mostrarTemplateAdministrador,
  mostrarAdminArea,
  agregarAdministrador,
  obtenerAdministradores,
  obtenerAdministratorID,
  obtenerAdministradorActual,
  mostrarInformacionAdministrador,
  modificarAdministrador,
  agregarAvatarAdministrador
}
