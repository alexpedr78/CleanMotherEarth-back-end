const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// models
const garbagePlace = require("../models/GarbagePlace.model");
//middlewares
const isAuthenticated = require("../middlewares/isAuthenticated");
const IsUserLoggedIn = require("../middlewares/IsUserLoggedIn");

router.get("/", async (req, res, next) => {
  try {
    let places = await garbagePlace.find();
    if (places.length === 0) {
      res.status(200).json({ message: "no places found" });
    }
    res.json(places);
  } catch (error) {
    next();
  }
});

router.get("/:garbagePlaceId", async (req, res, next) => {
  try {
    let place = await garbagePlace.findById(req.params.garbagePlaceId);
    if (!place) {
      res.status(200).json({ message: "no places match the id" });
    }
    res.json(place);
  } catch (error) {
    next();
  }
});

router.post("/", async (req, res, next) => {
  try {
    let newGarbagePlace = await Comment.create(req.body);
    res.status(201).json(newGarbagePlace);
  } catch (error) {
    next(error);
  }
});

router.put("/:garbagePlaceId", async (req, res, next) => {
  try {
    let name;
    let placeToEdit = await garbagePlace.findById(req.params.garbagePlaceId);
    if (!placeToEdit) {
      res.status(404).json({ message: "no places found" });
    }
    res.json(placeToEdit);
  } catch (error) {
    next();
  }
});

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
