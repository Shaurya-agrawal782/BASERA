const Joi = require("joi");

const categories = [
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

const listingInnerSchema = Joi.object({
  title: Joi.string().trim().required().messages({
    "string.empty": "Title is required",
    "any.required": "Title is required",
  }),
  description: Joi.string().trim().required().messages({
    "string.empty": "Description is required",
    "any.required": "Description is required",
  }),
  location: Joi.string().trim().required().messages({
    "string.empty": "Location is required",
    "any.required": "Location is required",
  }),
  country: Joi.string().trim().required().messages({
    "string.empty": "Country is required",
    "any.required": "Country is required",
  }),
  price: Joi.number().min(0).required().messages({
    "number.base": "Price must be a valid positive number",
    "number.min": "Price must be at least 0",
    "any.required": "Price is required",
  }),
  category: Joi.string()
    .valid(...categories)
    .default("Trending")
    .messages({
      "any.only": "Please select a valid category",
    }),
  image: Joi.any().allow(null, ""),
});

module.exports.listingSchema = Joi.object({
  listing: listingInnerSchema,
  // Also allow flat keys for direct JSON payload flexibility
  title: Joi.string().trim(),
  description: Joi.string().trim(),
  location: Joi.string().trim(),
  country: Joi.string().trim(),
  price: Joi.number().min(0),
  category: Joi.string().valid(...categories),
  image: Joi.any().allow(null, ""),
}).unknown(true);

module.exports.reviewSchema = Joi.object({
  review: Joi.object({
    rating: Joi.number().min(1).max(5).required().messages({
      "number.base": "Rating must be a number between 1 and 5",
      "number.min": "Rating must be at least 1 star",
      "number.max": "Rating cannot exceed 5 stars",
      "any.required": "Rating is required",
    }),
    comment: Joi.string().trim().required().messages({
      "string.empty": "Review comment cannot be empty",
      "any.required": "Review comment is required",
    }),
  }).required(),
}).unknown(true);
