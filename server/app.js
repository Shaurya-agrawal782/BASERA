const path = require("path");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: path.join(__dirname, ".env") });
  require("dotenv").config({ path: path.join(__dirname, "..", ".env") });
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const cors = require("cors");
const User = require("./models/user.js");

const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

const secret = process.env.SECRET || "baserasecretkeyfallback";
const PORT = process.env.PORT || 8080;

async function startServer() {
  const atlasUrl = process.env.ATLASDB_URL;
  const localUrl = "mongodb://127.0.0.1:27017/wanderlust";

  let connectedUrl = localUrl;

  // Attempt Atlas connection if provided, with quick 3s fallback to local DB
  if (atlasUrl) {
    try {
      console.log("Connecting to MongoDB Atlas...");
      await mongoose.connect(atlasUrl, { serverSelectionTimeoutMS: 3000 });
      console.log("Connected to MongoDB Atlas!");
      connectedUrl = atlasUrl;
    } catch (err) {
      console.warn(
        "Atlas connection failed (IP whitelist/network). Switching to local MongoDB..."
      );
      try {
        await mongoose.disconnect();
      } catch (e) {}
      await mongoose.connect(localUrl);
      console.log("Connected to Local MongoDB (wanderlust)!");
      connectedUrl = localUrl;
    }
  } else {
    await mongoose.connect(localUrl);
    console.log("Connected to Local MongoDB (wanderlust)!");
    connectedUrl = localUrl;
  }

  // CORS configuration
  const allowedOrigins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:8080",
    "http://localhost:3000",
  ];

  app.use(
    cors({
      origin: function (origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
          callback(null, true);
        } else {
          callback(null, true);
        }
      },
      credentials: true,
    })
  );

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(express.static(path.join(__dirname, "public")));

  // Mongo Session Store
  const StoreClass = MongoStore.default || MongoStore;
  const store = StoreClass.create({
    mongoUrl: connectedUrl,
    crypto: {
      secret: secret,
    },
    touchAfter: 24 * 3600,
  });

  store.on("error", (err) => {
    console.error("Mongo Session Store error:", err.message);
  });

  const sessionOptions = {
    store,
    secret: secret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "lax",
    },
  };

  app.use(session(sessionOptions));
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(new LocalStrategy(User.authenticate()));
  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());

  // Context locals
  app.use((req, res, next) => {
    res.locals.currUser = req.user;
    next();
  });

  // REST API Routes
  app.use("/api/listings", listingRouter);
  app.use("/api/listings/:id/reviews", reviewRouter);
  app.use("/api/users", userRouter);

  // Serve client build in production
  const clientDist = path.join(__dirname, "..", "client", "dist");
  app.use(express.static(clientDist));

  app.get(/^\/(?!api).*/, (req, res, next) => {
    const indexHtml = path.join(clientDist, "index.html");
    const fs = require("fs");
    if (fs.existsSync(indexHtml)) {
      return res.sendFile(indexHtml);
    }
    next();
  });

  // 404 Handler for API
  app.use((req, res) => {
    res.status(404).json({
      success: false,
      message: "Page / API endpoint not found!",
    });
  });

  // Global Error Handler
  app.use((err, req, res, next) => {
    const { statusCode = 500, message = "Something went wrong" } = err;
    res.status(statusCode).json({
      success: false,
      message,
    });
  });

  app.listen(PORT, () => {
    console.log(`Basera Server is listening on port ${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
});