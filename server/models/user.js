const mongoose = require("mongoose");
const { Schema } = mongoose;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
  },
  {
    timestamps: true,
  }
);

// Support both CommonJS and ES Module imports of passport-local-mongoose
const plugin = passportLocalMongoose.default || passportLocalMongoose;
userSchema.plugin(plugin);

module.exports = mongoose.model("User", userSchema);