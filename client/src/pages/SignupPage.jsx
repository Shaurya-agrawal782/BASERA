import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { Compass, User, Mail, Lock, Sparkles } from "lucide-react";

const SignupPage = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !email || !password) return;

    setSubmitting(true);
    const res = await signup(username, email, password);
    setSubmitting(false);

    if (res.success) {
      navigate("/");
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

        <h1 className="auth-title">Join Basera</h1>
        <p className="auth-subtitle">Discover unique stays & experience unforgettable trips worldwide</p>

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
                placeholder="Pick a unique username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoFocus
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="email">
              Email Address
            </label>
            <div className="auth-input-wrapper">
              <Mail size={18} className="auth-field-icon" />
              <input
                id="email"
                type="email"
                className="form-input auth-input"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
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
                placeholder="Create a strong password (min. 6 characters)"
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
            {submitting ? "Creating Account..." : "Create Free Account ✨"}
          </motion.button>
        </form>

        <div className="auth-footer-text">
          Already have an account?{" "}
          <Link to="/login" className="auth-footer-link">
            Log in
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default SignupPage;
