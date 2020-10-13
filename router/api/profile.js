const express = require("express");
const User = require("../../models/User");
const Post =require('../../models/Post');
const Profile = require("../../models/Profile");
const auth = require("../../middleware/auth/auth");
const { check, validationResult } = require("express-validator");
const router = express.Router();
const request = require("request");
const config = require("config");
//route for getting user profile
//api/profile/me
router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate("user", ["name", "avatar"]);

    if (!profile) {
      return res.status(400).json({ msg: "their is no profile for this user" });
    }

    res.json(profile);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send("Server Error");
  }
});
//post profile
router.post(
  "/",
  [
    auth,
    [
      check("status", "status is required").not().isEmpty(),
      check("skills", "skills is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      company,
      website,
      location,
      bio,
      status,
      githubusername,
      skills,
      youtube,
      facebook,
      twitter,
      linkedin,
      instagram,
    } = req.body;
    //build profile object
    const profileFeilds = {};
    profileFeilds.user = req.user.id;
    if (company) profileFeilds.company = company;
    if (website) profileFeilds.website = website;

    if (location) profileFeilds.location = location;

    if (bio) profileFeilds.bio = bio;

    if (status) profileFeilds.status = status;

    if (githubusername) profileFeilds.githubusername = githubusername;
    if (skills) {
      profileFeilds.skills = skills.split(",").map((skill) => skill.trim());
    }
    console.log(profileFeilds.skills);
    profileFeilds.social = {};
    if (youtube) profileFeilds.social.youtube = youtube;
    if (facebook) profileFeilds.social.facebook = facebook;

    if (twitter) profileFeilds.social.twitter = twitter;

    if (instagram) profileFeilds.social.instagram = instagram;
    if (linkedin) profileFeilds.social.linkedin = linkedin;

    try {
      let profile = await Profile.findOne({ user: req.user.id });
      //update profile
      if (profile) {
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFeilds },
          { new: true }
        );
        return res.json(profile);
      }
      //create profile
      newprofile = new Profile(profileFeilds);
      await newprofile.save();
      res.json(newprofile);
    } catch (error) {
      console.error(error.message);
      return res.status(500).send("server Error");
    }
  }
);
//get all profiles
router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", ["name", "avatar"]);
    res.json(profiles);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send("server Error");
  }
});
//route get user profile by id
router.get("/user/:user_id", async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.params.user_id }).populate('user');
    if (!profile) {
      return res.status(400).json({ msg: "no profile found" });
    }
    console.log("backend runs "+profile)
    res.json(profile);
  } catch (error) {
    if (error.kind == "ObjectId") {
      return res.status(400).json({ msg: "no profile found" });
    }
    console.error(error.message);
    return res.status(500).send("server Error");
  }
});
//route to delete user,profile & posts
router.delete("/", auth, async (req, res) => {
  try {
    //delete posts
    await Post.deleteMany({user:req.user.id})
    //delete profile
    await Profile.findOneAndRemove({ user: req.user.id });
    ///delete user
    await User.findByIdAndRemove({ _id: req.user.id });
    res.json({ msg: "User deleted" });
  } catch (error) {
    console.error(error.message);
    return res.status(500).send("server Error");
  }
});
//route to put experience
router.put(
  "/experience",
  [
    auth,
    [
      check("title", "Title is required").not().isEmpty(),
      check("company", "Company is required").not().isEmpty(),
      check("from", "From Date is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      title,
      company,
      location,
      from,
      to,
      description,
      current,
    } = req.body;

    const newExp = {
      title,
      company,
      location,
      from,
      to,
      description,
      current,
    };
    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.experience.unshift(newExp);
      console.log("ashoias");
      await profile.save();
      res.json(profile);
    } catch (error) {
      console.error(error.message);
      return res.status(500).send("server Error");
    }
  }
);
//delete profile experience
router.delete("/experience/:exp_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    const removeIndex = profile.experience
      .map((exp) => exp.id)
      .indexOf(req.params.exp_id);
    profile.experience.splice(removeIndex, 1);
    await profile.save();
    res.json(profile);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send("server Error");
  }
});
//route to put education
router.put(
  "/education",
  [
    auth,
    [
      check("school", "school is required").not().isEmpty(),
      check("degree", "degree is required").not().isEmpty(),
      check("fieldofstudy", "field is required").not().isEmpty(),
      check("from", "From Date is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      description,
      current,
    } = req.body;

    const newEdu = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      description,
      current,
    };
    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.education.unshift(newEdu);
      await profile.save();
      res.json(profile);
    } catch (error) {
      console.error(error.message);
      return res.status(500).send("server Error");
    }
  }
);
//delete profile education
router.delete("/education/:edu_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    const removeIndex = profile.education
      .map((edu) => edu.id)
      .indexOf(req.params.edu_id);
    profile.education.splice(removeIndex, 1);
    await profile.save();
    res.json(profile);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send("server Error");
  }
});
//route to get user's github repos
router.get("/github/:username", (req, res) => {
  try {
    const options = {
      uri: `https://api.github.com/users/${
        req.params.username
      }/repos?per_page=5&sort=created:asc&client_id=${config.get(
        "CLIENT_ID"
      )}&client_secret=${config.get("CLIENT_SECRET")}`,
      method: "GET",
      headers: {
        "user-agent": "node.js",
      },
    };
    request(options, (err, response, body) => {
      if (err) console.error(err);
      if (response.statusCode !== 200) {
        console.log("not found")
        return res.status(404).json({ msg: "not found" });
      }
      // console.log("github",body)
      res.json(JSON.parse(body));
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).send("server Error");
  }
});
module.exports = router;
