const router = require("express").Router();
const crypto = require("crypto");
const Joi = require("joi");
const { User, passwordSchema } = require("../models/user");
const Token = require("../models/token");
const sendEmail = require("../util/mail");
const { validateBody, validateObjectId } = require("../util/validate");
const config = require("../util/config");

router.param("id", validateObjectId);

const hashToken = (token) => crypto.createHash("sha256").update(token).digest("hex");

// send password link
router.post(
  "/",
  validateBody(Joi.object({ email: Joi.string().email().lowercase().trim().required() })),
  async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = crypto.randomBytes(32).toString("hex");
      await Token.updateOne(
        { userId: user._id },
        { token: hashToken(token), createdAt: new Date() },
        { upsert: true }
      );
      const url = `${config.appUrl}/resetpassword/${user._id}/${token}/`;
      await sendEmail(user.email, "Password Reset", url);
    }

    // Same response either way, so this endpoint can't be used to discover registered emails.
    res.status(200).json();
  }
);

// verify password reset link
router.get("/:id/:token", async (req, res) => {
  const token = await Token.exists({
    userId: req.params.id,
    token: hashToken(req.params.token),
  });
  if (!token) return res.status(400).send({ message: "Invalid link" });

  res.status(200).send("Valid Url");
});

//  set new password
router.post(
  "/:id/:token",
  validateBody(Joi.object({ password: passwordSchema })),
  async (req, res) => {
    // Consumed atomically, so a link works exactly once even under concurrent requests.
    const token = await Token.findOneAndDelete({
      userId: req.params.id,
      token: hashToken(req.params.token),
    });
    if (!token) return res.status(400).send({ message: "Invalid link" });

    const user = await User.findById(req.params.id);
    if (!user) return res.status(400).send({ message: "Invalid link" });
    user.password = req.body.password;
    await user.save();

    res.status(200).send({ message: "Password reset successfully" });
  }
);

module.exports = router;
