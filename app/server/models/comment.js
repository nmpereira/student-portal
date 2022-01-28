const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  created_by: { type: String, required: true },
  post_id: { type: String, required: true },
  content: { type: String, required: true },
  created_at: { type: Date, required: true, default: Date.now },
  updated_at: { type: Date, required: true },
});

module.exports = mongoose.model("Comment", commentSchema);
