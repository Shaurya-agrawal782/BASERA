import React from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const COLLECTIONS = [
  {
    title: "Mountain Retreats",
    count: "24 Sanctuaries",
    category: "Mountains",
    tagline: "Alpine Solitude & Nordic Cabins",
    video: "https://assets.mixkit.co/videos/preview/mixkit-fog-over-the-mountain-peaks-33068-large.mp4",
    poster: "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Coastal Escapes",
    count: "18 Sanctuaries",
    category: "Amazing pools",
    tagline: "Mediterranean Cliffs & Azure Pools",
    video: "https://assets.mixkit.co/videos/preview/mixkit-waves-coming-to-the-beach-5016-large.mp4",
    poster: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Heritage Estates",
    count: "12 Sanctuaries",
    category: "Castles",
    tagline: "Tuscan Castles & Historic Villas",
    video: "https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-beautiful-villa-with-a-pool-42512-large.mp4",
    poster: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop",
  },
];

const CuratedCollectionsSection = ({ onSelectCategory }) => {
  return (
    <section className="figma-collections-section" id="collections">
      <div className="container">
        <div className="figma-section-header text-center">
          <span className="figma-eyebrow">ARCHITECTURAL DESIGN LANGUAGES</span>
          <h2 className="figma-section-title">Curated Collections</h2>
          <p className="figma-section-sub">
            Thoughtfully cataloged design languages for the discerning traveler
          </p>
        </div>

        <div className="figma-collections-grid">
          {COLLECTIONS.map((item) => (
            <motion.div
              key={item.title}
              className="figma-collection-card group"
              onClick={() => onSelectCategory && onSelectCategory(item.category)}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3 }}
            >
              {/* Background Ambient Video */}
              <video
                src={item.video}
                poster={item.poster}
                autoPlay
                loop
                muted
                playsInline
                className="figma-collection-video"
              />

              {/* Luxury Gradient Darkening Overlay */}
              <div className="figma-collection-overlay"></div>

              {/* Bottom Metadata */}
              <div className="figma-collection-meta">
                <span className="figma-collection-tagline">{item.tagline}</span>
                <h3 className="figma-collection-title">{item.title}</h3>
                <div className="figma-collection-link">
                  <span>{item.count}</span>
                  <ArrowRight size={14} className="collection-arrow-icon" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CuratedCollectionsSection;
