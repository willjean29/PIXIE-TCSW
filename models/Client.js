const mongoose = require('mongoose');

const clientSchema = mongoose.Schema({
  name: {
    type: String,
    trim : true,
    required: true
  },
  lastName: {
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
    required: trues
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
    },
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