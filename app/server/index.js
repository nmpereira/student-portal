// server/index.js

const express = require("express");
const path = require("path");

const logger = require("./routes/logger");
const PORT = process.env.PORT || 3001;

// const api = require("./routes/api");

const app = express();

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, "../client/build")));
app.use(logger);
// app.use("/api", api);

app.get("/api", (req, res) => {
  res.json({
    message: "Hello from server!!",
    dirname: __dirname + "..app/client/build",
  });
});

// //Get all Users
// app.get("/api/users", (req, res) => res.json(members));

// //Get single User
// app.get("/api/users/:id", (req, res) => res.json(members[req.params.id]));

// All other GET requests not handled before will return our React app
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
