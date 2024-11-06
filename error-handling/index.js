const jwt = require("jsonwebtoken");

module.exports = (app) => {
  app.use((req, res, next) => {
    res.status(404).json({
      message: "This route does not exist",
      request: `The requested url was: ${req.originalUrl}`,
    });
  });

  app.use((err, req, res, next) => {
    console.error("ERROR", req.method, req.path, err);
    if (err instanceof jwt.TokenExpiredError && !res.headersSent) {
      return res.status(400).json({ message: "Token expired" });
    }

    if (!res.headersSent) {
      res.status(500).json({
        message: "Internal server error. Check the server console",
      });
    }
  });
};
