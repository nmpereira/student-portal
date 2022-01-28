const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  created_by: { type: String, required: true },
  event_name: { type: String, required: true },
  event_description: { type: String, required: false },
  event_date: { type: Date, required: true },
  content: { type: String, required: false },
  created_at: { type: Date, required: true, default: Date.now },
  updated_at: { type: Date, required: true },
});

module.exports = mongoose.model("Event", eventSchema);
