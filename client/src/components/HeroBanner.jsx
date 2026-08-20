import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const HERO_VIDEOS = [
  {
    src: "/home.mp4",
    tagline: "Unearth the Exceptional",
    title: "The Art of Escape",
    code: "01",
  },
  {
    src: "/2.mp4",
    tagline: "Nordic Solitude & Light",
    title: "Silent Fjord Haven",
    code: "02",
  },
  {
    src: "/3.mp4",
    tagline: "Alpine Heights & Serenity",
    title: "Cedarwood Solitude",
    code: "03",
  },
  {
    src: "/4.mp4",
    tagline: "Old-World Provenance",
    title: "Tuscan Stone Heritage",
    code: "04",
  },
  {
    src: "/5.mp4",
    tagline: "Celestial Desert Architecture",
    title: "Sahara Stargazing Dune",
    code: "05",
  },
  {
    src: "/6.mp4",
    tagline: "Nautical Coastlines & Waters",
    title: "Oceanfront Reflection",
    code: "06",
  },
];

const HeroBanner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const videoRef = useRef(null);

  // Advance to next video
  const handleNextVideo = () => {
    setCurrentIndex((prev) => (prev + 1) % HERO_VIDEOS.length);
  };

  // Play video automatically on index change
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch((err) => {
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
    </section>
  );
};

export default HeroBanner;
