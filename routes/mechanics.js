const express = require("express");
const router = express.Router();
const Joi = require("joi");
const Mechanics = require("../models/mechanics");
const { verifyToken, requireAdmin } = require("../auth/jwt");
const { validateBody, validateObjectId } = require("../util/validate");

router.param("id", validateObjectId);

// `approved` and `reviews` are deliberately absent: only admins approve, only customers review.
const mechanicFields = Joi.object({
  fullname: Joi.string().trim().max(100).required(),
  contact: Joi.string().trim().max(50).required(),
  city: Joi.string().trim().max(100).required(),
  availabilityhours: Joi.string().trim().max(100).required(),
  services: Joi.array().items(Joi.string().trim().max(100)).max(50).required(),
  latitude: Joi.number().min(-90).max(90).required(),
  longitude: Joi.number().min(-180).max(180).required(),
  servicecharges: Joi.number().min(0).required(),
});

// Endpoint to allow mechanics to sign up and set location
router.post("/signup", verifyToken, validateBody(mechanicFields), async (req, res) => {
  const newMechanic = new Mechanics(req.body);
  await newMechanic.save();

  res.json({ message: "Mechanic signed up successfully" });
});

// Approve a bike mechanic (Admin only)
router.put("/approve/:id", verifyToken, requireAdmin, async (req, res) => {
  const mechanic = await Mechanics.findByIdAndUpdate(
    req.params.id,
    { approved: true },
    { new: true }
  );
  if (!mechanic) {
    return res.status(404).json({ error: "Mechanic not found" });
  }
  res.json({ message: "Mechanic approved successfully", mechanic });
});

// Get a list of approved mechanics
router.get("/approved", async (req, res) => {
  const approvedMechanics = await Mechanics.find({ approved: true });
  res.status(200).json(approvedMechanics);
});

router.get("/unapproved", verifyToken, requireAdmin, async (req, res) => {
  const unapprovedMechanics = await Mechanics.find({ approved: false });
  res.status(200).json(unapprovedMechanics);
});

module.exports = router;
