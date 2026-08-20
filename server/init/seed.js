const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });
require("dotenv").config({ path: path.join(__dirname, "..", "..", ".env") });

const initData = require("./data.js");
const Listing = require("../models/listing.js");
const User = require("../models/user.js");

const DB_URL = process.env.ATLASDB_URL || process.env.MONGO_URL || "mongodb://127.0.0.1:27017/basera";

const categories = [
  "Trending", "Rooms", "Iconic cities", "Mountains", "Castles",
  "Amazing pools", "Camping", "Farms", "Arctic", "Domes", "Boats"
];

async function seed() {
  const isAtlas = DB_URL.includes("mongodb.net");
  console.log(`Connecting to ${isAtlas ? "MongoDB Atlas Cluster" : "MongoDB (" + DB_URL + ")"}...`);
  
  await mongoose.connect(DB_URL);
  console.log("Connected successfully to Database for seeding!");

  // Create demo host user if none exists
  let demoUser = await User.findOne({ username: "basera_host" });
  if (!demoUser) {
    demoUser = new User({ email: "host@baserastays.com", username: "basera_host" });
    demoUser = await User.register(demoUser, "password123");
    console.log("Created demo host user: @basera_host / password123");
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
    console.log(`Successfully seeded ${formattedData.length} sample listings into the cluster! ✨`);
  } else {
    console.log(`Database already has ${count} listings. Skipping re-seed.`);
  }

  await mongoose.disconnect();
  console.log("Database connection closed.");
  process.exit(0);
}

seed().catch(err => {
  console.error("Seeding error:", err);
  process.exit(1);
});
