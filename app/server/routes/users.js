"use strict";
require("dotenv").config();
const express = require("express");
const router = express.Router();

const user = require("../models/user");
const post = require("../models/post");
const comment = require("../models/comment");
const event = require("../models/event");

//Get all Users
router.route("/").get(async (req, res) => {
  try {
    const users = await user.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

//Get single User by id
router.route("/:id").get(getUser, async (req, res) => {
  try {
    res.json(res.user);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

//Create users
router.route("/").post(async (req, res, next) => {
  const updated_at = Date.now();
  const User = new user({
    username: req.body.username,
    name: req.body.name,
    email: req.body.email,
    status: "active",
    updated_at,
  });

  if (!User.username || !User.name || !User.email) {
    return res
      .status(400)
      .json({ msg: "Please include a username, a name and an email" });
  }

  try {
    const newUser = await User.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
});

//Update single User by id
router.route("/:id").put(getUser, async (req, res) => {
  const query = { _id: req.params.id };
  const updated_at = Date.now();
  const update = {
    $set: {
      username: req.body.username,
      name: req.body.name,
      email: req.body.email,
      status: req.body.status,
    },
    updated_at,
  };

  try {
    const users = await user.findOneAndUpdate(query, update, {
      new: true,
    });
    res.send(users);
  } catch (err) {
    res.status(500).json({ msg1: err.message });
  }
});

//Delete single User by id
router.route("/:id").delete(getUser, async (req, res) => {
  try {
    const removedUser = await res.user.remove();
    res.json({ message: "Deleted user" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

//Get all user activity
router.route("/:id/activity").get(getUser, async (req, res) => {
  try {
    const user_posts = await post.find({ created_by: req.params.id });
    const user_comments = await comment.find({ created_by: req.params.id });
    const user_event_owner = await event.find({ created_by: req.params.id });
    res.send({ user_posts, user_comments, user_event_owner });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

//Get user posts
router.route("/:id/posts").get(getUser, async (req, res) => {
  try {
    const user_posts = await post.find({ created_by: req.params.id });
    res.send({ user_posts });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

//Get user Comments
router.route("/:id/comments").get(getUser, async (req, res) => {
  try {
    const user_comments = await post.find({ created_by: req.params.id });
    res.send({ user_comments });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

//Get user created Events
router.route("/:id/event_owner").get(getUser, async (req, res) => {
  try {
    const user_event_owner = await post.find({ created_by: req.params.id });
    res.send({ user_event_owner });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

//Get user enrolled Events
// TODO: create user enrollment into Events

async function getUser(req, res, next) {
  let input;
  try {
    input = await user.findById(req.params.id);
    if (input == null) {
      return res.status(404).json({ message: "Cannot find user" });
    }
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }

  res.user = input;
  next();
}

module.exports = router;
