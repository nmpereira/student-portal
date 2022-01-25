const express = require("express");
const router = express.Router();
const users = require("./users");

router.use("/users", users);

// Handle GET requests to /api route
router.get("/api", (req, res) => {
  res.json({
    message: "Hello from server!!",
    dirname: __dirname + "..app/client/build",
  });
});

module.exports = router;
