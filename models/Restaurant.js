var mongoose = require('mongoose');

var userLocationSchema = new mongoose.Schema({
  zipCode: String,
  delivery: Boolean,
  type: String,
  price: String,
  date: {type: Date, default: Date.now()}
});

module.exports = mongoose.model('Restaurant', userLocationSchema);