const mongoose = require('mongoose');

const catalogSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  description: {
    type: String,
    trim: true,
    required: true,
  },
  business: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Business'
  },
  quantity: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('Catalog',catalogSchema);