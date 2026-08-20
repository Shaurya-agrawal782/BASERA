const Listing = require("./models/listing.js");
const Review = require("./models/review.js");
const { listingSchema, reviewSchema } = require("./Schema.js");

// Check if user is authenticated
module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({
      success: false,
      message: "You must be logged in to perform this action!",
    });
  }
  next();
};

// Check if authenticated user is the owner of the listing
module.exports.isOwner = async (req, res, next) => {
  try {
    const { id } = req.params;
    const listing = await Listing.findById(id);

    if (!listing) {
      return res.status(404).json({
        success: false,
        message: "Listing you requested for does not exist!",
      });
    }

    const ownerId = listing.owner?._id || listing.owner;
    const currentUserId = req.user?._id;

    if (!ownerId || !currentUserId || ownerId.toString() !== currentUserId.toString()) {
      return res.status(403).json({
        success: false,
        message: "You do not have permission to edit or delete this listing",
      });
    }

    next();
  } catch (err) {
    next(err);
  }
};

// Validate listing creation/update payload
module.exports.validateListing = (req, res, next) => {
  // If payload sent as req.body.listing or flat, normalize
  const payloadToValidate = req.body.listing
    ? { listing: req.body.listing }
    : {
        listing: {
          title: req.body.title,
          description: req.body.description,
          price: req.body.price,
          location: req.body.location,
          country: req.body.country,
          category: req.body.category,
          image: req.body.image,
        },
      };

  const { error } = listingSchema.validate(payloadToValidate, { abortEarly: false });
  if (error) {
    const errMsg = error.details.map((el) => el.message).join(", ");
    return res.status(400).json({ success: false, message: errMsg });
  }
  next();
};

// Validate review creation payload
module.exports.validateReview = (req, res, next) => {
  const payloadToValidate = req.body.review
    ? { review: req.body.review }
    : { review: { rating: req.body.rating, comment: req.body.comment } };

  const { error } = reviewSchema.validate(payloadToValidate, { abortEarly: false });
  if (error) {
    const errMsg = error.details.map((el) => el.message).join(", ");
    return res.status(400).json({ success: false, message: errMsg });
  }
  next();
};

// Check if authenticated user is the author of the review
module.exports.isReviewAuthor = async (req, res, next) => {
  try {
    const { reviewId } = req.params;
    const review = await Review.findById(reviewId);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review does not exist!",
      });
    }

    const authorId = review.author?._id || review.author;
    const currentUserId = req.user?._id;

    if (!authorId || !currentUserId || authorId.toString() !== currentUserId.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not the author of this review",
      });
    }

    next();
  } catch (err) {
    next(err);
  }
};
