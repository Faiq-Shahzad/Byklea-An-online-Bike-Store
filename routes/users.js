const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const createError = require("http-errors");
const { User, validate } = require("../models/user");
const Ads = require("../models/ads");
const Parts = require("../models/parts");
const Token = require("../models/token");
const { signToken, verifyToken, requireAdmin } = require("../auth/jwt");
const { validateBody, validateObjectId } = require("../util/validate");
const sendEmail = require("../util/mail");
const config = require("../util/config");

router.param("id", validateObjectId);

// Compared against when the email is unknown, so a miss takes as long as a wrong password.
const DUMMY_HASH = bcrypt.hashSync(crypto.randomBytes(16).toString("hex"), 10);

const credentialsSchema = Joi.object({
  email: Joi.string().email().lowercase().trim().required(),
  password: Joi.string().max(128).required(),
});

router.post("/signup", async function (req, res) {
  const { error, value } = validate(req.body ?? {});
  if (error) {
    return res.status(400).send({ message: error.details[0].message });
  }

  if (await User.exists({ email: value.email })) {
    return res.status(409).json();
  }

  const verifycode = crypto.randomBytes(32).toString("hex");
  const user = await new User({ ...value, verifycode }).save();
  try {
    await sendEmail(user.email, "Verify User", `${config.appUrl}/verify/${verifycode}`);
  } catch (error) {
    // Roll back so the user can sign up again instead of being stuck unverified.
    console.error("Verification email failed:", error.message);
    await User.deleteOne({ _id: user._id });
    throw createError(503, "Could not send verification email, please try again", { expose: true });
  }
  res.status(200).json({ id: user._id, name: user.name, email: user.email });
});

router.post("/signin", validateBody(credentialsSchema), async (req, res) => {
  const user = await User.findOne({ email: req.body.email }).select("+password");
  const isPassword = await bcrypt.compare(req.body.password, user?.password ?? DUMMY_HASH);
  if (!user || !isPassword) {
    return res
      .status(401)
      .json({ message: "Credentials Dont Match", error: true });
  }

  if (!user.isverified) {
    return res
      .status(401)
      .json({ message: "Please Verify Your Email", error: true });
  }

  res.status(201).send({ token: signToken(user), name: user.name });
});

router.get("/getid", verifyToken, async (req, res) => {
  const user = await User.findById(req.user.id);
  return res.status(200).json({ user_id: req.user.id, user });
});

router.get("/get", verifyToken, requireAdmin, async (req, res) => {
  const users = await User.find();
  return res.status(200).json(users);
});

router.delete("/:id", verifyToken, requireAdmin, async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  await Promise.all([
    Ads.deleteMany({ userid: user._id }),
    Parts.deleteMany({ userid: user._id }),
    Token.deleteMany({ userId: user._id }),
  ]);
  return res.status(200).json({ message: "User deleted successfully" });
});

module.exports = router;
