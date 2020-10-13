const express = require("express");
const auth = require("../../middleware/auth/auth");
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const config = require("config");

router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json({ user });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("server error");
  }
});

router.post(
  "/",
  [
    check("email", "Enter a Valid Email").isEmail(),
    check("password", "Please Enter a Password").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      //if user exists

      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .send({ errors: [{ msg: "Invalid Credentials1" }] });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      console.log(isMatch);
      if (!isMatch) {
        return res
          .status(400)
          .send({ errors: [{ msg: "Invalid Credentials2" }] });
      }
      //send token
      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        {
          expiresIn: 36000,
        },
        (err, token) => {
          if (err) throw err;
          else {
            res.json({ token });
          }
        }
      );
    } catch (error) {
      console.error(error.message);
      return res.status(500).send("server Error");
    }
  }
);

module.exports = router;
