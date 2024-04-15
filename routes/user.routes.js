const router = require("express").Router();
// Models
const User = require("../models/User.model");
//middlewares
const isAuthenticated = require("../middlewares/isAuthenticated");
const IsUserLoggedIn = require("../middlewares/IsUserLoggedIn");
const IsAdminOrUser = require("../middlewares/IsAdminOrUser");

router.get("/", async (req, res, next) => {
  try {
    let users = await User.find();

    if (users.length === 0) {
      res.status(404).json({ message: "no users found" });
    }

    res.json(users);
  } catch (error) {
    next();
  }
});

router.get("/:userId", async (req, res, next) => {
  try {
    let user = await User.findById(req.params.userId);
    if (!user) {
      res.status(404).json({ message: "no user found" });
    }
    res.json(user);
  } catch (error) {
    next();
  }
});

router.post("/", async (req, res, next) => {
  try {
    let userTocreate = await User.findById(req.params.userId);
  } catch (error) {
    next();
  }
});

router.put("/:userId", async (req, res, next) => {
  try {
    let name;
    let editedUser;
    let userToEdit = await User.findByIdAndUpdate(req.params.userId);
  } catch (error) {
    next();
  }
});

router.delete("/:userId", async (req, res, next) => {
  try {
    let userToDelete = await User.findByIdAndDelete(req.params.userId);
  } catch (error) {
    next();
  }
});

module.exports = router;
