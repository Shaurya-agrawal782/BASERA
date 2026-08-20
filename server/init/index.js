const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });
require("dotenv").config({ path: path.join(__dirname, "..", "..", ".env") });

const initData = require("./data.js");
const Listing = require("../models/listing.js");
const User = require("../models/user.js");

const DB_URL = process.env.ATLASDB_URL || process.env.MONGO_URL || "mongodb://127.0.0.1:27017/basera";

async function main() {
  await mongoose.connect(DB_URL);
  console.log("Connected to DB for initialization");
}

const initDB = async () => {
  await main();
  
  let demoUser = await User.findOne({ username: "basera_host" });
  if (!demoUser) {
    demoUser = new User({ email: "host@baserastays.com", username: "basera_host" });
    demoUser = await User.register(demoUser, "password123");
  }

  await Listing.deleteMany({});
  const seededData = initData.data.map((obj) => ({
    ...obj,
    owner: demoUser._id,
  }));
  
  await Listing.insertMany(seededData);
  console.log(`Data initialized with ${seededData.length} listings!`);
  await mongoose.disconnect();
  process.exit(0);
};

initDB().catch((err) => {
  console.error(err);
  process.exit(1);
});