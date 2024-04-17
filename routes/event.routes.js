const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// models
const Event = require("../models/Event.model");
//middlewares
const isAuthenticated = require("../middlewares/isAuthenticated");

//GET ALL EVENTS FOR ADMIN ONLY
router.get("/", async (req, res, next) => {
  try {
    let events = await Event.find().populate("creator");
    if (events.length === 0) {
      res.status(200).json({ message: "no events found" });
    }
    res.json(events);
  } catch (error) {
    next();
  }
});
//GET ALL EVENTS BY USER
router.get("/user/:userId", async (req, res, next) => {
  try {
    const events = await Event.find({ creator: req.params.userId }).populate(
      "creator"
    );
    if (events.length === 0) {
      return res
        .status(200)
        .json({ message: "No events created by this user." });
    }
    res.json(events);
  } catch (error) {
    console.error("Error populating events:", error);
    next(error);
  }
});
//GET ONE EVENT
router.get("/:eventId", async (req, res, next) => {
  try {
    let event = await Event.findById(req.params.eventId);
    if (!event) {
      res.status(200).json({ message: "no events matches" });
    }
    res.json(event);
  } catch (error) {
    next();
  }
});
//CREATE AN EVENT
router.post("/", async (req, res, next) => {
  try {
    let newEvent = await Event.create(req.body);
    res.status(201).json(newEvent);
  } catch (error) {
    next(error);
  }
});
//EDIT AN EVENT ONLY ADMIN OR CREATOR
router.put("/:eventId", async (req, res, next) => {
  try {
    const { name, photo, description, location } = req.body;
    let eventToEdit = await Event.findById(req.params.eventId);
    if (!eventToEdit) {
      return res.status(404).json({ message: "No event found." });
    }
    if (name) eventToEdit.name = name;
    if (photo) eventToEdit.name = photo;
    if (description) eventToEdit.description = description;
    if (location) eventToEdit.location = location;

    await eventToEdit.save();
    res.json(eventToEdit);
  } catch (error) {
    next(error);
  }
});
//DELETE AN EVENT ONLY ADMIN OR CREATOR
router.delete("/:eventId", async (req, res, next) => {
  try {
    let eventToDelete = await Event.findByIdAndDelete(req.params.eventId);
    if (!eventToDelete) {
      res.status(404).json({ message: "no events found" });
    }
    res.json({ message: "all good event deleted" });
  } catch (error) {
    next();
  }
});

module.exports = router;
