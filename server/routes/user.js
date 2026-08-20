const express = require("express");
const router = express.Router();
const passport = require("passport");
const wrapAsync = require("../utils/wrapAsync.js");
const userController = require("../controllers/users.js");

// Register user
router.post("/signup", wrapAsync(userController.signup));

// Login user (custom callback for REST JSON response on error)
router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({
        success: false,
        message: info && info.message ? info.message : "Invalid username or password",
      });
    }
    req.login(user, (loginErr) => {
      if (loginErr) {
        return next(loginErr);
      }
      return userController.login(req, res);
    });
  })(req, res, next);
});

// Logout user
router.get("/logout", userController.logout);
router.post("/logout", userController.logout);

// Current user check
router.get("/current-user", userController.getCurrentUser);

module.exports = router;