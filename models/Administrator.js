const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const administratorSchema = mongoose.Schema({
  names: {
    type: String,
    trim : true,
    required: true
  },
  lastNameP: {
    type: String,
    trim : true,
    required: true
  },
  lastNameA: {
    type: String,
    trim : true,
    required: true
  },
  dni: {
    type: String,
    trim : true,
    required: true
  },
  email: {
    type: String,
    trim : true,
    required: true
  },
  password: {
    type: String,
    trim : true,
    required: true
  },
  image: {
    type: String,
    trim : true
  },
  token: {
    type: String,
    trim : true,
  },
  estado:{
    type: Boolean,
    default: false
  },
  direccion: {
    type: String,
    trim : true
  },
  departamento: {
    type: String,
    trim : true
  },
  provincia: {
    type: String,
    trim : true
  },
  distrito: {
    type: String,
    trim : true
  },
  telefono: {
    type: String,
    trim : true
  },
  celular: {
    type: String,
    trim : true
  },
  genero: {
    type: String,
    trim : true
  },
  cargo:{
    type: String,
    trim : true
  },
  fechaNacimiento: {
    type: Date
  },
  expire: Date
});

// hashear el password
administratorSchema.pre('save',function(next) {
  // si el password ya esta hasheado
  if(!this.isModified('password')){
    return next();
  }
  // si no esta hasheado
  const password = bcrypt.hashSync(this.password,bcrypt.genSaltSync(10));
  this.password = password;
  next();
});

administratorSchema.methods = {
  compararPassword: function(password) {
    return bcrypt.compareSync(password,this.password);
  }
}

module.exports = mongoose.model("Administrator",administratorSchema);