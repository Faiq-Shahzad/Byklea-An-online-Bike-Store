const jwt = require("jsonwebtoken");
const createError = require("http-errors");
const config = require("../util/config");

const signToken = (user) =>
  jwt.sign({ id: user._id, role: user.role || "user" }, config.jwtSecret, {
    algorithm: "HS256",
    expiresIn: "1h",
  });

const verifyToken = (req, res, next) => {
  const [scheme, token] = (req.headers["authorization"] || "").split(" ");
  if (!/^Bearer$/i.test(scheme) || !token) {
    return next(createError(401, "Missing bearer token"));
  }
  jwt.verify(token, config.jwtSecret, { algorithms: ["HS256"] }, (error, user) => {
    if (error) {
      return next(createError(401, "Invalid or expired token"));
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

module.exports = { signToken, verifyToken, requireAdmin };
