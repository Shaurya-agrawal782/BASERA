import React, { useState } from "react";
import { Search, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

const HeroBanner = ({ onSearch }) => {
  const [destination, setDestination] = useState("");

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(destination);
    }
  };

  return (
    <section className="figma-hero-section">
      {/* Background Image with Cinematic Darkness */}
      <div className="figma-hero-bg-wrapper">
        <div
          className="figma-hero-bg"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=2400&q=85')`,
          }}
        ></div>
        <div className="figma-hero-overlay"></div>
      </div>

      <div className="container figma-hero-content">
        <motion.span
          className="figma-hero-eyebrow"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Unearth the Exceptional
        </motion.span>

        <motion.h1
          className="figma-hero-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          The Art of Escape
        </motion.h1>

        {/* Floating Search Bar */}
        <motion.form
          onSubmit={handleSearchSubmit}
          className="figma-search-bar"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          {/* Location Field */}
          <div className="figma-search-field location">
            <span className="field-label">Location</span>
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="Where are you going?"
              className="field-input"
            />
          </div>

          <div className="search-field-divider"></div>

          {/* Check-In */}
          <div className="figma-search-field">
            <span className="field-label">Check-In</span>
            <span className="field-placeholder">Add dates</span>
          </div>

          <div className="search-field-divider"></div>

          {/* Check-Out */}
          <div className="figma-search-field">
            <span className="field-label">Check-Out</span>
            <span className="field-placeholder">Add dates</span>
          </div>

          <div className="search-field-divider"></div>

          {/* Guests */}
          <div className="figma-search-field">
            <span className="field-label">Guests</span>
            <span className="field-placeholder">Add guests</span>
          </div>

          {/* Search Button */}
          <button type="submit" className="figma-search-submit-btn">
            <Search size={16} />
            <span>Search</span>
          </button>
        </motion.form>
      </div>
    </section>
  );
};

export default HeroBanner;
