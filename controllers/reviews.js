const Listing = require("../models/listing.js");
const Review = require("../models/review.js");

// POST /api/listings/:id/reviews
module.exports.createReview = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);

  if (!listing) {
    return res.status(404).json({
      success: false,
      message: "Listing not found!",
    });
  }

  const reviewData = req.body.review || req.body;
  const newReview = new Review({
    comment: reviewData.comment,
    rating: Number(reviewData.rating),
    author: req.user._id,
  });

  await newReview.save();

  listing.reviews.push(newReview._id);
  await listing.save();

  const populatedReview = await Review.findById(newReview._id).populate(
    "author",
    "username email"
  );

  res.status(201).json({
    success: true,
    message: "Review posted successfully! ✨",
    review: populatedReview,
  });
};

// DELETE /api/listings/:id/reviews/:reviewId
module.exports.destroyReview = async (req, res) => {
  const { id, reviewId } = req.params;

  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);

  res.json({
    success: true,
    message: "Review Deleted successfully!",
  });
};