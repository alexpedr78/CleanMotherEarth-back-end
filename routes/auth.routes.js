const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User.model");
const GarbagePlaceSchema = require("../models/GarbagePlace.model");
const Event = require("../models/Event.model");
const Comment = require("../models/Comment.model");
const IWillCome = require("../models/IWillCome.model");

const IsUserLoggedIn = require("../middlewares/IsUserLoggedIn");
const isAuthenticated = require("../middlewares/isAuthenticated");
const SALT = 12;

//! we are prefixed with /api/auth
router.post("/signup", async (req, res, next) => {
  try {
    const { email, password, name, pseudo } = req.body;
    // const regex = new RegExp("^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{6,}$")
    const foundUser = await User.findOne({ email });
    const foundUserPseudo = await User.findOne({ pseudo });
    // if we find someone, warn the user that the email is alrady used
    if (foundUser) {
      return res.status(400).json({ message: "This email is already used" });
    }
    if (foundUserPseudo) {
      return res.status(400).json({ message: "This name is already used" });
    }
    console.log(foundUser);
    // We should hash the password and create the user
    const hashedPassword = await bcrypt.hash(password, SALT);

    const createdUser = await User.create({
      email,
      password: hashedPassword,
      pseudo,
      name,
      // // location,
      // photo,
    });

    res.status(201).json({
      message: "User created",
      id: createdUser._id,
    });
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { pseudo, password } = req.body;

    const foundUser = await User.findOne(
      { pseudo },
      { password: 1, pseudo: 1 }
    );

    if (!foundUser) {
      return res.status(400).json({ message: "No users found" });
    }

    const correctPassword = await bcrypt.compare(password, foundUser.password);

    if (!correctPassword) {
      return res.status(400).json({ message: "Wrong credentials" });
    }

    // Reasonably assume that they are the correct person
    const token = jwt.sign({ id: foundUser._id }, process.env.TOKEN_SECRET, {
      algorithm: "HS256",
      expiresIn: "1d",
    });
    res.json({ authToken: token, id: foundUser.id });
  } catch (error) {
    next(error);
  }
});

router.get("/verify", isAuthenticated, async (req, res, next) => {
  try {
    const user = await User.findById(req.currentUserId);
    res.json(user);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
