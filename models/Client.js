const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const clientSchema = mongoose.Schema({
  name: {
    type: String,
    trim : true,
    // required: true
  },//nombre
  lastName: {
    type: String,
    trim : true,
    // required: true
  },//apellido
  dni: {
    type: String,
    trim : true,
    required: true
  },
  // SEXO
  sexo: {
    type: String,
    trim : true,
  },
  // identificacion
  email: {
    type: String,
    trim : true,
    // required: true
  },//correo
  password: {
    type: String,
    trim : true,
    // required: true
  },//contraseña
  image: {
    type: String,
    trim : true
  },
  token: {
    type: String,
    trim : true,
  },//imagen
  estado:{
    type: Boolean,
    default: false
  },//status
  puntuacion:[{
    idBusiness:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Business"
    },
    puntos:{
      type: Number,
      default: 0
    }
  }],
  premios:[{
    idBusiness:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Business"
    },//bd para premios
    idPremio:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Prize'
    }
  }],
  registro:{
    type: Date,
    default: Date.now()
  },
  expire: Date
})

// hashear el password
clientSchema.pre('save',function(next) {
  // si el password ya esta hasheado
  if(!this.isModified('password')){
    return next();
  }
  // si no esta hasheado
  const password = bcrypt.hashSync(this.password,bcrypt.genSaltSync(10));
  this.password = password;
  next();
});

clientSchema.methods = {
  compararPassword: function(password) {
    return bcrypt.compareSync(password,this.password);
  }
}

module.exports = mongoose.model('Client',clientSchema);