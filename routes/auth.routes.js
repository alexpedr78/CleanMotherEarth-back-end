// import
const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fileUploader = require("./../config/cloudinary.config.js");
// models
const User = require("../models/User.model");
//middlewares
const isAuthenticated = require("./../middlewares/IsAuthenticated");
const SALT = 12;
//SIGN UP
//! we are prefixed with /api/auth
router.post(
  "/signup",
  fileUploader.single("avatar"),
  async (req, res, next) => {
    try {
      const { pseudo, email, name, password } = req.body;
      const filePath = req.file.path;
      if (!password) {
        return res.status(400).json({ message: "password is required" });
      }
      const foundUser = await User.findOne({ email });
      if (foundUser) {
        return res.status(400).json({ message: "This email is already used" });
      }
      const hashedPassword = await bcrypt.hash(password, SALT);
      const createdUser = await User.create({
        name,
        pseudo,
        email,
        password: hashedPassword,
        avatar: filePath,
      });
      res.status(201).json({
        message: "User created",
        id: createdUser._id,
      });
    } catch (error) {
      next(error);
    }
  }
);
//LOGIN
router.post("/login", async (req, res, next) => {
  try {
    const { pseudo, password } = req.body;
    console.log("Login request received:", { pseudo, password });
    const foundUser = await User.findOne(
      { pseudo },
      { password: 1, pseudo: 1 }
    );

    if (!foundUser) {
      console.log("No users found");
      return res.status(400).json({ message: "No users found" });
    }

    const correctPassword = await bcrypt.compare(password, foundUser.password);
    if (!correctPassword) {
      console.log("Wrong password");
      return res.status(400).json({ message: "Wrong password" });
    }

    const token = jwt.sign({ id: foundUser._id }, process.env.TOKEN_SECRET, {
      algorithm: "HS256",
      expiresIn: "1d",
    });
    console.log("Login successful, token generated:", token);
    res.json({ authToken: token, id: foundUser.id });
  } catch (error) {
    console.error("Error during login:", error);
    next(error);
  }
});

//VERIFY
router.get("/verify", isAuthenticated, async (req, res, next) => {
  try {
    const user = await User.findById(req.currentUserId);
    res.json(user);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
