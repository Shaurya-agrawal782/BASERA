const User = require("../models/user.js");

// POST /api/users/signup
module.exports.signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Username, email, and password are required.",
      });
    }

    const newUser = new User({ email: email.trim(), username: username.trim() });
    const registeredUser = await User.register(newUser, password);

    req.login(registeredUser, (err) => {
      if (err) {
        return next(err);
      }
      res.status(201).json({
        success: true,
        message: "Welcome to Basera!",
        user: {
          _id: registeredUser._id,
          username: registeredUser.username,
          email: registeredUser.email,
        },
      });
    });
  } catch (e) {
    res.status(400).json({
      success: false,
      message: e.message || "Registration failed.",
    });
  }
};

// POST /api/users/login
module.exports.login = async (req, res) => {
  res.json({
    success: true,
    message: `Welcome back, ${req.user.username}!`,
    user: {
      _id: req.user._id,
      username: req.user.username,
      email: req.user.email,
    },
  });
};

// POST /api/users/logout & GET /api/users/logout
module.exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.json({
      success: true,
      message: "You are logged out!",
    });
  });
};

// GET /api/users/current-user
module.exports.getCurrentUser = (req, res) => {
  if (req.isAuthenticated() && req.user) {
    return res.json({
      success: true,
      user: {
        _id: req.user._id,
        username: req.user.username,
        email: req.user.email,
      },
    });
  }
  res.json({
    success: true,
    user: null,
  });
};