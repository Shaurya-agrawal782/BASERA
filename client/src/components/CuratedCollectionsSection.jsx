import React, { useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, Compass } from "lucide-react";
import { motion } from "framer-motion";

const COLLECTIONS = [
  {
    id: "mountains",
    chapter: "CHAPTER I",
    title: "Mountain Retreats",
    count: "24 Sanctuaries",
    category: "Mountains",
    tagline: "Alpine Solitude & Nordic Cabins",
    video: "https://assets.mixkit.co/videos/preview/mixkit-fog-over-the-mountain-peaks-33068-large.mp4",
    poster: "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "coastal",
    chapter: "CHAPTER II",
    title: "Coastal Escapes",
    count: "18 Sanctuaries",
    category: "Amazing pools",
    tagline: "Mediterranean Cliffs & Azure Pools",
    video: "https://assets.mixkit.co/videos/preview/mixkit-waves-coming-to-the-beach-5016-large.mp4",
    poster: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "heritage",
    chapter: "CHAPTER III",
    title: "Heritage Estates",
    count: "12 Sanctuaries",
    category: "Castles",
    tagline: "Tuscan Castles & Historic Villas",
    video: "https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-beautiful-villa-with-a-pool-42512-large.mp4",
    poster: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "desert",
    chapter: "CHAPTER IV",
    title: "Desert Sanctuaries",
    count: "15 Sanctuaries",
    category: "Iconic cities",
    tagline: "Oasis Pavilions & Stargazing Domes",
    video: "https://assets.mixkit.co/videos/preview/mixkit-red-sand-dunes-in-the-desert-42544-large.mp4",
    poster: "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "tropical",
    chapter: "CHAPTER V",
    title: "Tropical Pavilions",
    count: "20 Sanctuaries",
    category: "Amazing pools",
    tagline: "Balinese Rainforests & Eco-Villas",
    video: "https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-luxury-hotel-resort-with-swimming-pool-42510-large.mp4",
    poster: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80",
  },
];

const CuratedCollectionsSection = ({ onSelectCategory }) => {
  const [activeIndex, setActiveIndex] = useState(1); // Default to Coastal Escapes in center

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + COLLECTIONS.length) % COLLECTIONS.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % COLLECTIONS.length);
  };

  const handleCardClick = (index, category) => {
    if (index === activeIndex) {
      if (onSelectCategory) onSelectCategory(category);
    } else {
      setActiveIndex(index);
    }
  };

  return (
    <section className="figma-collections-section" id="collections">
      <div className="container">
        {/* SECTION HEADER WITH LUXURY SLIDER CONTROLS */}
        <div className="figma-collections-header-wrap">
          <div className="figma-collections-header-left">
            <span className="figma-eyebrow">✦ PRIVATE ARCHIVES &amp; DESIGN CHAPTERS</span>
            <h2 className="figma-section-title">Curated Collections</h2>
            <p className="figma-section-sub">
              Distinctive architectural sanctuaries, hand-cataloged across five world landscapes.
            </p>
          </div>

          {/* Luxury Navigation Controls */}
          <div className="collections-nav-controls">
            <span className="collections-counter-pill">
              0{activeIndex + 1} <span className="counter-sep">/</span> 0{COLLECTIONS.length}
            </span>

            <div className="collections-arrow-btns">
              <button
                className="collection-arrow-btn"
                onClick={handlePrev}
                aria-label="Previous Collection"
                type="button"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                className="collection-arrow-btn"
                onClick={handleNext}
                aria-label="Next Collection"
                type="button"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* 3D ELEVATED PEDESTAL STAGE (SMOOTH SPATIAL SWAP) */}
        <div className="collections-stage-viewport">
          <div className="collections-stage-track">
            {COLLECTIONS.map((item, idx) => {
              // Cyclic distance relative to active index
              let diff = idx - activeIndex;
              if (diff < -2) diff += COLLECTIONS.length;
              if (diff > 2) diff -= COLLECTIONS.length;

              const isCenter = diff === 0;
              const isLeft = diff === -1;
              const isRight = diff === 1;

              // Spatial coordinates
              let leftPercent = 50;
              let yVal = 0;
              let scaleVal = 0.90;
              let opacityVal = 0;
              let zIndexVal = 1;
              let pointerEvents = "none";

              if (isCenter) {
                leftPercent = 50;
                yVal = -44; // High floating center elevation
                scaleVal = 1.06;
                opacityVal = 1;
                zIndexVal = 10;
                pointerEvents = "auto";
              } else if (isLeft) {
                leftPercent = 16;
                yVal = 0;
                scaleVal = 0.90;
                opacityVal = 0.82;
                zIndexVal = 5;
                pointerEvents = "auto";
              } else if (isRight) {
                leftPercent = 84;
                yVal = 0;
                scaleVal = 0.90;
                opacityVal = 0.82;
                zIndexVal = 5;
                pointerEvents = "auto";
              } else if (diff < -1) {
                leftPercent = -25;
                yVal = 0;
                scaleVal = 0.75;
                opacityVal = 0;
                zIndexVal = 1;
              } else if (diff > 1) {
                leftPercent = 125;
                yVal = 0;
                scaleVal = 0.75;
                opacityVal = 0;
                zIndexVal = 1;
              }

              return (
                <motion.div
                  key={item.id}
                  className={`figma-collection-card ${isCenter ? "stage-center active" : "stage-side"}`}
                  onClick={() => handleCardClick(idx, item.category)}
                  initial={false}
                  animate={{
                    left: `${leftPercent}%`,
                    x: "-50%",
                    y: yVal,
                    scale: scaleVal,
                    opacity: opacityVal,
                    zIndex: zIndexVal,
                  }}
                  transition={{
                    duration: 0.7,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  style={{
                    pointerEvents,
                  }}
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

                  {/* High Contrast Vignette Scrim */}
                  <div className="figma-collection-overlay"></div>

                  {/* Luxury Editorial Metadata Dock */}
                  <div className="figma-collection-meta">
                    <div className="collection-tagline-wrap">
                      <span className="gold-diamond">◆</span>
                      <span className="figma-collection-tagline">{item.tagline}</span>
                    </div>

                    <h3 className="figma-collection-title">{item.title}</h3>

                    <div className="collection-action-pill">
                      <span className="action-pill-text">Explore {item.count}</span>
                      <div className="action-pill-arrow">
                        <ArrowRight size={13} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Carousel Pagination Dots */}
        <div className="collections-dots-wrap">
          {COLLECTIONS.map((_, dotIdx) => (
            <button
              key={dotIdx}
              type="button"
              className={`collection-dot ${dotIdx === activeIndex ? "active" : ""}`}
              onClick={() => setActiveIndex(dotIdx)}
              aria-label={`Go to slide ${dotIdx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CuratedCollectionsSection;
