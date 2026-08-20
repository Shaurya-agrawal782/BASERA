import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { LogIn, Compass, Lock, User, Sparkles } from "lucide-react";

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) return;

    setSubmitting(true);
    const res = await login(username, password);
    setSubmitting(false);

    if (res.success) {
      const redirectPath = location.state?.from || "/";
      navigate(redirectPath);
    }
  };

  return (
    <div className="auth-page-wrapper">
      <div className="auth-ambient-glow auth-glow-1"></div>
      <div className="auth-ambient-glow auth-glow-2"></div>

      <motion.div
        className="auth-card-glass"
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="auth-brand-badge">
          <Compass size={28} color="var(--primary-brand)" strokeWidth={2.2} />
        </div>

        <h1 className="auth-title">Welcome Back</h1>
        <p className="auth-subtitle">Log in to explore extraordinary stays & manage bookings</p>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label className="form-label" htmlFor="username">
              Username
            </label>
            <div className="auth-input-wrapper">
              <User size={18} className="auth-field-icon" />
              <input
                id="username"
                type="text"
                className="form-input auth-input"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoFocus
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="password">
              Password
            </label>
            <div className="auth-input-wrapper">
              <Lock size={18} className="auth-field-icon" />
              <input
                id="password"
                type="password"
                className="form-input auth-input"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <motion.button
            type="submit"
            className="btn-primary auth-submit-btn"
            disabled={submitting}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {submitting ? "Logging in..." : "Log in to Basera ✨"}
          </motion.button>
        </form>

        <div className="auth-footer-text">
          Don't have an account?{" "}
          <Link to="/signup" className="auth-footer-link">
            Sign up
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
