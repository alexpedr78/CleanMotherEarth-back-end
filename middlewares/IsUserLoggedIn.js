const User = require("../models/User.model.js");
const Comment = require("../models/Comment.model.js");

async function isUserLoggedIn(req, res, next) {
  try {
    const currentUser = await User.findById(req.currentUserId);
    if (currentUser.role === "admin") {
      return next();
    }
    const foundComment = await Comment.findOne({
      _id: req.params.commentId,
      user: req.currentUserId,
    });

    if (foundComment) {
      return next();
    }
    res.status(403).json({ message: "Unauthorized" });
  } catch (error) {
    next(error);
  }
}

module.exports = isUserLoggedIn;
