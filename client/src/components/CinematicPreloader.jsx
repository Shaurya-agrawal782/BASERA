import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Sparkles, Volume2, VolumeX, ArrowRight } from "lucide-react";

// Curated 4K Marvel-style flipping architectural film frames
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
  "INITIALIZING SANCTUARIES...",
  "ARCHITECTURAL PROVENANCE...",
  "CURATING SENSORY STILLNESS...",
  "DISCREET ATELIER PORTFOLIO...",
  "ARRIVING AT SERENITY...",
];

const CinematicPreloader = ({ onComplete }) => {
  const [percent, setPercent] = useState(0);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [showPreloader, setShowPreloader] = useState(true);

  const containerRef = useRef(null);
  const lettersRef = useRef([]);
  const flareRef = useRef(null);
  const audioCtxRef = useRef(null);
  const intervalRef = useRef(null);
  const isFinishedRef = useRef(false);

  // Synthesize Cinematic Ambient Sounds using Web Audio API
  const playCinematicSound = (type) => {
    if (isMuted) return;
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") ctx.resume();

      if (type === "tick") {
        // Shutter film tick
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(800 + Math.random() * 400, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.04);
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.05);
      } else if (type === "chord") {
        // Grand celestial golden chord
        const freqs = [130.81, 164.81, 196.0, 246.94, 293.66, 392.0]; // Cmaj9 swell
        freqs.forEach((f, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = idx % 2 === 0 ? "sine" : "triangle";
          osc.frequency.setValueAtTime(f, ctx.currentTime);
          gain.gain.setValueAtTime(0, ctx.currentTime);
          gain.gain.linearRampToValueAtTime(0.06 / (idx + 1), ctx.currentTime + 0.8);
          gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 3.2);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start();
          osc.stop(ctx.currentTime + 3.3);
        });
      }
    } catch (e) {
      // Audio not permitted without gesture
    }
  };

  const handleFinish = () => {
    if (isFinishedRef.current) return;
    isFinishedRef.current = true;
    clearInterval(intervalRef.current);

    const tl = gsap.timeline({
      onComplete: () => {
        setShowPreloader(false);
        if (onComplete) onComplete();
      },
    });

    // Animate Marvel Logo Flash & Flare
    tl.to(flareRef.current, {
      opacity: 1,
      scaleX: 2.5,
      duration: 0.6,
      ease: "power2.out",
    })
      .to(".preloader-logo-wrap", {
        scale: 1.08,
        letterSpacing: "0.22em",
        duration: 0.8,
        ease: "power3.out",
      }, "-=0.4")
      .to(".preloader-shutter-blade", {
        scaleY: 0,
        transformOrigin: (i) => (i % 2 === 0 ? "top" : "bottom"),
        stagger: 0.08,
        duration: 1.1,
        ease: "power4.inOut",
      }, "+=0.2")
      .to(containerRef.current, {
        opacity: 0,
        duration: 0.4,
        ease: "power2.inOut",
      }, "-=0.4");
  };

  useEffect(() => {
    // 1. Rapid Marvel Comic-Style Flipbook Sequence inside the letters
    let frameIdx = 0;
    let tickCount = 0;
    intervalRef.current = setInterval(() => {
      frameIdx = (frameIdx + 1) % FILM_FRAMES.length;
      setCurrentFrame(frameIdx);
      tickCount++;
      if (tickCount % 2 === 0) {
        playCinematicSound("tick");
      }
    }, 90);

    // 2. GSAP Master Timeline for Counter & Marvel Reveal (Total ~8.2s)
    const masterTl = gsap.timeline({
      onComplete: handleFinish,
    });

    const counterObj = { val: 0 };

    // Act 1: Initial Counter build (0 -> 100%)
    masterTl.to(counterObj, {
      val: 100,
      duration: 5.5,
      ease: "power2.inOut",
      onUpdate: () => {
        const rounded = Math.floor(counterObj.val);
        setPercent(rounded);
        const pIdx = Math.min(Math.floor((rounded / 100) * PHRASES.length), PHRASES.length - 1);
        setPhraseIndex(pIdx);
      },
    });

    // Act 2: Letters Reveal & Rapid Flip acceleration
    masterTl.fromTo(
      ".marvel-char",
      { opacity: 0, y: 30, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.2,
        stagger: 0.12,
        ease: "power3.out",
      },
      0.8
    );

    // Act 3: Golden chord & Flare lock at 100%
    masterTl.call(() => {
      playCinematicSound("chord");
    }, null, 5.2);

    // Act 4: Tagline subtitle glide
    masterTl.fromTo(
      ".preloader-tagline-text",
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.9, ease: "power2.out" },
      5.4
    );

    return () => {
      clearInterval(intervalRef.current);
      masterTl.kill();
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

      {/* Floating Golden Stars / Embers Dust */}
      <div className="preloader-dust-particles" />

      {/* Top Header Utilities (Mute Toggle & Skip Button) */}
      <div className="preloader-top-bar">
        <div className="preloader-brand-badge">
          <Sparkles size={13} className="text-amber-400" />
          <span>BASERA ARCHITECTURAL CINEMA</span>
        </div>

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

          <button
            type="button"
            className="preloader-skip-btn"
            onClick={handleFinish}
          >
            <span>ENTER ATELIER</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* CENTERPIECE: MARVEL-STYLE FLIPBOOK LETTERS */}
      <div className="preloader-center-stage">
        <div className="preloader-logo-wrap">
          {/* Active Background Film Frame Masked inside the Typography */}
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
            <span className="preloader-status-msg">{PHRASES[phraseIndex]}</span>
            <span className="preloader-number-val">
              {percent < 10 ? `00${percent}` : percent < 100 ? `0${percent}` : "100"}%
            </span>
          </div>

          <div className="preloader-progress-track">
            <div
              className="preloader-progress-bar"
              style={{ width: `${percent}%` }}
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
