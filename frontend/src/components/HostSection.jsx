import React from "react";
import { Link } from "react-router-dom";

const HostSection = () => {
  return (
    <section className="figma-host-section">
      <div className="container">
        <div className="figma-host-card">
          {/* Left Text */}
          <div className="figma-host-left">
            <span className="figma-eyebrow">The Collection</span>
            <h2 className="figma-host-title">Become a Basera Host</h2>
            <p className="figma-host-desc">
              Join the world's most prestigious host community. We selectively partner with owners of Architect-designed residences, heritage estates, and unique retreats.
            </p>
            <p className="figma-host-highlight">
              Average host earnings exceed $12,500 monthly with our global premium guest catalog.
            </p>
            <Link to="/listings/new" className="figma-host-cta-btn">
              Apply to Host
            </Link>
          </div>

          {/* Right Image */}
          <div className="figma-host-right">
            <img
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=1000&q=80"
              alt="Basera Host"
              className="figma-host-img"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HostSection;
