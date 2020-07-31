const WebMaster = require('../models/WebMaster');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const Administrator = require('../models/Administrator');
const axios = require('axios');
require('dotenv').config({ path: "variables.env"});
const mostrarLogin = (req,res) => {
  res.render('admin/auth/login',{
    layout: 'auth',
  })
};

const mostrarRegistro = (req,res) => {
  res.render('admin/auth/registrer',{
    layout: 'auth'
  });
}

const mostrarWebMaster = (req,res) => {
  console.log("entro a mostrar token")
  res.render('admin/auth/token-master',{
    layout: 'auth'
  });
}


// verificar si el administrador esta esta autenticado
const adminsitradorAutenticado = (req,res,next) => {

  if(req.isAuthenticated()){
    // res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, post-check=0, pre-check=0');
    return next();
  }
  return res.redirect('/admin/login');
}

const autenticarAdministrador = passport.authenticate('local',{
  successRedirect: '/admin',
  failureRedirect: '/admin/login',
  failureFlash: true,
  badRequestMessage: 'Ambos compos son obligatorios'
})

const validarTokenAdmin = async(req,res) => {
  let {token} = req.body; 
  console.log(token)
  let existeToken = false;
  const webmasters = await WebMaster.find({role : "webMaster"});
  // console.log(webmasters);
  
  webmasters.forEach((webmaster) => {
    const verificarToken =  webmaster.compararPassword(token);
    // console.log(verificarToken);
    if(verificarToken){
      existeToken = true;
    }else{
      existeToken = false;
    }
  });

  if(existeToken){
    res.json({
      ok: true,
      msg: 'WebMaster validado'
    });
  }else{
    res.json({
      ok: false,
      msg: 'Token no valido'
    });
  }
}

const cerrarSesion = (req,res) => {
  req.logout();
  res.redirect('/admin/login');
}

const autenticarAdministrador2 = async(req,res) => {
  
  // verificar usuario y password en la DB
  let {email,password} = req.body;
  console.log(req.body)
  const administrator = await Administrator.findOne({email: email}).catch((err) =>{
    return res.status(500).json({
      ok: false,
      err
    })
  });

  if(!administrator) return res.status(400).json({
    ok: false,
    err: {
      msg: "(Usuario) o Contraseña invalidos"
    }
  });

  if(!administrator.compararPassword(password)) return res.status(400).json({
    ok: false,
    err: {
      msg : "Usuario o (Contraseña) invalidos"
    }
  })

  let token = jwt.sign({
    administrator: administrator
  },process.env.SEED_JWT,{
    expiresIn: '48h'
  });

  res.json({
    ok: true,
    administrator,
    token
  });

}

const verificarDNI = async(req,res) => {
  const {dni} = req.body;
  const url = `${process.env.LINK_API_DNI}/${dni}?token=${process.env.API_KEY}`;
  console.log(url);

  try {
    const response = await axios.get(url);
    return res.json({
      ok: true,
      user : response.data
    });
  } catch (error) {
    console.log("error 404");
    return res.status(404).json({
      ok: false,
      err: {
        msg: "El DNI ingresado no existe"
      }
    });
  }
}

module.exports = {
  mostrarLogin,
  mostrarRegistro,
  mostrarWebMaster,
  validarTokenAdmin,
  autenticarAdministrador,
  adminsitradorAutenticado,
  autenticarAdministrador2,
  verificarDNI,
  cerrarSesion
}