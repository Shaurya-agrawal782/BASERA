const mongoose = require("mongoose");
const { Schema } = mongoose;
const Review = require("./review.js");

const CATEGORIES = [
  "Trending",
  "Rooms",
  "Iconic cities",
  "Mountains",
  "Castles",
  "Amazing pools",
  "Camping",
  "Farms",
  "Arctic",
  "Domes",
  "Boats",
];

const listingSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      url: {
        type: String,
        default:
          "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
      },
      filename: {
        type: String,
        default: "listingimage",
      },
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    country: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      enum: CATEGORIES,
      default: "Trending",
    },
    coordinates: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        default: [77.209, 28.6139],
      },
    },
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Cascading delete: When a listing is deleted, delete all its associated reviews
listingSchema.post("findOneAndDelete", async function (listing) {
  if (listing && listing.reviews && listing.reviews.length > 0) {
    await Review.deleteMany({ _id: { $in: listing.reviews } });
  }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;