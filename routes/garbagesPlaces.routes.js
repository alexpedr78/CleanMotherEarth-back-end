const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// models
const garbagePlace = require("../models/GarbagePlace.model");
//middlewares
const isAuthenticated = require("../middlewares/IsAuthenticated");

const GarbagePlace = require("../models/GarbagePlace.model");

// GET ALL THE PLACES TO CLEAN
router.use(isAuthenticated);
router.get("/", async (req, res, next) => {
  try {
    let places = await garbagePlace.find().populate("creator");
    if (places.length === 0) {
      res.status(200).json({ message: "no places found" });
    }
    res.json(places);
  } catch (error) {
    next();
  }
});
//GET ALL THE PLACES LINKED TO ONE USER
router.get("/yourPlaces", async (req, res, next) => {
  try {
    let user = await GarbagePlace.find({ creator: req.currentUserId });
    if (user.length === 0) {
      res.status(201).json({ message: "no places linked to this user" });
    }
    res.json(user);
  } catch (error) {
    next(error);
  }
});
//GET ONE PLACE
router.get("/:garbagePlaceId", async (req, res, next) => {
  try {
    const place = await garbagePlace
      .findById(req.params.garbagePlaceId)
      .populate("creator");
    console.log(req.params.garbagePlaceId);

    if (!place) {
      return res
        .status(404)
        .json({ message: "No garbage place found with the specified ID." });
    }

    res.json(place);
  } catch (error) {
    next(error);
  }
});
//CREATE A PLACE
router.post("/", async (req, res, next) => {
  try {
    const { name, description, position, photo } = req.body;
    let newGarbagePlace = await GarbagePlace.create({
      creator: req.currentUserId,
      position: { lat: position.lat, long: position.long },
      name,
      position,
      description,
      // photo,
    });
    res.status(201).json(newGarbagePlace);
  } catch (error) {
    next(error);
  }
});
// EDIT A PLACE
router.put("/:garbagePlaceId", async (req, res, next) => {
  try {
    let { name, creator, description } = req.body;
    let editedData = {};
    if (name) editedData.name = name;
    if (creator) editedData.creator = creator;
    if (description) editedData.description = description;

    let placeToEdit = await garbagePlace.findByIdAndUpdate(
      req.params.garbagePlaceId,
      editedData,
      { new: true }
    );

    if (!placeToEdit) {
      res.status(404).json({ message: "no places found" });
    }
    res.json(placeToEdit);
  } catch (error) {
    next();
  }
});
//DELETE A PLACE
router.delete("/:garbagePlaceId", async (req, res, next) => {
  try {
    let placeTodelete = await garbagePlace.findByIdAndDelete(
      req.params.garbagePlaceId
    );
    if (!placeTodelete) {
      res.status(404).json({ message: "no places found" });
    } else {
      res.json({ message: "all good garbage-place deleted" });
    }
  } catch (error) {
    next();
  }
});

module.exports = router;
