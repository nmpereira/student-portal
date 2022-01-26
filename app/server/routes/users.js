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

//Get single User
router.route("/:id").get((req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id));
  if (found) {
    res.json(members.filter((member) => member.id === parseInt(req.params.id)));
  } else {
    res
      .status(400)
      .json({ msg: `No User with the id of '${req.params.id}' found` });
    console.log(`No User with the id of '${req.params.id}' found`);
  }
});

//Create users with
router.route("/").post(async (req, res, next) => {
  const User = new user({
    // id: uuid.v4(),
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

  // members.push(User);
  // res.send(["msg: POST Sucess", User]);
  // next();
});

module.exports = router;
