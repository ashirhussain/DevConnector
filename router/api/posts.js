const express = require("express");
const { check } = require("express-validator");
const postcontroller = require("../../controllers/posts/posts");
const router = express.Router();
const auth = require("../../middleware/auth/auth");

//posts user post
router.post(
  "/",
  [auth, [check("text", "text is required").not().isEmpty()]],
  postcontroller.addpost
);

//get all posts
router.get("/", auth, postcontroller.getallposts);
//get single post
router.get("/:id", auth, postcontroller.getsinglepost);
//delete single post
router.delete("/:id", auth, postcontroller.deletesinglepost);
//like a post
router.put("/like/:id", auth, postcontroller.likeApost);
//unlike a post
router.put("/unlike/:id", auth, postcontroller.unLikeApost);
//add comment to a post
router.put(
  "/comment/:id",
  [auth, [check("text", "text is required").not().isEmpty()]],
  postcontroller.addAcomment
);
//delete comment
router.delete('/comment/:id/:comment_id',auth,postcontroller.deleteComment)
module.exports = router;
