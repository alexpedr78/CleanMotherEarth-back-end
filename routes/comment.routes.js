//basic imports
const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
///models
const Comment = require("../models/Comment.model");
///middlewares
const isAuthenticated = require("../middlewares/isAuthenticated");
const isAdmin = require("../middlewares/IsAdmin");
///routes
//GET ALL COMMENTS FOR ADMIN ONLY
router.use(isAuthenticated);
router.get("/", isAuthenticated, async (req, res, next) => {
  try {
    let comments = await Comment.findById(req.currentUserId);
    if (comments.length === 0) {
      res.status(200).json({ message: "no comments found" });
    }
    res.json(comments);
  } catch (error) {
    next();
  }
});
//GET A SPECIFIC COMMENT
router.get("/:commentId", async (req, res, next) => {
  try {
    let comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      res.status(404).json({ message: "no comment matches" });
    }
    res.json(comment);
  } catch (error) {
    next();
  }
});
//GET ALL COMMENT BY EVENT
router.get("/event/:eventId", async (req, res, next) => {
  try {
    let comments = await Comment.find({ eventId: req.params.eventId });
    if (comments.length === 0) {
      res.status(200).json({ message: "no comments found" });
    }
    res.json(comments);
  } catch (error) {
    next();
  }
});
//GET ALL COMMENT BY USER
router.get("/", isAuthenticated, async (req, res, next) => {
  try {
    let comments = await Comment.find({ creator: req.currentUserId });
    if (comments.length === 0) {
      return res.status(200).json({ message: "no comments found" });
    }
    res.json(comments);
  } catch (error) {
    next();
  }
});

//CREATE A COMMENT
router.post("/", async (req, res, next) => {
  try {
    let newComment = await Comment.create(req.body);
    console.log(newComment);
    res.status(201).json(newComment);
  } catch (error) {
    next(error);
  }
});

// EDIT A COMMENT
router.put("/:commentId", async (req, res, next) => {
  try {
    const updatedComment = await Comment.findByIdAndUpdate(
      req.params.commentId,
      { content: req.body.content },
      { new: true }
    );

    if (!updatedComment) {
      return res.status(404).json({ message: "No comment found." });
    }

    res.json(updatedComment);
  } catch (error) {
    next(error);
  }
});
// DELETE A COMMENT
router.delete("/:commentId", async (req, res, next) => {
  try {
    let commentToDelete = await Comment.findByIdAndDelete(req.params.commentId);
    if (!commentToDelete) {
      res.status(404).json({ message: "no comments found" });
    }
    res.json({ message: "all good comment deleted" });
  } catch (error) {
    next();
  }
});

module.exports = router;
