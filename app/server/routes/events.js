"use strict";
require("dotenv").config();
const express = require("express");
const router = express.Router();

const event = require("../models/event");

//Get all Events
router.route("/").get(async (req, res) => {
  try {
    const events = await event.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

//Get single Event by id
router.route("/:id").get(getEvent, async (req, res) => {
  try {
    res.json(res.event);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

//Create events
router.route("/").post(async (req, res, next) => {
  const updated_at = Date.now();
  const Event = new event({
    created_by: req.body.created_by,
    event_name: req.body.event_name,
    event_description: req.body.event_description,
    event_date: req.body.event_date,
    content: req.body.content,
    updated_at,
  });

  if (!Event.created_by || !Event.event_name || !Event.event_date) {
    return res.status(400).json({
      msg: "Please include a username, a event name and an event date",
    });
  }

  try {
    const newEvent = await Event.save();
    res.status(201).json(newEvent);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
});

//Update single Event by id
router.route("/:id").put(getEvent, async (req, res) => {
  const query = { _id: req.params.id };
  const updated_at = Date.now();
  const update = {
    $set: {
      created_by: req.body.created_by,
      event_name: req.body.event_name,
      event_description: req.body.event_description,
      event_date: req.body.event_date,
      content: req.body.content,
      event_date: req.body.event_date,
    },
    updated_at,
  };

  try {
    const events = await event.findOneAndUpdate(query, update, {
      new: true,
    });
    rs.send(events);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

//Delete single Event by id
router.route("/:id").delete(getEvent, async (req, res) => {
  try {
    const removedEvent = await res.event.remove();
    res.json({ message: "Deleted event" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

async function getEvent(req, res, next) {
  let input;
  try {
    input = await event.findById(req.params.id);
    if (input == null) {
      return res.status(404).json({ message: "Cannot find event" });
    }
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }

  res.event = input;
  next();
}

module.exports = router;
