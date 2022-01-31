"use strict";
require("dotenv").config();
const express = require("express");
const router = express.Router();

const post = require("../models/post");
const comment = require("../models/comment");

//Get all Posts
router.route("/").get(async (req, res) => {
  try {
    const posts = await post.find();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

//Get single Post by id
router.route("/:id").get(getPost, async (req, res) => {
  try {
    res.json(res.post);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

//Create posts
router.route("/").post(async (req, res, next) => {
  const updated_at = Date.now();
  const Post = new post({
    created_by: req.body.created_by,
    content: req.body.content,
    updated_at,
  });

  if (!Post.created_by || !Post.content) {
    return res.status(400).json({ msg: "Please include a username, content" });
  }

  try {
    const newPost = await Post.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
});

//Update single Post by id
router.route("/:id").put(getPost, async (req, res) => {
  const query = { _id: req.params.id };
  const updated_at = Date.now();
  const update = {
    $set: {
      created_by: req.body.created_by,
      content: req.body.content,
    },
    updated_at,
  };

  try {
    const posts = await post.findOneAndUpdate(query, update, {
      new: true,
    });
    res.send(posts);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

//Delete single Post by id
router.route("/:id").delete(getPost, async (req, res) => {
  try {
    const removedPost = await res.post.remove();
    res.json({ message: "Deleted post" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

//Get comments for a post
router.route("/:id/comments").get(getPost, async (req, res) => {
  try {
    const post_comments = await comment.find({ post_id: req.params.id });
    res.send({ post_comments });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

async function getPost(req, res, next) {
  let input;
  try {
    input = await post.findById(req.params.id);
    if (input == null) {
      return res.status(404).json({ message: "Cannot find post" });
    }
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }

  res.post = input;
  next();
}

module.exports = router;
