const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  description: {
    type: String,
    trim: true,
    required: true
  }
});

module.exports = mongoose.model('Category',categorySchema);