const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const food = new Schema({
  name: { type: String, required: true },
});

const Food = mongoose.model('Food', food);

module.exports = Food;