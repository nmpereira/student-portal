"use strict";
const express = require("express");
const router = express.Router();
const members = require("./members");
//Get all Users
router.route("/").get((req, res) => res.json(members));

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

module.exports = router;
