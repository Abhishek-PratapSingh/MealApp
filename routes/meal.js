const express = require("express");
const Meal = require('../models/meallog.model.js')
const Hastag = require('../models/hashtags.model.js')
const FoodItems = require('../models/food.model.js')
const router = express.Router();
const { body, validationResult } = require("express-validator");
const { ValidatorsImpl } = require("express-validator/src/chain");
const res = require("express/lib/response");
const fetchuser = require("../middleware/Fetchuser");

router.post(
  "/add",
  fetchuser,
  [ body("hashtag", "Enter a valid hashtag").isLength({ min: 2}) ,
    body("fooditem", "Foodname must be of minimum 2 length").isLength({ min: 2}) ],
 
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success:false, errors: errors.array() });
    }
    try { 
     
     
     const {hashtag , fooditem} = req.body ;
     const loginId = req.user.email;
     const userId = req.user.id;
     console.log(loginId)

     const hash = await  Hastag.find();
     const food = await FoodItems.find()
      
     let foodArray=[] 
     let hashArray=[]

     for(i=0;i<hash.length;i++){
       hashArray[i]=hash[i].name
     }

     for(i=0;i<food.length;i++){
       foodArray[i]=food[i].name
    }
     //console.log(hashArray) ;

      let meal = await Meal.create({
        loginId,
        userId,
        hashtag,
        fooditem,
      });
   
      let htg = await Hastag.findOne({name: hashtag});
    
      if (!htg){ 
        hashtag = await Hastag.create({
          name: hashtag
        });
      }
   
      res.json({success:true , foodArray : foodArray , hashArray : hashArray});
     // res.json({success:true , hashtags : hash , foodItems : food});
    // console.log(hash,food)
    // res.json({success:true})
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error!!!");
    }
  }
);

router.get(
  "/find",
  fetchuser,
  async (req, res) => {
    let success = false;
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   return res.status(400).json({success:false, errors: errors.array() });
    // }
    try {
      // checking if user with same email already exists or not
      const loginId = req.user.email;
      let meals = await Meal.find({loginId});
      if (!meals) {
        return res
          .status(400)
          .json({success:false, error: "No Meal Log Available " });
      }
      
    //   res.json({success:true});
    //   res.json({food});
      res.status(200).json({success: true, meals: meals})
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error!!!");
    }
  }
);

module.exports = router;
