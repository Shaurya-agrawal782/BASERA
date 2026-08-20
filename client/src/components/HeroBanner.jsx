import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, Sparkles } from "lucide-react";

const HERO_VIDEOS = [
  {
    src: "/home.mp4",
    tagline: "Unearth the Exceptional",
    title: "The Art of Escape",
    location: "Aegean Cliffside Pavilion",
    code: "01",
  },
  {
    src: "/2.mp4",
    tagline: "Nordic Solitude & Light",
    title: "Silent Fjord Haven",
    location: "Lofoten Timber Sanctuary",
    code: "02",
  },
  {
    src: "/3.mp4",
    tagline: "Alpine Heights & Serenity",
    title: "Cedarwood Solitude",
    location: "Zermatt Mountain Estate",
    code: "03",
  },
  {
    src: "/4.mp4",
    tagline: "Old-World Provenance",
    title: "Tuscan Stone Heritage",
    location: "Val d'Orcia Historic Villa",
    code: "04",
  },
  {
    src: "/5.mp4",
    tagline: "Celestial Desert Architecture",
    title: "Sahara Stargazing Dune",
    location: "Moroccan Rammed Earth",
    code: "05",
  },
  {
    src: "/6.mp4",
    tagline: "Nautical Coastlines & Waters",
    title: "Oceanfront Reflection",
    location: "Amalfi Coastal Haven",
    code: "06",
  },
];

const HeroBanner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const videoRef = useRef(null);

  // Advance to next video
  const handleNextVideo = (e) => {
    if (e) e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % HERO_VIDEOS.length);
  };

  const handlePrevVideo = (e) => {
    if (e) e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + HERO_VIDEOS.length) % HERO_VIDEOS.length);
  };

  const handleSelectVideo = (idx, e) => {
    if (e) e.stopPropagation();
    setCurrentIndex(idx);
  };

  // Play video automatically on index change
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch((err) => {
        // Autoplay may be restricted if unmuted, muted handles it
        console.log("Video autoplay initialized:", err);
      });
    }
  }, [currentIndex]);

  const currentVideo = HERO_VIDEOS[currentIndex];

  return (
    <section
      className="figma-hero-section"
      onClick={handleNextVideo}
      title="Click anywhere to experience the next sanctuary video"
    >
      {/* Cinematic Autoplaying Background Video */}
      <div className="figma-hero-bg-wrapper">
        <video
          ref={videoRef}
          key={currentVideo.src}
          autoPlay
          muted
          playsInline
          onEnded={handleNextVideo}
          className="figma-hero-video"
        >
          <source src={currentVideo.src} type="video/mp4" />
        </video>
        <div className="figma-hero-overlay"></div>
      </div>

      {/* Hero Typography Content */}
      <div className="container figma-hero-content">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentVideo.code}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="figma-hero-text-block"
          >
            <span className="figma-hero-eyebrow">
              {currentVideo.tagline}
            </span>

            <h1 className="figma-hero-title">
              {currentVideo.title}
            </h1>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Floating Bottom Video Bar / Chapter Controls */}
      <div
        className="hero-video-controls-bar"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="hero-video-meta-left">
          <Sparkles size={13} className="text-amber-400" />
          <span className="hero-location-text">{currentVideo.location}</span>
          <span className="hero-divider-dot">·</span>
          <span className="hero-code-badge">
            {currentVideo.code} / 0{HERO_VIDEOS.length}
          </span>
        </div>

        {/* Dash Indicators */}
        <div className="hero-video-dashes">
          {HERO_VIDEOS.map((vid, idx) => (
            <button
              key={vid.code}
              type="button"
              className={`hero-dash-btn ${idx === currentIndex ? "active" : ""}`}
              onClick={(e) => handleSelectVideo(idx, e)}
              aria-label={`Jump to video ${idx + 1}`}
            >
              <span className="hero-dash-fill"></span>
            </button>
          ))}
        </div>

        {/* Prev / Next Arrows */}
        <div className="hero-video-arrows">
          <button
            type="button"
            className="hero-arrow-btn"
            onClick={handlePrevVideo}
            aria-label="Previous Video"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            type="button"
            className="hero-arrow-btn"
            onClick={handleNextVideo}
            aria-label="Next Video"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Subtle Bottom Click Hint */}
      <div className="hero-click-hint-pill">
        <span>Click screen to advance sanctuary</span>
      </div>
    </section>
  );
};

export default HeroBanner;
