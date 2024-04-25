const router = require("express").Router();
// models
const garbagePlace = require("../models/GarbagePlace.model");
//middlewares
const isAuthenticated = require("../middlewares/IsAuthenticated");
const fileUploader = require("./../config/cloudinary.config.js");
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
router.get("/cleaned/all", async (req, res, next) => {
  try {
    const place = await garbagePlace.find({ cleaned: "true" });
    // .populate("creator");
    // if (!place) {
    //   return res
    //     .status(404)
    //     .json({ message: "No garbage place found cleaned." });
    // }
    res.json(place);
  } catch (error) {
    next(error);
  }
});
//CREATE A PLACE
router.post("/", fileUploader.single("photo"), async (req, res, next) => {
  try {
    const { name, description, position } = req.body;
    let Placedata = {};
    if (position) {
      Placedata.position = JSON.parse(position);
    }
    if (description) {
      Placedata.description = description;
    }
    if (name) {
      Placedata.name = name;
    }
    if (req.file && req.file.path.length > 0) {
      const filePath = req.file.path;
      Placedata.photo = filePath;
    }

    Placedata.creator = req.currentUserId;

    const newPlace = await garbagePlace.create(Placedata);

    res
      .status(200)
      .json({ message: "PLace created successfully.", place: newPlace });
  } catch (error) {
    next(error);
  }
});

// EDIT A PLACE
router.put(
  "/:garbagePlaceId",
  fileUploader.single("file"),
  async (req, res, next) => {
    try {
      let { name, creator, description, cleaned } = req.body;
      let editedData = {};
      if (name) editedData.name = name;
      if (cleaned) editedData.cleaned = cleaned;
      if (creator) editedData.creator = creator;
      if (description) editedData.description = description;
      let file = req.file.path;
      if (req.file.path) {
        editedData.photo = file;
      }
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
  }
);
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
