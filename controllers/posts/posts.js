const User = require("../../models/User");
const Post = require("../../models/Post");
const { validationResult } = require("express-validator");
module.exports = {
  addpost: async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ errors: error.array() });
    }
    console.log("running");
    try {
      const user = await User.findById(req.user.id).select("-password");

      const newPost = new Post({
        user: req.user.id,
        name: user.name,
        avatar: user.avatar,
        text: req.body.text,
      });
      const sentpost = await newPost.save();
      return res.json(sentpost);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("server error");
    }
  },
  getallposts: async (req, res) => {
    try {
      const posts = await Post.find().sort({ date: -1 });
      res.json(posts);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("server error");
    }
  },
  getsinglepost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (!post) {
        return res.status(404).json({ msg: "post not found" });
      }
      res.json(post);
    } catch (error) {
      if (error.kind == "ObjectId") {
        return res.status(404).json({ msg: "post not found" });
      }
      console.error(error.message);
      res.status(500).send("server error");
    }
  },
  deletesinglepost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (!post) {
        return res.status(404).json({ msg: "post not found" });
      }
      //check if authentic user
      if (post.user.toString() !== req.user.id) {
        return res.status(400).json({ msg: "unauthorized user" });
      }
      await post.remove();
      res.json({ msg: "post deleted" });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("server error");
    }
  },
  likeApost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (
        post.likes.filter((like) => like.user.toString() === req.params.id)
          .length
      ) {
        return res.status(400).json({ msg: "post already liked" });
      }
      post.likes.unshift({ user: req.params.id });
      await post.save();
      res.json(post);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("server error");
    }
  },
  unLikeApost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (
        post.likes.filter((like) => like.user.toString() === req.params.id) ===
        0
      ) {
        return res.status(400).json({ msg: "post didnt liked yet" });
      }
      const removeIndex = post.likes
        .map((like) => like.user.toString())
        .indexOf(req.user.id);
      post.likes.splice(removeIndex, 1);
      await post.save();
      res.json(post.likes);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("server error");
    }
  },
  addAcomment: async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ errors: error.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");
      const post = await Post.findById(req.params.id);

      const newcomment = {
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
        text: req.body.text,
      };
      post.comments.unshift(newcomment);
      await post.save();
      res.json(post.comments);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("server error");
    }
  },
  deleteComment: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      const comment = post.comments.find(
        (comment) => comment.id === req.params.comment_id
      );

      if (!comment) {
        return res.status(404).json({ msg: "comment not found" });
      }
      if (comment.user.toString() !== req.user.id) {
        return res.status(400).json({ msg: "unauthorized" });
      }

        const removeIndex = post.comments.findIndex((comment) => {
          console.log("run");
          return comment.user.toString() === req.user.id&&comment.id===req.params.comment_id
        });
   
      post.comments.splice(removeIndex, 1);
      await post.save();
      res.json(post.comments);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("server error");
    }
  },
};
