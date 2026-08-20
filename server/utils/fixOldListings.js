const mongoose = require("mongoose");
const Listing = require("../models/listing");

// Node 18+ has fetch built-in
async function geocode(location, country) {
  const query = encodeURIComponent(`${location}, ${country}`);
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${query}`;

  const res = await fetch(url, {
    headers: { "User-Agent": "wanderlust-app" }
  });

  const data = await res.json();

  if (!data.length) return null;

  return {
    type: "Point",
    coordinates: [Number(data[0].lon), Number(data[0].lat)]
  };
}

async function fixListings() {
  await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");

  const listings = await Listing.find({
    $or: [
      { coordinates: { $exists: false } },
      { "coordinates.coordinates": { $size: 0 } }
    ]
  });

  console.log(`Found ${listings.length} listings to fix`);

  for (let listing of listings) {
    const coords = await geocode(listing.location, listing.country);

    if (coords) {
      listing.coordinates = coords;
      await listing.save();
      console.log(`✔ Fixed: ${listing.title}`);
    } else {
      console.log(`❌ Failed: ${listing.title}`);
    }

    await new Promise(r => setTimeout(r, 1000)); // REQUIRED (rate limit)
  }

  mongoose.connection.close();
  console.log("🎉 All done");
}

fixListings();
