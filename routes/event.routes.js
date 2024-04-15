const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// models
const User = require("../models/User.model");
const Event = require("../models/Event.model");
const garbagePlace = require("../models/GarbagePlace.model");
//middlewares
const isAuthenticated = require("../middlewares/isAuthenticated");
const IsUserLoggedIn = require("../middlewares/IsUserLoggedIn");

router.get("/", async (req, res, next) => {
  try {
    let events = await Event.find();
    if (events.length === 0) {
      res.status(404).json({ message: "no events found" });
    }
    res.json(events);
  } catch (error) {
    next();
  }
});

router.get("/:eventId", async (req, res, next) => {
  try {
    let event = await Event.findById(req.params.eventId);
    if (!event) {
      res.status(404).json({ message: "no events matches" });
    }
    res.json(event);
  } catch (error) {
    next();
  }
});

router.post("/", async (req, res, next) => {
  try {
    let newEvent = await Comment.create(req.body);
    res.json(newEvent);
  } catch (error) {
    next(error);
  }
});

router.put("/:eventId", async (req, res, next) => {
  try {
    let name;
    let eventToEdit = await Event.findById(req.params.eventId);
    if (!eventToEdit) {
      res.status(404).json({ message: "no event found" });
    }
    res.json(eventToEdit);
  } catch (error) {
    next();
  }
});

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
