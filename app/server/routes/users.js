"use strict";
require("dotenv").config();
const express = require("express");
const router = express.Router();
// const members = require("./members");
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
router.route("/:id").get(getUser, async (req, res) => {
  try {
    // const users = await user.find({ _id: req.params.id });

    res.json(res.user);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
  // res.json(user);
});

//Create users
router.route("/").post(async (req, res, next) => {
  const updated_at = Date.now();
  const User = new user({
    // id: uuid.v4(),
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
    },
    updated_at,
  };

  try {
    const users = await user.findOneAndUpdate(query, update, {
      new: true,
    });
    rs.send(users);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

//Delete single User by id
router.route("/:id").delete(getUser, async (req, res) => {
  try {
    // const users = await user.find({ _id: req.params.id });
    // res.json(user);
    const removedUser = await res.user.remove();
    res.json({ message: "Deleted user" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

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
