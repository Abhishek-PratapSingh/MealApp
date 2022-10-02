const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mealLog = new Schema({
  loginId: { type: String, required: true },
  userId: { type: String, required: true },
  hashtag : { type: String, required: true ,minlength: 2 } ,
  fooditem : {type: String, required: true }  
 },
  {
  timestamps: true,
});

const MealLog = mongoose.model('MealLog', mealLog);

module.exports = MealLog;