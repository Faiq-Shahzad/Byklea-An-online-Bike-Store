var express = require("express");
var router = express.Router();
var Ads = require("../models/ads");
const { verifyToken } = require("../auth/jwt");

router.post("/add", verifyToken, async function (req, res, next) {
  try {
    const adsModal = new Ads(req.body);
    const AdSave = await adsModal.save();
    res.status(200).json(AdSave);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

//View All Ads
router.get("/get", verifyToken, async (req, res) => {
  try {
    const ads = await Ads.find();
    return res.status(200).json(ads);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

//Get Own Ads
router.get("/get/:id", verifyToken, async (req, res) => {
  try {
    const ads = await Ads.find({ userid: req.params.id });
    if (ads) {
      return res.status(200).json(ads);
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

//Delete Ad by ID
router.delete("/delete/:id", verifyToken, async (req, res) => {
  try {
    const ad = await Ads.findById(req.params.id);

    if (!ad) {
      return res.status(404).json({ error: "Ad not found" });
    }

    // Verify if the authenticated user is the owner of the ad
    if (ad.userid.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ error: "You are not authorized to delete this ad" });
    }
    await Ads.deleteOne({ _id: req.params.id });

    res.json({ message: "Ad deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

//Update Ad by ID
router.put("/update/:id", verifyToken, async (req, res) => {
  try {
    const { title, description, transmission, city, model, color, price } =
      req.body;

    // Find the ad by its _id
    const ad = await Ads.findById(req.params.id);

    if (!ad) {
      return res.status(404).json({ error: "Ad not found" });
    }

    // Verify if the authenticated user is the owner of the ad
    if (ad.userid.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ error: "You are not authorized to update this ad" });
    }

    ad.title = title;
    ad.description = description;
    ad.transmission = transmission;
    ad.city = city;
    ad.model = model;
    ad.color = color;
    ad.price = price;
    const updatedAd = await ad.updateOne({ _id: req.params.id });

    res.json({ message: "Ad updated successfully", ad: updatedAd });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// Like/Unlike Ad
router.post("/like/:id", verifyToken, async (req, res) => {
  try {
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
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// Rate/Update ratings for Ad
// Update Ad by ID and Recalculate Average Rating
router.post("/rate/:id", verifyToken, async (req, res) => {
  try {
    const ad = await Ads.findById(req.params.id);

    if (!ad) {
      return res.status(404).json({ error: "Ad not found" });
    }

    const userId = req.user.id;
    const { value } = req.body;

    // Check if the user has already rated the ad
    const existingRatingIndex = ad.ratings.findIndex(
      (rating) => rating.userid.toString() === userId
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
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

//Filter Search By Min Max Ratings
router.post("/ratings", verifyToken, async (req, res) => {
  try {
    const { minRating, maxRating } = req.body;
    const ads = await Ads.find({
      averageRating: { $gte: minRating, $lte: maxRating },
    });
    res.json(ads);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

//Filter Search By Likes
router.get("/likes", verifyToken, async (req, res) => {
  try {
    const ads = await Ads.find().sort({ likesCount: -1 }).exec();
    res.json(ads);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

//Filter Search By Price Range
router.post("/prices", verifyToken, async (req, res) => {
  try {
    const { minPrice, maxPrice } = req.body;
    const ads = await Ads.find({
      price: { $gte: minPrice, $lte: maxPrice },
    });
    res.json(ads);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
