"use strict";
require("dotenv").config();
const express = require("express");
const router = express.Router();
const members = require("./members");
const uuid = require("uuid");
const user = require("../models/user");

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
router.route("/:id").get(async (req, res) => {
  try {
    const users = await user.find({ _id: req.params.id });
    res.json(users);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
  // res.json(user);
});

//Create users
router.route("/").post(async (req, res, next) => {
  const User = new user({
    // id: uuid.v4(),
    username: req.body.username,
    name: req.body.name,
    email: req.body.email,
    status: "active",
  });

  if (!User.name || !User.email) {
    return res.status(400).json({ msg: "Please include a name and an email" });
  }

  try {
    const newUser = await User.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
});

//Update single User by id
router.route("/:id").put(async (req, res) => {
  const query = { _id: req.params.id };

  const update = {
    $set: {
      name: req.body.name,
      email: req.body.email,
    },
  };

  try {
    const users = await user.findOneAndUpdate(query, update, { new: true });
    res.send(users);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

//Delete single User by id
router.route("/:id").get(async (req, res) => {
  try {
    const users = await user.find({ _id: req.params.id });
    res.json(users);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});
// TODO: implement this middleware function
// async function getUser(req, res, next) {
//   let user;
//   try {
//     user = await user.find({ _id: req.params.id });
//     if (user == null) {
//       return res.status(404).json({ message: "Cannot find user" });
//     }
//   } catch (err) {
//     return res.status(500).json({ message1: err.message });
//   }

//   res.user = user;
//   next();
// }

module.exports = router;
