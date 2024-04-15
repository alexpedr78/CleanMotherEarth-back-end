//basic imports
const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
///models
const Comment = require("../models/Comment.model");
///middlewares
const isAuthenticated = require("../middlewares/isAuthenticated");
const IsUserLoggedIn = require("../middlewares/IsUserLoggedIn");
///routes
// router.use(isAuthenticated);
router.get("/", async (req, res, next) => {
  try {
    let comments = await Comment.find();
    if (comments.length === 0) {
      res.status(200).json({ message: "no comments found" });
    }
    res.json(comments);
  } catch (error) {
    next();
  }
});

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

router.post("/", async (req, res, next) => {
  try {
    let newComment = await Comment.create(req.body);
    res.status(201).json(newComment);
  } catch (error) {
    next(error);
  }
});

router.put("/:commentId", async (req, res, next) => {
  try {
    let name;
    let commentToEdit = await Comment.findById(req.params.commentId);
    if (!commentToEdit) {
      res.status(404).json({ message: "no commment found" });
    }
    res.json(commentToEdit);
  } catch (error) {
    next();
  }
});

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
