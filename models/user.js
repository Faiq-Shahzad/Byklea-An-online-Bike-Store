const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const schema = mongoose.Schema;

const userSchema = new schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  isverified: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  verifycode: {
    type: String,
    index: true,
    select: false,
  },
});

userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }
    const hash = await bcrypt.hash(this["password"], 10);
    this["password"] = hash;
    return next();
  } catch (error) {
    return next(error);
  }
});

const passwordSchema = passwordComplexity().required().label("Password");

const validate = (data) => {
  const schema = Joi.object({
    name: Joi.string().trim().max(100).required().label("Name"),
    email: Joi.string().email().lowercase().trim().max(254).required().label("Email"),
    password: passwordSchema,
  });
  return schema.validate(data, { stripUnknown: true });
};
const User = mongoose.model("User", userSchema);

// Fails if existing data has duplicate emails; surface it instead of silently running without the index.
User.on("index", (error) => {
  if (error) console.error("User index build failed:", error.message);
});

module.exports = { User, validate, passwordSchema };
