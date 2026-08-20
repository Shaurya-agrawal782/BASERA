import React from "react";
import { Search, Calendar, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const HowItWorksSection = () => {
  return (
    <section className="figma-how-section">
      <div className="container">
        <div className="figma-section-header text-center">
          <span className="figma-eyebrow">The Experience</span>
          <h2 className="figma-section-title">How Basera Redefines Travel</h2>
        </div>

        <div className="figma-how-grid">
          <motion.div
            className="figma-how-card"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="figma-how-icon-box">
              <Search size={22} color="#D97706" />
            </div>
            <h3 className="figma-how-title">Discover</h3>
            <p className="figma-how-desc">
              Browse a highly selective portfolio of the world's most beautifully designed homes, verified for aesthetic merit.
            </p>
          </motion.div>

          <motion.div
            className="figma-how-card"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="figma-how-icon-box">
              <Calendar size={22} color="#D97706" />
            </div>
            <h3 className="figma-how-title">Book Instantly</h3>
            <p className="figma-how-desc">
              Enjoy direct, premium customer support, simple secure booking, and free flexible cancellation windows.
            </p>
          </motion.div>

          <motion.div
            className="figma-how-card"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="figma-how-icon-box">
              <Sparkles size={22} color="#D97706" />
            </div>
            <h3 className="figma-how-title">Experience</h3>
            <p className="figma-how-desc">
              Arrive to a personally curated environment featuring five-star amenities, artisanal linens, and a local host's private journal.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
