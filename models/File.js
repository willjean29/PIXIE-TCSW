const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  estado: {
    type: Boolean,
    default: false
  },
  type: {
    type: String,
    trim: true,
    required: true
  },
  business: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Business',
    required: true
  }
})

module.exports = mongoose.model('File',fileSchema);