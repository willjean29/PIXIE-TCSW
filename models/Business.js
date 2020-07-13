const mongoose = require('mongoose');

const businessSchema = mongoose.Schema({
  ruc: {
    type: String,
    trim : true,
    required: true
  },
  nombreComercial: {
    type: String,
    trim : true
  },
  razonSocial: {
    type: String,
    trim : true,
    required: true
  },
  tipo: {
    type: String,
    trim : true,
    required: true
  },
  estado: {
    type: String,
    trim : true,
    required: true
  },
  direccion: {
    type: String,
    trim : true,
    required: true
  },
  departamento: {
    type: String,
    trim : true,
    required: true
  },
  provincia: {
    type: String,
    trim : true,
    required: true
  },
  distrito: {
    type: String,
    trim : true,
    required: true
  },
  imagen: {
    type: String,
    trim : true
  },
  administrador: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Administrator',
    required: [true, "El autor es obligatorio"]
  },
  clientes:[{
    idCliente: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Client'
    }
  }],
  redes: {
    facebook: {
      type: String,
      trim: true
    },
    web: {
      type: String,
      trim: true
    },
    red: {
      type: String,
      trim: true
    }
  }

});

module.exports = mongoose.model('Business',businessSchema);
