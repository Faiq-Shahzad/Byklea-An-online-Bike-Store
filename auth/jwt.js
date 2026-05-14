const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return next(new Error("You dont have JWT"));
  }
  const bearer = token.split(" ")[1];
  jwt.verify(bearer, process.env.JWT_SECRET, (error, user) => {
    if (error) {
      return next(new Error("Invalid JWT"));
    }
    req.user = user;
    next();
  });
};

const requireAdmin = (req, res, next) => {
  if (req.user?.role !== "admin") {
    return res.status(403).json({ error: "Admin access required" });
  }

  next();
};

module.exports = { verifyToken, requireAdmin };
