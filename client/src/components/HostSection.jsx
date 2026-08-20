import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

const PROPERTY_TYPES = [
  {
    id: "villa",
    label: "Coastal Villa",
    earnings: "$18,500",
    days: "14 nights / mo",
    rate: "$1,320 / night",
  },
  {
    id: "chalet",
    label: "Alpine Chalet",
    earnings: "$15,200",
    days: "12 nights / mo",
    rate: "$1,260 / night",
  },
  {
    id: "estate",
    label: "Historic Estate",
    earnings: "$24,000",
    days: "16 nights / mo",
    rate: "$1,500 / night",
  },
];

const HostSection = () => {
  const [selectedType, setSelectedType] = useState(PROPERTY_TYPES[0]);

  return (
    <section className="figma-host-section" id="host">
      <div className="container">
        <div className="host-atelier-card">
          {/* LEFT CONTENT & INTERACTIVE ESTIMATOR */}
          <div className="host-atelier-left">
            <span className="figma-eyebrow">✦ PRIVATE ATELIER &amp; HOSTING ✦</span>
            <h2 className="host-atelier-title">
              Open Your Architectural Sanctuary to the World
            </h2>
            <p className="host-atelier-desc">
              Join an exclusive collective of architectural custodians, heritage villa owners, and design purists. We selectively connect your home with discerning global travelers who revere design as living art.
            </p>

            {/* INTERACTIVE EARNINGS SIMULATOR */}
            <div className="host-estimator-box">
              <div className="estimator-header">
                <span className="estimator-label">Select Your Sanctuary Archetype</span>
                <div className="estimator-pills">
                  {PROPERTY_TYPES.map((type) => (
                    <button
                      key={type.id}
                      type="button"
                      className={`estimator-pill ${
                        selectedType.id === type.id ? "active" : ""
                      }`}
                      onClick={() => setSelectedType(type)}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dynamic Revenue Display */}
              <div className="estimator-result-row">
                <div className="result-main">
                  <span className="result-sub-label">Estimated Potential</span>
                  <motion.div
                    key={selectedType.id}
                    className="result-figure"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {selectedType.earnings}
                    <span className="result-period">/ month</span>
                  </motion.div>
                </div>

                <div className="result-metric-chips">
                  <span className="metric-chip">
                    <TrendingUp size={12} className="metric-chip-icon" />
                    {selectedType.rate}
                  </span>
                  <span className="metric-chip">
                    {selectedType.days}
                  </span>
                </div>
              </div>
            </div>

            {/* 3 HOST PRIVILEGES PILLARS (CLEAN MINIMALIST EDITORIAL) */}
            <div className="host-privileges-grid">
              <div className="privilege-item">
                <span className="privilege-bullet">✦</span>
                <div className="privilege-text">
                  <h5>$2,000,000 Bespoke Cover</h5>
                  <p>Comprehensive protection for architecture, grounds, and rare artifact fixtures.</p>
                </div>
              </div>

              <div className="privilege-item">
                <span className="privilege-bullet">✦</span>
                <div className="privilege-text">
                  <h5>Pre-Screened Design Patrons</h5>
                  <p>100% ID-verified guests curated specifically for aesthetic and spatial respect.</p>
                </div>
              </div>

              <div className="privilege-item">
                <span className="privilege-bullet">✦</span>
                <div className="privilege-text">
                  <h5>Complimentary Editorial Shoot</h5>
                  <p>We send an architectural magazine photographer to document your residence.</p>
                </div>
              </div>
            </div>

            {/* ACTION CTA ROW */}
            <div className="host-actions-row">
              <Link to="/listings/new" className="host-primary-cta">
                <span>Begin Host Curation</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          {/* RIGHT EDITORIAL ARCHITECTURAL VISUAL */}
          <div className="host-atelier-right">
            <div className="host-image-container">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2400&q=95"
                alt="Architectural Villa Sanctuary"
                className="host-hero-photo"
                loading="lazy"
              />
              <div className="host-image-overlay"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HostSection;
