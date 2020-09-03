const Client = require('../models/Client');
const passport = require('passport');
// verificar si el cliente esta esta autenticado
const clienteAutenticado = (req,res,next) => {

  if(req.isAuthenticated()){
    return next();
  }
  return res.redirect('/login');
}
const autenticarClliente = passport.authenticate('local',{
  successRedirect: '/business',
  failureRedirect: '/login',
  failureFlash: true,
  badRequestMessage: 'Ambos compos son obligatorios'
})
const mostrarListadoEmpresas = (req,res) => {
  res.render('user/listar-empresas.hbs',{
    layout: 'user.hbs'
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

module.exports = {
  autenticarClliente,
  clienteAutenticado,
  mostrarListadoEmpresas,
  registrarCliente
}