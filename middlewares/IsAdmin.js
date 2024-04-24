const User = require("../models/User.model.js");
const Comment = require("../models/Comment.model.js");

async function isAdmin(req, res, next) {
  try {
    const currentUser = await User.findById(req.body.currentUserId);

    if (!currentUser) {
      return res.status(404).json({ message: "User not found." });
    }

    if (currentUser.role === "admin") {
      return next();
    }

    res.status(403).json({ message: "Unauthorized" });
  } catch (error) {
    next(error);
  }
}

module.exports = isAdmin;
