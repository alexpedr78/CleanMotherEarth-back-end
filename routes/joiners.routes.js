const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { ObjectId } = require("mongoose");
// models
const IWillCome = require("../models/IWillCome.model");
const isAuthenticated = require("../middlewares/IsAuthenticated");
const objectId = new ObjectId();
//GET ALL JOIGNERS MENTIONS
router.use(isAuthenticated);

router.get("/", async (req, res, next) => {
  try {
    let allMentions = await IWillCome.find({ creator: req.currentUserId });
    if (allMentions.length > 0) {
      res.json(allMentions);
    }
  } catch (error) {
    next(error);
  }
});
router.get("/user/:userId", async (req, res, next) => {
  try {
    let joigners = await IWillCome.find({
      creator: req.params.userId,
    }).sort({ publishDate: -1 });

    if (joigners.length === 0) {
      return res
        .status(404)
        .json({ message: "No attendees found for your events." });
    }

    res.json(joigners);
  } catch (error) {
    next(error);
  }
});
//GET ALL JOIGNERS BY EVENT
router.get("/:eventId", async (req, res, next) => {
  try {
    let attendees = await IWillCome.find({
      eventId: req.params.eventId,
    });
    if (attendees.length === 0) {
      return res
        .status(404)
        .json({ message: "No attendees found for this event." });
    }

    res.json(attendees);
  } catch (error) {
    next(error);
  }
});
//CREATE JOINING MENTION BY EVENT
router.post("/", async (req, res, next) => {
  try {
    console.log(req.body);
    let isAlreadyJoining = await IWillCome.findOne({
      eventId: req.body._id,
      creator: req.currentUserId,
    });
    if (isAlreadyJoining) {
      return res
        .status(409)
        .json({ message: "You're already joining this event." });
    }
    let newComing = await IWillCome.create({
      creator: req.currentUserId,
      eventId: req.body._id,
    });

    res.json(newComing);
  } catch (error) {
    next(error);
  }
});
//DELETE A JOINING MENTION
router.delete("/:eventId", async (req, res, next) => {
  try {
    let joignersToDelete = await IWillCome.findOneAndDelete({
      eventId: req.params.eventId,
      creator: req.currentUserId,
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
