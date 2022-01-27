const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  status: { type: String, required: true },
  created_at: { type: Date, required: true, default: Date.now },
});

module.exports = mongoose.model("User", userSchema);
