var createError = require("http-errors");
const mongoose = require("mongoose");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");

var usersRouter = require("./routes/users");
var passwordresetrouter = require("./routes/resetpassword");
var verifyuserrouter = require("./routes/verifyuser");
var adsrouter = require("./routes/ads");
var partsrouter = require("./routes/parts");
const { error } = require("console");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ credentials: true, origin: "http://localhost:3001" }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/user", usersRouter);
app.use("/resetpassword", passwordresetrouter);
app.use("/verify", verifyuserrouter);
app.use("/ads", adsrouter);
app.use("/parts", partsrouter);

mongoose
  .connect("mongodb://localhost:27017/byklea")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send({ error: err.message });
});
module.exports = app;
