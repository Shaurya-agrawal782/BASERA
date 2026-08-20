import React, { useState, useRef, useEffect, useCallback } from "react";
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
  const [activeSlot, setActiveSlot] = useState("A"); // "A" or "B"
  const [srcA, setSrcA] = useState(HERO_VIDEOS[0].src);
  const [srcB, setSrcB] = useState(HERO_VIDEOS[1].src);
  const isTransitioningRef = useRef(false);

  const videoRefA = useRef(null);
  const videoRefB = useRef(null);

  // Smooth Crossfade to the Next Video
  const transitionToNext = useCallback(() => {
    if (isTransitioningRef.current) return;
    isTransitioningRef.current = true;

    const nextIndex = (currentIndex + 1) % HERO_VIDEOS.length;
    const nextSrc = HERO_VIDEOS[nextIndex].src;

    if (activeSlot === "A") {
      // Prepare and crossfade to Slot B
      setSrcB(nextSrc);
      if (videoRefB.current) {
        videoRefB.current.currentTime = 0;
        videoRefB.current.play().catch(() => {});
      }
      setActiveSlot("B");
    } else {
      // Prepare and crossfade to Slot A
      setSrcA(nextSrc);
      if (videoRefA.current) {
        videoRefA.current.currentTime = 0;
        videoRefA.current.play().catch(() => {});
      }
      setActiveSlot("A");
    }

    setCurrentIndex(nextIndex);

    // Release lock after crossfade completes
    setTimeout(() => {
      isTransitioningRef.current = false;
    }, 1200);
  }, [activeSlot, currentIndex]);

  // Initial playback setup
  useEffect(() => {
    if (videoRefA.current) {
      videoRefA.current.play().catch(() => {});
    }
  }, []);

  // Timeupdate listener for 1s pre-end crossfade
  const handleTimeUpdate = (e) => {
    const video = e.target;
    if (video.duration && video.currentTime >= video.duration - 0.8) {
      transitionToNext();
    }
  };

  const currentVideo = HERO_VIDEOS[currentIndex];

  return (
    <section
      className="figma-hero-section"
      onClick={transitionToNext}
      title="Click anywhere to seamlessly transition to the next sanctuary"
    >
      {/* Dual Video Buffer Layer for 0-Flicker Cinematic Crossfade */}
      <div className="figma-hero-bg-wrapper">
        {/* Video Player A */}
        <video
          ref={videoRefA}
          src={srcA}
          autoPlay
          muted
          playsInline
          onTimeUpdate={activeSlot === "A" ? handleTimeUpdate : undefined}
          onEnded={activeSlot === "A" ? transitionToNext : undefined}
          className={`figma-hero-video ${activeSlot === "A" ? "video-active" : "video-inactive"}`}
        />

        {/* Video Player B */}
        <video
          ref={videoRefB}
          src={srcB}
          autoPlay
          muted
          playsInline
          onTimeUpdate={activeSlot === "B" ? handleTimeUpdate : undefined}
          onEnded={activeSlot === "B" ? transitionToNext : undefined}
          className={`figma-hero-video ${activeSlot === "B" ? "video-active" : "video-inactive"}`}
        />

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
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
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
