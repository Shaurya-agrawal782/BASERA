import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Volume2, VolumeX } from "lucide-react";

// The 3 AI-generated cinematic preloader video reels
const PRELOADER_VIDEOS = [
  "/preloader/preload.mp4",
  "/preloader/preload2.mp4",
  "/preloader/preload3.mp4",
];

// High-speed Marvel flipbook architectural stills
const FILM_FRAMES = [
  "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=2000&q=95",
  "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=2000&q=95",
  "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&w=2000&q=95",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=2000&q=95",
  "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=2000&q=95",
  "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=2000&q=95",
  "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=2000&q=95",
  "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=2000&q=95",
  "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=2000&q=95",
  "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=2000&q=95",
  "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=2000&q=95",
  "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=2000&q=95",
];

const PHRASES = [
  "INITIALIZING ARCHITECTURAL ATELIER...",
  "PROVENANCE & ACOUSTIC TRANQUILITY...",
  "CURATING SENSORY LIVING...",
  "DISCREET GLOBAL SANCTUARIES...",
  "ARRIVING AT STILLNESS...",
];

const CinematicPreloader = ({ onComplete }) => {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [activeVideoIdx, setActiveVideoIdx] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [showPreloader, setShowPreloader] = useState(true);

  const containerRef = useRef(null);
  const centerStageRef = useRef(null);
  const videoRef = useRef(null);
  const flareRef = useRef(null);
  const numberRef = useRef(null);
  const progressFillRef = useRef(null);
  const statusRef = useRef(null);
  const audioCtxRef = useRef(null);
  const intervalRef = useRef(null);
  const animFrameRef = useRef(null);
  const isFinishedRef = useRef(false);

  // Synthesize Cinematic Sound FX using Web Audio API
  const playCinematicSound = (type) => {
    if (isMuted) return;
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") ctx.resume();

      if (type === "tick") {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(950 + Math.random() * 200, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.03);
        gain.gain.setValueAtTime(0.04, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.04);
      } else if (type === "chord") {
        const freqs = [130.81, 164.81, 196.0, 246.94, 293.66, 392.0, 523.25];
        freqs.forEach((f, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = idx % 2 === 0 ? "sine" : "triangle";
          osc.frequency.setValueAtTime(f, ctx.currentTime);
          gain.gain.setValueAtTime(0, ctx.currentTime);
          gain.gain.linearRampToValueAtTime(0.06 / (idx + 1), ctx.currentTime + 0.8);
          gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 3.8);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start();
          osc.stop(ctx.currentTime + 3.9);
        });
      }
    } catch (e) {}
  };

  const handleFinish = () => {
    if (isFinishedRef.current) return;
    isFinishedRef.current = true;
    clearInterval(intervalRef.current);
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);

    playCinematicSound("chord");

    const tl = gsap.timeline({
      onComplete: () => {
        setShowPreloader(false);
        if (onComplete) onComplete();
      },
    });

    // 1. Golden Flare Sweep & Champagne Glow
    tl.to(flareRef.current, {
      opacity: 1,
      scaleX: 3.2,
      duration: 0.7,
      ease: "power3.out",
    })
      // 2. Cinematic Center Stage Dissolve & Scale Forward
      .to(centerStageRef.current, {
        scale: 1.06,
        opacity: 0,
        filter: "blur(6px)",
        duration: 0.9,
        ease: "power3.inOut",
      }, "-=0.3")
      // 3. Staggered Vertical Lacquer Shutter Blade Retraction
      .to(".preloader-shutter-blade", {
        scaleY: 0,
        transformOrigin: (i) => (i % 2 === 0 ? "top" : "bottom"),
        stagger: 0.06,
        duration: 1.3,
        ease: "power4.inOut",
      }, "-=0.6")
      // 4. Smooth Fade of root container
      .to(containerRef.current, {
        opacity: 0,
        duration: 0.5,
        ease: "power2.inOut",
      }, "-=0.5");
  };

  useEffect(() => {
    // 1. Marvel-style rapid film frame flipping inside letters
    let frameIdx = 0;
    let tickCount = 0;
    intervalRef.current = setInterval(() => {
      frameIdx = (frameIdx + 1) % FILM_FRAMES.length;
      setCurrentFrame(frameIdx);
      tickCount++;
      if (tickCount % 2 === 0) {
        playCinematicSound("tick");
      }
    }, 85);

    // 2. Video-Synchronized Ultra-Fluid Odometer Engine (120fps lerp)
    let currentPercent = 0;
    let targetPercent = 0;
    let lastRenderedFloor = -1;
    const startTime = performance.now();
    const TARGET_DURATION = 6200; // 6.2s total build

    const updateOdometer = (now) => {
      if (isFinishedRef.current) return;

      const elapsed = now - startTime;
      const progress = Math.min(elapsed / TARGET_DURATION, 1);
      // Smooth cubic-bezier acceleration and deceleration curve
      const eased = progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      targetPercent = eased * 100;
      currentPercent += (targetPercent - currentPercent) * 0.18;

      const floorVal = Math.floor(currentPercent);
      if (floorVal !== lastRenderedFloor) {
        lastRenderedFloor = floorVal;

        if (numberRef.current) {
          numberRef.current.textContent = `${floorVal < 10 ? `00${floorVal}` : floorVal < 100 ? `0${floorVal}` : "100"}%`;
        }
        if (progressFillRef.current) {
          progressFillRef.current.style.width = `${currentPercent}%`;
        }
        if (statusRef.current) {
          const pIdx = Math.min(Math.floor((floorVal / 100) * PHRASES.length), PHRASES.length - 1);
          statusRef.current.textContent = PHRASES[pIdx];
        }

        // Seamless video reel transition
        if (floorVal < 35) {
          setActiveVideoIdx(0);
        } else if (floorVal < 70) {
          setActiveVideoIdx(1);
        } else {
          setActiveVideoIdx(2);
        }
      }

      if (progress >= 1 && floorVal >= 99) {
        if (numberRef.current) numberRef.current.textContent = "100%";
        if (progressFillRef.current) progressFillRef.current.style.width = "100%";
        handleFinish();
      } else {
        animFrameRef.current = requestAnimationFrame(updateOdometer);
      }
    };

    animFrameRef.current = requestAnimationFrame(updateOdometer);

    // Initial Letters Fade-In & Subtitle
    gsap.fromTo(
      ".marvel-char",
      { opacity: 0, y: 35, scale: 0.85 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.2,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.4,
      }
    );

    gsap.fromTo(
      ".preloader-tagline-text",
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 1.0, ease: "power2.out", delay: 1.2 }
    );

    return () => {
      clearInterval(intervalRef.current);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isMuted]);

  if (!showPreloader) return null;

  return (
    <div className="marvel-preloader-root" ref={containerRef}>
      {/* 5 Vertical Architectural Shutter Blades for Split Curtain Exit */}
      <div className="preloader-shutters-wrapper">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="preloader-shutter-blade" />
        ))}
      </div>

      {/* Full-Bleed Atmospheric AI Cinema Video Canvas */}
      <div className="preloader-ai-video-bg">
        <video
          ref={videoRef}
          key={PRELOADER_VIDEOS[activeVideoIdx]}
          src={PRELOADER_VIDEOS[activeVideoIdx]}
          autoPlay
          loop
          muted
          playsInline
          className="preloader-cinema-video"
        />
        <div className="preloader-cinema-scrim" />
      </div>

      {/* Floating Golden Stars / Embers Dust */}
      <div className="preloader-dust-particles" />

      {/* Top Header Utilities */}
      <div className="preloader-top-bar" style={{ justifyContent: "flex-end" }}>
        <div className="preloader-top-actions">
          <button
            type="button"
            className="preloader-mute-btn"
            onClick={() => {
              setIsMuted(!isMuted);
              if (isMuted && !audioCtxRef.current) {
                audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
              }
            }}
            title={isMuted ? "Enable Cinematic Sound" : "Mute Sound"}
          >
            {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
            <span>{isMuted ? "AUDIO OFF" : "AUDIO ON"}</span>
          </button>
        </div>
      </div>

      {/* CENTERPIECE: MARVEL-STYLE FLIPBOOK LETTERS */}
      <div className="preloader-center-stage" ref={centerStageRef}>
        <div className="preloader-logo-wrap">
          {/* Active Background Film Frame Masked inside Typography */}
          <div
            className="marvel-film-strip-bg"
            style={{
              backgroundImage: `url(${FILM_FRAMES[currentFrame]})`,
            }}
          />
          <div className="marvel-film-grain-overlay" />

          {/* Bold Cutout Letterforms */}
          <div className="marvel-letters-row">
            {["B", "A", "S", "E", "R", "A"].map((letter, idx) => (
              <span
                key={idx}
                ref={(el) => (lettersRef.current[idx] = el)}
                className="marvel-char"
              >
                {letter}
              </span>
            ))}
          </div>

          {/* Anamorphic Golden Light Flare Streak */}
          <div className="marvel-light-flare" ref={flareRef} />
        </div>

        {/* Cinematic Subtitle */}
        <p className="preloader-tagline-text">
          WHERE ARCHITECTURAL PROVENANCE MEETS STILLNESS
        </p>

        {/* Precision Progress Odometer & Gauge */}
        <div className="preloader-odometer-box">
          <div className="preloader-counter-row">
            <span className="preloader-status-msg" ref={statusRef}>
              INITIALIZING ARCHITECTURAL ATELIER...
            </span>
            <span className="preloader-number-val" ref={numberRef}>
              000%
            </span>
          </div>

          <div className="preloader-progress-track">
            <div
              className="preloader-progress-bar"
              ref={progressFillRef}
              style={{ width: "0%" }}
            />
          </div>
        </div>
      </div>

      {/* Bottom Coordinates & Edition */}
      <div className="preloader-bottom-bar">
        <span>EST. MMXXIV · PRIVATE ATELIER</span>
        <span>LAT 36.3932° N · LON 25.4615° E</span>
      </div>
    </div>
  );
};

export default CinematicPreloader;
