const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const hashtag = new Schema({
  name: { type: String, required: true },
});

const Hashtag = mongoose.model('Hashtag', hashtag);

module.exports = Hashtag;