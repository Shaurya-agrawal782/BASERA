import React from "react";
import { motion } from "framer-motion";

const HeroBanner = () => {
  return (
    <section className="figma-hero-section">
      {/* Cinematic Autoplaying Background Video */}
      <div className="figma-hero-bg-wrapper">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="figma-hero-video"
          poster="https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=2400&q=85"
        >
          <source src="/home.mp4" type="video/mp4" />
        </video>
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
      </div>
    </section>
  );
};

export default HeroBanner;
