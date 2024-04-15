const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// models
const IWillCome = require("../models/IWillCome.model");
//middlewares
const isAuthenticated = require("../middlewares/isAuthenticated");
const IsUserLoggedIn = require("../middlewares/IsUserLoggedIn");

router.get("/", async (req, res, next) => {
  try {
    let joigners = await IWillCome.find({ creator: req.currentUserId }).sort({
      publishDate: -1,
    });
    if (comings.length === 0) {
      res
        .status(200)
        .json({ message: "no people found to come to this event" });
    }
    res.json(joigners);
  } catch (error) {
    next();
  }
});

router.get("/:eventId", async (req, res, next) => {
  try {
    let coming = await IWillCome.find({ eventId: req.params.eventId });
    if (!coming) {
      res.status(200).json({ message: "no one joigning yet" });
    }
    res.json(coming);
  } catch (error) {
    next();
  }
});

router.post("/", async (req, res, next) => {
  try {
    let isAlreadyJoigning = await IWillCome.find({
      eventId: req.params.eventId,
    });
    if (isAlreadyJoigning.length > 0) {
      res.status(404).json({ message: "alreaady a fav" });
    }
    if (isAlreadyJoigning.length === 0) {
      let newComing = await IWillCome.create(req.body);
      res.json(newComing);
    }

    let newComing = await IWillCome.create(req.body);
    res.json(newComing);
  } catch (error) {
    next(error);
  }
});

router.delete("/:eventId", async (req, res, next) => {
  try {
    let joignersToDelete = await IWillCome.findOneAndDelete({
      eventId: req.params.eventId,
      creator: req.body.userId,
    });
    if (!joignersToDelete) {
      res.status(404).json({ message: "nothing found to delete" });
    } else {
      res.json({ message: "all good it's deleted" });
    }
  } catch (error) {
    next();
  }
});

module.exports = router;
