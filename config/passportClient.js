const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const Client = require('../models/Client');

passport.use(new LocalStrategy({
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
  return done(null, usuario);

}));

passport.serializeUser((usuario,done) => {
  return done(null,usuario._id);
})

passport.deserializeUser(async(id, done) => {
  const usuario = await Client.findById(id);
  return done(null,usuario);
})

module.exports = passport;