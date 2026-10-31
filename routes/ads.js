var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const Joi = require("joi");
var Ads = require("../models/ads");
const { verifyToken } = require("../auth/jwt");
const { validateBody, validateObjectId } = require("../util/validate");

router.param("id", validateObjectId);

// Fields a client may set; likes, ratings and their counters are server-owned.
const adFields = Joi.object({
  title: Joi.string().trim().max(200),
  adtitle: Joi.string().trim().max(200),
  description: Joi.string().trim().max(5000),
  transmission: Joi.string().trim().max(50),
  city: Joi.string().trim().max(100),
  model: Joi.string().trim().max(100),
  color: Joi.string().trim().max(50),
  price: Joi.number().min(0),
});

// Accepts the legacy `title` field as an alias for `adtitle`.
const toAdFields = ({ title, ...fields }) => {
  if (fields.adtitle === undefined && title !== undefined) fields.adtitle = title;
  return fields;
};

router.post("/add", verifyToken, validateBody(adFields), async function (req, res) {
  const adsModal = new Ads({
    ...toAdFields(req.body),
    userid: req.user.id,
  });
  const AdSave = await adsModal.save();
  res.status(200).json(AdSave);
});

//View All Ads
router.get("/get", verifyToken, async (req, res) => {
  const ads = await Ads.find();
  return res.status(200).json(ads);
});

//Get Own Ads
router.get("/get/:id", verifyToken, async (req, res) => {
  const ads = await Ads.find({ userid: req.params.id });
  return res.status(200).json(ads);
});

//Delete Ad by ID
router.delete("/delete/:id", verifyToken, async (req, res) => {
  const ad = await Ads.findById(req.params.id);

  if (!ad) {
    return res.status(404).json({ error: "Ad not found" });
  }

  // Verify if the authenticated user is the owner of the ad
  if (ad.userid?.toString() !== req.user.id) {
    return res
      .status(403)
      .json({ error: "You are not authorized to delete this ad" });
  }
  await ad.deleteOne();

  res.json({ message: "Ad deleted successfully" });
});

//Update Ad by ID
router.put("/update/:id", verifyToken, validateBody(adFields), async (req, res) => {
  const ad = await Ads.findById(req.params.id);

  if (!ad) {
    return res.status(404).json({ error: "Ad not found" });
  }

  // Verify if the authenticated user is the owner of the ad
  if (ad.userid?.toString() !== req.user.id) {
    return res
      .status(403)
      .json({ error: "You are not authorized to update this ad" });
  }

  ad.set(toAdFields(req.body));
  const updatedAd = await ad.save();

  res.json({ message: "Ad updated successfully", ad: updatedAd });
});

// Like/Unlike Ad
router.post("/like/:id", verifyToken, async (req, res) => {
  const ad = await Ads.findById(req.params.id);

  if (!ad) {
    return res.status(404).json({ error: "Ad not found" });
  }

  const userId = req.user.id;

  // Check if the user has already liked the ad
  const likedIndex = ad.likes.indexOf(userId);

  if (likedIndex === -1) {
    // User has not liked the ad, so add their ID to the likes array
    ad.likes.push(userId);
  } else {
    // User has already liked the ad, so remove their ID to unlike
    ad.likes.splice(likedIndex, 1);
  }

  // Update the likes count based on the likes array length
  ad.likesCount = ad.likes.length;

  const updatedAd = await ad.save();

  res.json({
    message: "Like status updated",
    likesCount: updatedAd.likesCount,
  });
});

// Rate/Update ratings for Ad
// Update Ad by ID and Recalculate Average Rating
router.post(
  "/rate/:id",
  verifyToken,
  validateBody(Joi.object({ value: Joi.number().integer().min(1).max(5).required() })),
  async (req, res) => {
    const ad = await Ads.findById(req.params.id);

    if (!ad) {
      return res.status(404).json({ error: "Ad not found" });
    }

    const userId = req.user.id;
    const { value } = req.body;

    // Check if the user has already rated the ad
    const existingRatingIndex = ad.ratings.findIndex(
      (rating) => rating.userid?.toString() === userId
    );

    if (existingRatingIndex === -1) {
      // User has not rated the ad, so create a new rating object
      ad.ratings.push({ userid: userId, value });
    } else {
      // User has already rated the ad, so update their rating
      ad.ratings[existingRatingIndex].value = value;
    }

    // Calculate the new average rating
    const totalRatings = ad.ratings.length;
    const sumRatings = ad.ratings.reduce((acc, curr) => acc + curr.value, 0);
    ad.averageRating = sumRatings / totalRatings;

    const updatedAd = await ad.save();

    res.json({
      message: "Rating updated",
      averageRating: updatedAd.averageRating,
    });
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
    const ads = await Ads.find({
      averageRating: mongoose.trusted({ $gte: minRating, $lte: maxRating }),
    });
    res.json(ads);
  }
);

//Filter Search By Likes
router.get("/likes", verifyToken, async (req, res) => {
  const ads = await Ads.find().sort({ likesCount: -1 }).exec();
  res.json(ads);
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
    const ads = await Ads.find({
      price: mongoose.trusted({ $gte: minPrice, $lte: maxPrice }),
    });
    res.json(ads);
  }
);

module.exports = router;
