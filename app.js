var createError = require("http-errors");
var express = require("express");
var path = require("path");
var logger = require("morgan");
const cors = require("cors");
const config = require("./util/config");


var usersRouter = require("./routes/users");
var passwordresetrouter = require("./routes/resetpassword");
var verifyuserrouter = require("./routes/verifyuser");
var adsrouter = require("./routes/ads");
var partsrouter = require("./routes/parts");
var mechanicsrouter = require("./routes/mechanics");
var dialogflowrouter = require("./routes/dialogflow");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: config.frontendUrl }));
app.use(express.static(path.join(__dirname, "public")));

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
