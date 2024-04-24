const router = require("express").Router();
// models
const Event = require("../models/Event.model");
//middlewares
const isAuthenticated = require("./../middlewares/IsAuthenticated");
const fileUploader = require("./../config/cloudinary.config.js");
//GET ALL EVENTS FOR ADMIN ONLY
router.use(isAuthenticated);
router.get("/admin", async (req, res, next) => {
  try {
    let events = await Event.find();
    if (events.length === 0) {
      res.status(200).json({ message: "no events found" });
    }
    res.json(events);
  } catch (error) {
    next();
  }
});
//GET ALL EVENTS BY USER
router.get("/", async (req, res, next) => {
  try {
    const events = await Event.find({ creator: req.currentUserId });
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
router.post("/", fileUploader.single("photo"), async (req, res, next) => {
  try {
    const { description, name, timeStart, position } = req.body;
    let eventData = {};
    if (timeStart) {
      eventData.timeStart = timeStart;
    }
    if (description) {
      eventData.description = description;
    }
    if (name) {
      eventData.name = name;
    }
    if (req.file && req.file.path.length > 0) {
      const filePath = req.file.path;
      eventData.photo = filePath;
    }
    eventData.creator = req.currentUserId;
    eventData.position = JSON.parse(position);
    const newEvent = await Event.create(eventData);
    res
      .status(200)
      .json({ message: "Event created successfully.", event: newEvent });
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
