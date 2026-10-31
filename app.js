var createError = require("http-errors");
const mongoose = require("mongoose");
var express = require("express");
var path = require("path");
var logger = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const { rateLimit } = require("express-rate-limit");
const config = require("./util/config");

var usersRouter = require("./routes/users");
var passwordresetrouter = require("./routes/resetpassword");
var verifyuserrouter = require("./routes/verifyuser");
var adsrouter = require("./routes/ads");
var partsrouter = require("./routes/parts");
var mechanicsrouter = require("./routes/mechanics");
var dialogflowrouter = require("./routes/dialogflow");

// Treat `$`-prefixed keys in request data as literals, blocking NoSQL operator injection.
// Queries that use operators on purpose wrap them in mongoose.trusted().
mongoose.set("sanitizeFilter", true);

var app = express();
app.set("trust proxy", config.trustProxy);

// Reset and verification tokens are in the URL path; keep them out of logs.
const redactUrl = (url) => url.replace(/^\/(resetpassword|verify)\/.+$/, "/$1/[redacted]");
logger.token("url", (req) => redactUrl(req.originalUrl || req.url));

app.use(helmet());
app.use(logger(config.env === "production" ? "combined" : "dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ credentials: true, origin: config.frontendUrl }));
app.use(express.static(path.join(__dirname, "public")));

// Per-IP limits. The default store is in-memory: switch to a shared store (e.g. Redis)
// before running more than one instance.
const limiter = (windowMinutes, limit) =>
  rateLimit({ windowMs: windowMinutes * 60 * 1000, limit, standardHeaders: "draft-8", legacyHeaders: false });
app.post("/user/signup", limiter(60, 10)); // sends an email
app.post("/resetpassword", limiter(60, 10)); // sends an email
app.use("/user/signin", limiter(15, 30));
app.use(["/resetpassword", "/verify"], limiter(15, 30));
app.use("/dialogflow", limiter(1, 120)); // Dialogflow calls come from a few Google IPs

app.use("/user", usersRouter);
app.use("/resetpassword", passwordresetrouter);
app.use("/verify", verifyuserrouter);
app.use("/ads", adsrouter);
app.use("/parts", partsrouter);
app.use("/mechanics", mechanicsrouter);
app.use("/dialogflow", dialogflowrouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

const errorStatus = (err) => {
  if (err.status || err.statusCode) return err.status || err.statusCode;
  if (err.name === "CastError" || err.name === "ValidationError") return 400;
  if (err.code === 11000) return 409;
  return 500;
};

// error handler
app.use(function (err, req, res, next) {
  const status = errorStatus(err);
  if (status >= 500) {
    console.error(`${req.method} ${redactUrl(req.originalUrl.split("?")[0])} failed:`, err);
  }

  // Never echo internal error details (driver messages, stack traces) to clients,
  // unless the error was created with { expose: true } for that purpose.
  let message = err.message;
  if (status >= 500 && !err.expose) message = "Internal Server Error";
  else if (err.code === 11000) message = "Already exists";
  res.status(status).json({ error: message });
});
module.exports = app;
