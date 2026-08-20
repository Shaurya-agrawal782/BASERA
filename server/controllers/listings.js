const Listing = require("../models/listing.js");
const fetch = require("node-fetch");

// Default coordinates fallback (Delhi, India)
const DEFAULT_COORDINATES = [77.209, 28.6139];

// Geocoding helper with error tolerance
async function geocodeAddress(address) {
  if (!address || typeof address !== "string" || !address.trim()) {
    return DEFAULT_COORDINATES;
  }

  try {
    const geoResponse = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address.trim())}`,
      {
        headers: {
          "User-Agent": "BaseraApp/2.0 (contact@baserastays.com)",
          Accept: "application/json",
        },
        timeout: 5000,
      }
    );

    if (geoResponse.ok) {
      const geoData = await geoResponse.json();
      if (Array.isArray(geoData) && geoData.length > 0) {
        const lat = parseFloat(geoData[0].lat);
        const lng = parseFloat(geoData[0].lon);
        if (!isNaN(lat) && !isNaN(lng)) {
          return [lng, lat];
        }
      }
    }
  } catch (geoErr) {
    console.warn("Geocoding notice (using fallback):", geoErr.message);
  }

  return DEFAULT_COORDINATES;
}

// GET /api/listings
module.exports.index = async (req, res) => {
  const { category, q } = req.query;
  const filter = {};

  if (category && category !== "All" && category.trim() !== "") {
    filter.category = category.trim();
  }

  if (q && q.trim() !== "") {
    const searchRegex = { $regex: q.trim(), $options: "i" };
    filter.$or = [
      { title: searchRegex },
      { location: searchRegex },
      { country: searchRegex },
      { category: searchRegex },
      { description: searchRegex },
    ];
  }

  const allListings = await Listing.find(filter)
    .populate("owner", "username email")
    .populate("reviews")
    .sort({ createdAt: -1 });

  res.json({
    success: true,
    count: allListings.length,
    listings: allListings,
  });
};

// GET /api/listings/:id
module.exports.showListing = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: { path: "author", select: "username email" },
      options: { sort: { createdAt: -1 } },
    })
    .populate("owner", "username email");

  if (!listing) {
    return res.status(404).json({
      success: false,
      message: "Listing you requested for does not exist!",
    });
  }

  res.json({ success: true, listing });
};

// POST /api/listings
module.exports.createListing = async (req, res) => {
  try {
    const listingData = req.body.listing
      ? { ...req.body.listing }
      : { ...req.body };

    // Image resolution
    let url = "";
    let filename = "";

    if (req.file) {
      url = req.file.path;
      filename = req.file.filename;
    } else if (listingData.image) {
      if (typeof listingData.image === "string") {
        url = listingData.image;
        filename = "custom-url";
      } else if (listingData.image.url) {
        url = listingData.image.url;
        filename = listingData.image.filename || "custom-url";
      }
    }

    const location = listingData.location || "";
    const country = listingData.country || "";
    const address = `${location}, ${country}`.trim();
    const coordinates = await geocodeAddress(address);

    const newListing = new Listing({
      title: listingData.title,
      description: listingData.description,
      price: Number(listingData.price) || 0,
      category: listingData.category || "Trending",
      location: listingData.location,
      country: listingData.country,
      owner: req.user._id,
      coordinates: {
        type: "Point",
        coordinates: coordinates,
      },
    });

    if (url) {
      newListing.image = { url, filename };
    }

    await newListing.save();

    res.status(201).json({
      success: true,
      message: "New Listing Created! ✨",
      listing: newListing,
    });
  } catch (err) {
    console.error("Error creating listing:", err);
    res.status(500).json({
      success: false,
      message: err.message || "Could not create listing. Please try again.",
    });
  }
};

// PUT /api/listings/:id
module.exports.updateListing = async (req, res) => {
  const { id } = req.params;
  const listingData = req.body.listing
    ? { ...req.body.listing }
    : { ...req.body };

  const listing = await Listing.findById(id);
  if (!listing) {
    return res.status(404).json({ success: false, message: "Listing not found!" });
  }

  // Update scalar fields
  if (listingData.title) listing.title = listingData.title;
  if (listingData.description) listing.description = listingData.description;
  if (listingData.price !== undefined) listing.price = Number(listingData.price);
  if (listingData.category) listing.category = listingData.category;

  // Re-geocode if location changed
  if (
    (listingData.location && listingData.location !== listing.location) ||
    (listingData.country && listingData.country !== listing.country)
  ) {
    listing.location = listingData.location || listing.location;
    listing.country = listingData.country || listing.country;
    const address = `${listing.location}, ${listing.country}`.trim();
    const newCoords = await geocodeAddress(address);
    listing.coordinates = {
      type: "Point",
      coordinates: newCoords,
    };
  }

  // Handle image replacement if provided
  if (req.file) {
    listing.image = {
      url: req.file.path,
      filename: req.file.filename,
    };
  } else if (listingData.image && typeof listingData.image === "string" && listingData.image.startsWith("http")) {
    listing.image = {
      url: listingData.image,
      filename: "custom-url",
    };
  }

  await listing.save();

  res.json({
    success: true,
    message: "Listing updated successfully! ✨",
    listing,
  });
};

// DELETE /api/listings/:id
module.exports.destroyListing = async (req, res) => {
  const { id } = req.params;
  const deletedListing = await Listing.findByIdAndDelete(id);

  if (!deletedListing) {
    return res.status(404).json({ success: false, message: "Listing not found!" });
  }

  res.json({
    success: true,
    message: "Listing Deleted Successfully!",
  });
};
