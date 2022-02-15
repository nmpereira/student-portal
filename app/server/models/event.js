const mongoose = require("mongoose");
// const studentEnrolSchema = new Schema(
// { username: { type: String } },
// { student_id: { type: String } }
// );

const eventSchema = new mongoose.Schema({
  created_by: { type: String, required: true },
  event_name: { type: String, required: true },
  event_description: { type: String, required: false },
  event_date: { type: Date, required: true },
  content: { type: String, required: false },
  created_at: { type: Date, required: true, default: Date.now },
  updated_at: { type: Date, required: true },
  // students_enrolled: [studentEnrolSchema],
});

module.exports = mongoose.model("Event", eventSchema);
