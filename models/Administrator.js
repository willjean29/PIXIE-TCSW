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