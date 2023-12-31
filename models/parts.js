const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BikePartSchema = new Schema({
  name: {
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
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
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
      },
    },
  ],
});

module.exports = mongoose.model("BikePart", BikePartSchema);
