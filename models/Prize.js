const mongoose = require('mongoose');

const prizeSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  image: {
    type: String,
    trim: true,
    // required: true
  },
  description: {
    type: String,
    trim: true,
    // required: true
  },
  points: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  catalog: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Catalog',
    required: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    // required: true
  }
});

module.exports = mongoose.model('Prize',prizeSchema);