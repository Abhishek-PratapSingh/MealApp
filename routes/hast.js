const express = require("express");
const Hashtag = require('../models/hashtags.model.js')
const router = express.Router();
const { body, validationResult } = require("express-validator");
const { ValidatorsImpl } = require("express-validator/src/chain");
const res = require("express/lib/response");

router.post(
  "/add",
  [ body("name", "Enter a valid hashtag name").isLength({ min: 2}) ],
  //validating input got by server, if input is in correct format, then user is created.
  //if any error is there, the return bas request and all the errrors.
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success:false, errors: errors.array() });
    }
    try {
      // checking if user with same email already exists or not
      let hashtag = await Hashtag.findOne({name: req.body.name});
      if (hashtag) {
        return res
          .status(400)
          .json({success:false, error: "Hashtag already exits" });
      }
      hashtag = await Hashtag.create({
        name: req.body.name,
      });
  
      res.json({success:true});
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error!!!");
    }
  }
);

router.get(
  "/find",
  //validating input got by server, if input is in correct format, then user is created.
  //if any error is there, the return bas request and all the errrors.
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success:false, errors: errors.array() });
    }
    try {
      // checking if user with same email already exists or not
      let hashtag = await Hashtag.find({});
      if (!hashtag) {
        return res
          .status(400)
          .json({success:false, error: "Sorry, No Hashtag available" });
      }
      
    //   res.json({success:true});
    //   res.json({food});
      res.status(200).json({success: true, hashtag: hashtag})
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error!!!");
    }
  }
);

module.exports = router;
