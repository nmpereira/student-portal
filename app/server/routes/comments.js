"use strict";
require("dotenv").config();
const express = require("express");
const router = express.Router();

const comment = require("../models/comment");

//Get all Comments
router.route("/").get(async (req, res) => {
  try {
    const comments = await comment.find();
    res.json(comments);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

//Get single Comment by id
router.route("/:id").get(getComment, async (req, res) => {
  try {
    res.json(res.comment);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

//Create comments
router.route("/").post(async (req, res, next) => {
  const updated_at = Date.now();
  const Comment = new comment({
    created_by: req.body.created_by,
    post_id: req.body.post_id,
    content: req.body.content,
    updated_at,
  });

  if (!Comment.created_by || !Comment.content) {
    return res
      .status(400)
      .json({ msg: "Please include a username and content" });
  }

  try {
    const newComment = await Comment.save();
    res.status(201).json(newComment);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
});

//Update single Comment by id
router.route("/:id").put(getComment, async (req, res) => {
  const query = { _id: req.params.id };
  const updated_at = Date.now();
  const update = {
    $set: {
      created_by: req.body.created_by,
      post_id: req.body.post_id,
      content: req.body.content,
    },
    updated_at,
  };

  try {
    const comments = await comment.findOneAndUpdate(query, update, {
      new: true,
    });
    rs.send(comments);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

//Delete single Comment by id
router.route("/:id").delete(getComment, async (req, res) => {
  try {
    const removedComment = await res.comment.remove();
    res.json({ message: "Deleted comment" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

async function getComment(req, res, next) {
  let input;
  try {
    input = await comment.findById(req.params.id);
    if (input == null) {
      return res.status(404).json({ message: "Cannot find comment" });
    }
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }

  res.comment = input;
  next();
}

module.exports = router;
