const router = require("express").Router();

router.use("/auth", require("./auth.routes"));
router.use("/garbagesPlaces", require("./garbagesPlaces.routes"));
router.use("/events", require("./event.routes"));
router.use("/comments", require("./comment.routes"));
router.use("/users", require("./user.routes"));
module.exports = router;
