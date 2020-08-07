const mongoose = require('mongoose');

const clientSchema = mongoose.Schema({
  name: {
    type: String,
    trim : true,
    required: true
  },//nombre
  lastName: {
    type: String,
    trim : true,
    required: true
  },//apellido
  dni: {
    type: String,
    trim : true,
    required: true
  },identificacion
  email: {
    type: String,
    trim : true,
    required: true
  },//correo
  password: {
    type: String,
    trim : true,
    required: trues
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

module.exports = mongoose.model('Client',clientSchema);