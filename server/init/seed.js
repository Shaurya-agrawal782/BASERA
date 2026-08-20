const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
const User = require("../models/user.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

const categories = [
  "Trending", "Rooms", "Iconic cities", "Mountains", "Castles",
  "Amazing pools", "Camping", "Farms", "Arctic", "Domes", "Boats"
];

async function seed() {
  await mongoose.connect(MONGO_URL);
  console.log("Connected to local DB for seeding");

  // Create demo user if none exists
  let demoUser = await User.findOne({ username: "wanderlust_host" });
  if (!demoUser) {
    demoUser = new User({ email: "host@wanderlust.com", username: "wanderlust_host" });
    demoUser = await User.register(demoUser, "password123");
    console.log("Created demo host user: @wanderlust_host / password123");
  }

  // Check if listings exist
  const count = await Listing.countDocuments();
  if (count === 0) {
    const formattedData = initData.data.map((item, idx) => ({
      ...item,
      owner: demoUser._id,
      category: item.category || categories[idx % categories.length],
      coordinates: {
        type: "Point",
        coordinates: [77.209 + (idx * 0.05) % 2, 28.6139 + (idx * 0.05) % 2],
      },
    }));

    await Listing.insertMany(formattedData);
    console.log(`Successfully seeded ${formattedData.length} sample listings!`);
  } else {
    console.log(`Database already has ${count} listings. Skipping re-seed.`);
  }

  process.exit(0);
}

seed().catch(err => {
  console.error("Seeding error:", err);
  process.exit(1);
});
