const mongoose = require('mongoose');

const competitionSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  fechaInicio: {
    type: Date
  },
  fechaFin: {
    type: Date
  },
  estado: {
    type: Boolean,
    default: false
  },
  business: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Business'
  },
  reglas: [{
    parametro: {
      type: String,
      trim: true
    },
    puntos: {
      type: Number
    }
  }]
});

module.exports = mongoose.model('Competition',competitionSchema);