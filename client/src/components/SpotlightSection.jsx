import React from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const SpotlightSection = ({ onExploreClick }) => {
  return (
    <section className="figma-spotlight-section">
      <div className="figma-spotlight-bg-wrapper">
        <div
          className="figma-spotlight-bg"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2800&q=95')`,
          }}
        ></div>
        <div className="figma-spotlight-overlay"></div>
      </div>

      <div className="container figma-spotlight-content">
        <motion.blockquote
          className="figma-spotlight-quote"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          &ldquo;The design was absolutely immaculate. Every corner felt curated, the light felt beautifully, and waking up to the mist over the valley was a memory we will hold onto forever.&rdquo;
        </motion.blockquote>

        <div className="figma-spotlight-author">
          <div className="author-name">Julian &amp; Charlotte</div>
          <div className="author-role">GUESTS AT THE GLASSHOUSE, NEW ZEALAND</div>
        </div>

        <button onClick={onExploreClick} className="figma-spotlight-btn">
          <span>View This Property</span>
          <ArrowRight size={16} />
        </button>
      </div>
    </section>
  );
};

export default SpotlightSection;
