const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const User = require("../../models/User");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt=require('jsonwebtoken');
const config=require('config');

//route to register a user
router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Enter a Valid Email").isEmail(),
    check(
      "password", 
      "Please enter password of minimum 6 characters"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    console.log(req.body)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    console.log(req.body);
    const { name, email, password } = req.body;
    try {
      //if user exists

      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .send({ errors: [{ msg: "user already exists" }] });
      }
      //creating avatar url
      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm",
      });
      user = new User({
        name,
        email,
        password,
        avatar,
      });
      //encrypting password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      //save user
      await user.save();
      //send token
const payload={
    user:{
        id:user.id
    }
}
jwt.sign(payload,config.get('jwtSecret'),{
    expiresIn:36000
},(err,token)=>{
    if(err) throw err;
    else{
        res.json({token});
    }
})

    //   res.send("user registered");
    } catch (error) {
      console.error(error.message);
      return res.status(500).send("server Error");
    }
  }
);

module.exports = router;
