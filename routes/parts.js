var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const Joi = require("joi");
var Parts = require("../models/parts");
const { verifyToken } = require("../auth/jwt");
const { validateBody, validateObjectId } = require("../util/validate");

router.param("id", validateObjectId);

// Fields a client may set; likes, ratings and their counters are server-owned.
const partFields = Joi.object({
  name: Joi.string().trim().max(200),
  description: Joi.string().trim().max(5000),
  condition: Joi.string().trim().max(50),
  price: Joi.number().min(0),
  category: Joi.string().trim().max(100),
});

router.post("/add", verifyToken, validateBody(partFields), async function (req, res) {
  const partsModal = new Parts({
    ...req.body,
    userid: req.user.id,
  });
  const PartSave = await partsModal.save();
  res.status(200).json(PartSave);
});

//View All Parts
router.get("/get", verifyToken, async (req, res) => {
  const parts = await Parts.find();
  return res.status(200).json(parts);
});

router.get("/get/:id", verifyToken, async (req, res) => {
  const part = await Parts.find({ userid: req.params.id });
  return res.status(200).json(part);
});

//Delete Part by ID
router.delete("/delete/:id", verifyToken, async (req, res) => {
  const part = await Parts.findById(req.params.id);

  if (!part) {
    return res.status(404).json({ error: "Part not found" });
  }

  if (part.userid?.toString() !== req.user.id) {
    return res.status(403).json({ error: "You are not authorized to delete this part" });
  }

  await part.deleteOne();
  res.json({ message: "Part deleted successfully" });
});

//Update Part by ID
router.put('/update/:id', verifyToken, validateBody(partFields), async (req, res) => {
  const part = await Parts.findById(req.params.id);

  if (!part) {
    return res.status(404).json({ error: 'Part not found' });
  }

  if (part.userid?.toString() !== req.user.id) {
    return res.status(403).json({ error: "You are not authorized to update this part" });
  }

  part.set(req.body);

  const updatedPart = await part.save();
  res.json({ message: 'Part updated successfully', part: updatedPart });
});


// Like/Unlike Part
router.post("/like/:id", verifyToken, async (req, res) => {
  const part = await Parts.findById(req.params.id);

  if (!part) {
    return res.status(404).json({ error: "Part not found" });
  }

  const userId = req.user.id;

  // Check if the user has already liked the ad
  const likedIndex = part.likes.indexOf(userId);

  if (likedIndex === -1) {
    // User has not liked the ad, so add their ID to the likes array
    part.likes.push(userId);
  } else {
    // User has already liked the ad, so remove their ID to unlike
    part.likes.splice(likedIndex, 1);
  }

  // Update the likes count based on the likes array length
  part.likesCount = part.likes.length;

  const updatedPart = await part.save();

  res.json({
    message: "Like status updated",
    likesCount: updatedPart.likesCount,
  });
});

// Rate/Update ratings for Parts
router.post(
  "/rate/:id",
  verifyToken,
  validateBody(Joi.object({ value: Joi.number().integer().min(1).max(5).required() })),
  async (req, res) => {
    const part = await Parts.findById(req.params.id);

    if (!part) {
      return res.status(404).json({ error: "Part not found" });
    }

    const userId = req.user.id;
    const { value } = req.body;

    // Check if the user has already rated the ad
    const existingRatingIndex = part.ratings.findIndex(
      (rating) => rating.userid?.toString() === userId
    );

    if (existingRatingIndex === -1) {
      // User has not rated the ad, so create a new rating object
      part.ratings.push({ userid: userId, value });
    } else {
      // User has already rated the ad, so update their rating
      part.ratings[existingRatingIndex].value = value;
    }

    const updatedPart = await part.save();

    res.json({ message: "Rating updated", ratings: updatedPart.ratings });
  }
);

//Filter Search By Min Max Ratings
router.post(
  "/ratings",
  verifyToken,
  validateBody(
    Joi.object({
      minRating: Joi.number().min(0).max(5).default(0),
      maxRating: Joi.number().min(0).max(5).default(5),
    })
  ),
  async (req, res) => {
    const { minRating, maxRating } = req.body;
    // trusted(): sanitizeFilter would otherwise strip our own operators.
    const parts = await Parts.find({
      "ratings.value": mongoose.trusted({ $gte: minRating, $lte: maxRating }),
    });
    res.json(parts);
  }
);

router.get("/likes", verifyToken, async (req, res) => {
  const parts = await Parts.find().sort({ likesCount: -1 }).exec();
  res.json(parts);
});

//Filter Search By Price Range
router.post(
  "/prices",
  verifyToken,
  validateBody(
    Joi.object({
      minPrice: Joi.number().min(0).default(0),
      maxPrice: Joi.number().min(0).default(Number.MAX_SAFE_INTEGER),
    })
  ),
  async (req, res) => {
    const { minPrice, maxPrice } = req.body;
    const parts = await Parts.find({
      price: mongoose.trusted({ $gte: minPrice, $lte: maxPrice }),
    });
    res.json(parts);
  }
);

module.exports = router;
