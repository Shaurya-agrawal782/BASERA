import React from "react";
import { Link } from "react-router-dom";

export const BaseraWordmark = ({ width = 175, height = 40, className = "" }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 220 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`basera-artistic-wordmark ${className}`}
    aria-label="BASERA"
  >
    <defs>
      {/* High-Luxury Polished Gold Gradient */}
      <linearGradient id="artGold" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#F59E0B" />
        <stop offset="50%" stopColor="#D97706" />
        <stop offset="100%" stopColor="#92400E" />
      </linearGradient>

      {/* Deep Obsidian Noir */}
      <linearGradient id="artBlack" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#14110E" />
        <stop offset="100%" stopColor="#050403" />
      </linearGradient>

      {/* Sun Glow */}
      <radialGradient id="artSunGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#FDE68A" stopOpacity="0.9" />
        <stop offset="100%" stopColor="#D97706" stopOpacity="0" />
      </radialGradient>
    </defs>

    {/* SUNRISE ARCHES AT THE TOP OF S & E */}
    <circle cx="112" cy="7" r="3.5" fill="url(#artSunGlow)" />
    <circle cx="112" cy="7" r="1.8" fill="url(#artGold)" />
    <path
      d="M100 12C104 8.5 108 6.5 112 6.5C116 6.5 120 8.5 124 12"
      stroke="url(#artGold)"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <path
      d="M104 14.5C106.5 12.5 109 11.5 112 11.5C115 11.5 117.5 12.5 120 14.5"
      stroke="url(#artGold)"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeOpacity="0.8"
    />

    {/* ========================================================
        LETTER 'B'
        ======================================================== */}
    <rect x="8" y="14" width="3.2" height="23" rx="0.5" fill="url(#artBlack)" />
    <path d="M5.5 14H12.5M5.5 37H12.5" stroke="url(#artBlack)" strokeWidth="1.6" strokeLinecap="round" />
    <path
      d="M10 14H21C24.5 14 27.5 16.2 27.5 19.5C27.5 22.5 24.5 24.8 21 24.8H10"
      stroke="url(#artBlack)"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10 24.8H22C26.5 24.8 29 27.2 29 30.8C29 34.5 26 37 22 37H10"
      stroke="url(#artBlack)"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Gold Inset Dot on B */}
    <circle cx="19" cy="31" r="1.4" fill="url(#artGold)" />

    {/* ========================================================
        LETTER 'A' (FIRST)
        ======================================================== */}
    <path d="M37 37L48 14L59 37" stroke="url(#artBlack)" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
    {/* Gold Roof Gable Spire */}
    <path d="M45 14L48 10L51 14" stroke="url(#artGold)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M48 6.5V10" stroke="url(#artGold)" strokeWidth="2" strokeLinecap="round" />

    {/* ========================================================
        LETTER 'S'
        ======================================================== */}
    <path
      d="M91 18.5C89.5 15.5 86 14 81.5 14C75.5 14 71.5 17.5 71.5 21.5C71.5 26 75 28 80.5 29.5C86.5 31 91 32.8 91 37.2C91 42 86.5 45 80.5 45C74 45 70 41.5 69 37"
      stroke="url(#artBlack)"
      strokeWidth="3.2"
      strokeLinecap="round"
    />
    {/* Gold Feather Wing Accents on S */}
    <path d="M89.5 18.5L93.5 16.5" stroke="url(#artGold)" strokeWidth="2.2" strokeLinecap="round" />
    <path d="M69 37L65 39" stroke="url(#artGold)" strokeWidth="2.2" strokeLinecap="round" />

    {/* ========================================================
        LETTER 'E' - 100% UNMISTAKABLE 3-BAR CAPITAL 'E'
        ======================================================== */}
    {/* Left Vertical Spine */}
    <rect x="105" y="14" width="3.4" height="23" rx="0.5" fill="url(#artBlack)" />
    {/* Top Wide Horizontal Arm */}
    <rect x="105" y="14" width="22" height="3.2" rx="0.4" fill="url(#artBlack)" />
    {/* Middle Golden Sunbeam Arm */}
    <rect x="105" y="24" width="18" height="2.8" rx="0.4" fill="url(#artGold)" />
    {/* Bottom Wide Horizontal Arm */}
    <rect x="105" y="33.8" width="22" height="3.2" rx="0.4" fill="url(#artBlack)" />

    {/* ========================================================
        LETTER 'R'
        ======================================================== */}
    <rect x="139" y="14" width="3.2" height="23" rx="0.5" fill="url(#artBlack)" />
    <path d="M136.5 14H143.5M136.5 37H143.5" stroke="url(#artBlack)" strokeWidth="1.6" strokeLinecap="round" />
    <path
      d="M141 14H153C157.5 14 160.5 16.5 160.5 20.5C160.5 24.5 157.5 26.8 153 26.8H141"
      stroke="url(#artBlack)"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M150.5 26.5L161.5 37"
      stroke="url(#artBlack)"
      strokeWidth="3.4"
      strokeLinecap="round"
    />
    {/* Gold Flourish on R */}
    <path
      d="M161.5 37C163.5 38.5 166 39 169 38.5"
      stroke="url(#artGold)"
      strokeWidth="2.4"
      strokeLinecap="round"
    />

    {/* ========================================================
        LETTER 'A' (FINAL)
        ======================================================== */}
    <path d="M181 37L192 14L203 37" stroke="url(#artBlack)" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
    {/* Gold Roof Gable Spire */}
    <path d="M189 14L192 10L195 14" stroke="url(#artGold)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M192 6.5V10" stroke="url(#artGold)" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const Logo = ({ className = "" }) => {
  return (
    <Link to="/" className={`basera-artistic-brand-link ${className}`} title="BASERA">
      <BaseraWordmark />
    </Link>
  );
};

export default Logo;
