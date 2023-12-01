const express = require("express");
const router = express.Router();
const Mechanics = require("../models/mechanics");

// Endpoint to allow mechanics to sign up and set location
router.post("/signup", verifyToken, async (req, res) => {
  try {
    // Create a new mechanic document
    const newMechanic = new BikeMechanic(req.body);

    // Save the new mechanic document
    await newMechanic.save();

    res.json({ message: "Mechanic signed up successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// Approve a bike mechanic (Admin only)
router.put("/approve/:id", async (req, res) => {
  try {
    const mechanic = await Mechanics.findByIdAndUpdate(
      req.params.id,
      { approved: true }, // You can add an 'approved' field to the BikeMechanic schema
      { new: true }
    );
    if (!mechanic) {
      return res.status(404).json({ error: "Mechanic not found" });
    }
    res.json({ message: "Mechanic approved successfully", mechanic });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// Get a list of approved mechanics
router.get("/approved", async (req, res) => {
  try {
    const approvedMechanics = await Mechanics.find({ approved: true });
    res.status(200).json(approvedMechanics);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/unapproved", async (req, res) => {
  try {
    const unapprovedMechanics = await Mechanics.find({ approved: false });
    res.status(200).json(unapprovedMechanics);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
