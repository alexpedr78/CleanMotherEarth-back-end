const router = require("express").Router();
// Models
const User = require("../models/User.model");
//middlewares
const isAuthenticated = require("./../middlewares/IsAuthenticated");
const IsAdminOrUser = require("../middlewares/IsAdmin");
//GET ALL USERS ONLY ADMIN
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
router.put("/:userId", async (req, res, next) => {
  try {
    const { name, pseudo, email, avatar } = req.body;
    const updateData = {};
    if (avatar) updateData.avatar = avatar;
    if (name) updateData.name = name;
    if (pseudo) updateData.pseudo = pseudo;
    if (email) updateData.email = email;
    const editedUser = await User.findByIdAndUpdate(
      req.params.userId,
      updateData,
      { new: true }
    );
    if (!editedUser) {
      return res.status(404).json({ message: "User not found." });
    }
    res.json(editedUser);
  } catch (error) {
    next(error);
  }
});
//DELETE A USER ONLY ADMIN
router.delete("/:userId", async (req, res, next) => {
  try {
    let userToDelete = await User.findByIdAndDelete(req.params.userId);
    if (!userToDelete) {
      return res.status(404).json({ message: "User not found." });
    }
    res.status(204).json({ message: "User deleted successfully." });
  } catch (error) {
    next(error);
  }
});
module.exports = router;
