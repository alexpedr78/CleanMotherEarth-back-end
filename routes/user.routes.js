const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SALT = 12;
// Models
const User = require("../models/User.model");
//middlewares
const isAuthenticated = require("./../middlewares/IsAuthenticated");
const fileUploader = require("./../config/cloudinary.config.js");
router.use(isAuthenticated);
router.get("/", async (req, res, next) => {
  try {
    console.log(req.currentUserId);
    let user = await User.findById(req.currentUserId);
    if (!user) {
      return res.status(200).json({ message: "no users found" });
    }

    res.json(user);
  } catch (error) {
    next();
  }
});
//GET ONE USER
router.get("/:userId", async (req, res, next) => {
  try {
    let user = await User.findById(req.params.userId);
    if (!user) {
      res.status(200).json({ message: "no user found" });
    }
    res.json(user);
  } catch (error) {
    next();
  }
});
//CREATE A USER ONLY ADMIN
router.post("/", async (req, res, next) => {
  try {
    let userTocreate = await User.findById(req.params.userId);
  } catch (error) {
    next();
  }
});
//EDIT A USER ONLY CREATOR
router.put("/", fileUploader.single("avatar"), async (req, res, next) => {
  try {
    const { pseudo, email, name, password } = req.body;
    // const filePath = req.file.path;

    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }

    const foundUser = await User.findOne({ email });
    console.log(req.currentUserId);
    console.log(foundUser);
    if (foundUser && foundUser._id.toString() !== req.currentUserId) {
      return res.status(400).json({ message: "This email is already used" });
    }

    const hashedPassword = await bcrypt.hash(password, SALT);

    const editedUser = await User.findByIdAndUpdate(
      req.currentUserId,
      {
        name,
        pseudo,
        email,
        password: hashedPassword,
        // avatar: filePath,
      },
      { new: true }
    );

    res
      .status(200)
      .json({ message: "User updated successfully.", user: editedUser });
  } catch (error) {
    next(error);
  }
});

//DELETE A USER ONLY ADMIN
router.delete("/", async (req, res, next) => {
  try {
    let userToDelete = await User.findByIdAndDelete(req.currentUserId);
    if (!userToDelete) {
      return res.status(404).json({ message: "User not found." });
    }
    res.status(204).json({ message: "User deleted successfully." });
  } catch (error) {
    next(error);
  }
});
module.exports = router;
