"use strict";
const express = require("express");
const router = express.Router();
const users = require("./users");
const posts = require("./posts");
const comments = require("./comments");
const events = require("./events");

router.use("/users", users);
router.use("/posts", posts);
router.use("/comments", comments);
router.use("/events", events);

// Handle GET requests to /api route

router.route("/").get((req, res) => {
  res.json({
    message: "Hello from server!!",
    dirname: __dirname + "..app/client/build",
  });
});

module.exports = router;
