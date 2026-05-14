var express = require("express");
var router = express.Router();
var Parts = require("../models/parts");
const { verifyToken } = require("../auth/jwt");

router.post("/add", verifyToken, async function (req, res, next) {
  try {
    const partsModal = new Parts({
      ...req.body,
      userid: req.user.id,
    });
    const PartSave = await partsModal.save();
    res.status(200).json(PartSave);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

//View All Parts
router.get("/get", verifyToken, async (req, res) => {
  try {
    const parts = await Parts.find();
    return res.status(200).json(parts);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get("/get/:id", verifyToken, async (req, res) => {
  try {
    const part = await Parts.find({ userid: req.params.id });
    if (part) {
      return res.status(200).json(part);
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

//Delete Part by ID
router.delete("/delete/:id", verifyToken, async (req, res) => {
  try {
    const part = await Parts.findById(req.params.id);

    if (!part) {
      return res.status(404).json({ error: "Part not found" });
    }

    if (part.userid?.toString() !== req.user.id) {
      return res.status(403).json({ error: "You are not authorized to delete this part" });
    }

    await Parts.deleteOne({ _id: req.params.id });
    res.json({ message: "Part deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

//Update Part by ID
router.put('/update/:id', verifyToken, async (req, res) => {
  try {
    const { name, description, condition, price, category } = req.body;
    const part = await Parts.findById(req.params.id);

    if (!part) {
      return res.status(404).json({ error: 'Part not found' });
    }

    if (part.userid?.toString() !== req.user.id) {
      return res.status(403).json({ error: "You are not authorized to update this part" });
    }

    part.name = name;
    part.description = description;
    part.condition = condition;
    part.price = price;
    part.category = category;

    const updatedPart = await part.save();
    res.json({ message: 'Part updated successfully', part: updatedPart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});


// Like/Unlike Part 
router.post("/like/:id", verifyToken, async (req, res) => {
  try {
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
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// Rate/Update ratings for Parts
router.post("/rate/:id", verifyToken, async (req, res) => {
  try {
    const part = await Parts.findById(req.params.id);

    if (!part) {
      return res.status(404).json({ error: "Part not found" });
    }

    const userId = req.user.id;
    const { value } = req.body;

    // Check if the user has already rated the ad
    const existingRatingIndex = part.ratings.findIndex(
      (rating) => rating.userid.toString() === userId
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
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

//Filter Search By Min Max Ratings
router.post("/ratings", verifyToken, async (req, res) => {
  try {
    const { minRating, maxRating } = req.body;
    const parts = await Parts.find({
      "ratings.value": { $gte: minRating, $lte: maxRating },
    });
    res.json(parts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/likes", verifyToken, async (req, res) => {
  try {
    const parts = await Parts.find().sort({ likesCount: -1 }).exec();
    res.json(parts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

//Filter Search By Price Range
router.post("/prices", verifyToken, async (req, res) => {
  try {
    const { minPrice, maxPrice } = req.body;
    const parts = await Parts.find({
      price: { $gte: minPrice, $lte: maxPrice },
    });
    res.json(parts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
