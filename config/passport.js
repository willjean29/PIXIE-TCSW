const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const Administrator = require('../models/Administrator');
const Client = require('../models/Client');
let tipoUsuario = "";

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
},async (email,password,done) => {

  const usuario = await Administrator.findOne({email: email});
  // el usuario no se encuentra registrado
  if(!usuario){
    return done(null,false,{
      message: "Administrador no registrado"
    });
  }
  // verificar el registro del usuario
  const verificarPassword = usuario.compararPassword(password);

  if(!verificarPassword) return done(null,false,{
    message : "Password Incorrecto"
  })

  // usuario verificado
  tipoUsuario = usuario.role;
  return done(null, usuario);

}));

passport.use('localCliente',new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
},async (email,password,done) => {
  const usuario = await Client.findOne({email: email});
  // el usuario no se encuentra registrado
  if(!usuario){
    return done(null,false,{
      message: "Cliente no registrado"
    });
  }
  // verificar el registro del usuario
  const verificarPassword = usuario.compararPassword(password);

  if(!verificarPassword) return done(null,false,{
    message : "Password Incorrecto"
  })

  // usuario verificado
  tipoUsuario = usuario.role;
  return done(null, usuario);

}));

passport.serializeUser((usuario,done) => {
  return done(null,usuario._id);
})

passport.deserializeUser(async(id, done) => {
  if(tipoUsuario === "ADMIN"){
    const usuario = await Administrator.findById(id);
    return done(null,usuario);
  }else{
    const usuario = await Client.findById(id);
    return done(null,usuario);
  }
})

module.exports = passport;