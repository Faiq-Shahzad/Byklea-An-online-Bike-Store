const mongoose = require("mongoose");
const schema = mongoose.Schema;

const AdsSchema = new schema({
  adtitle: {
    type: String,
    required: true,
  },
  userid: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  description: {
    type: String,
    required: true,
  },
  condition: {
    type: Number,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  likesCount: {
    type: Number,
    default: 0,
  },
  likes: [
    {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  ],
  ratings: [
    {
      userid: {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
      value: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
      },
    },
  ],
  averageRating: {
    type: Number,
    default: 0, // Default average rating
  },
});

module.exports = mongoose.model("Ads", AdsSchema);
