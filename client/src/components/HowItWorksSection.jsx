import React, { useEffect, useRef } from "react";
import { Sparkles, Heart, MapPin, Camera } from "lucide-react";
import gsap from "gsap";

const MOMENTS = [
  {
    id: 1,
    title: "Golden Hour on Caldera",
    location: "Oia, Santorini",
    time: "19:42 PM · Private Terrace",
    image:
      "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?q=80&w=800&auto=format&fit=crop",
    rotation: -2.5,
    note: "Uncorking Assyrtiko as the Aegean turns to liquid gold.",
  },
  {
    id: 2,
    title: "Candlelit Olive Grove",
    location: "Val d'Orcia, Tuscany",
    time: "21:15 PM · Estate Courtyard",
    image:
      "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?q=80&w=800&auto=format&fit=crop",
    rotation: 3,
    note: "Under centuries-old olive boughs with warm hanging festoons.",
  },
  {
    id: 3,
    title: "Matterhorn Twilight",
    location: "Zermatt, Swiss Alps",
    time: "18:30 PM · Alpine Balcony",
    image:
      "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?q=80&w=800&auto=format&fit=crop",
    rotation: -1.8,
    note: "Crisp mountain air, cedar woodsmoke, and endless peaks.",
  },
  {
    id: 4,
    title: "Lakefront Serenade",
    location: "Bellagio, Lake Como",
    time: "17:50 PM · Private Jetty",
    image:
      "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=800&auto=format&fit=crop",
    rotation: 2.2,
    note: "Drifting past neoclassical villas in the soft evening breeze.",
  },
  {
    id: 5,
    title: "Cliffside Infinity Glow",
    location: "Amalfi Coast, Italy",
    time: "20:10 PM · Azure Villa",
    image:
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=800&auto=format&fit=crop",
    rotation: -3.2,
    note: "Where the pool edge disappears into the glowing Mediterranean.",
  },
  {
    id: 6,
    title: "Rainforest Bamboo Solitude",
    location: "Ubud, Bali",
    time: "07:15 AM · Canopy Pavilion",
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=800&auto=format&fit=crop",
    rotation: 1.5,
    note: "Waking up to birdsong and mist rising through ancient palms.",
  },
  {
    id: 7,
    title: "Starlit Desert Oasis",
    location: "Merzouga Dunes, Morocco",
    time: "22:45 PM · Stargazer Dome",
    image:
      "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=80&w=800&auto=format&fit=crop",
    rotation: -2,
    note: "A glowing hearth beneath an unpolluted ocean of stars.",
  },
  {
    id: 8,
    title: "Positano Coastal Sunset",
    location: "Positano, Italy",
    time: "19:05 PM · Cliffside Suite",
    image:
      "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=800&auto=format&fit=crop",
    rotation: 2.8,
    note: "Pastel houses cascading down into the sun-drenched marina.",
  },
];

const HowItWorksSection = () => {
  const containerRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Smooth continuous non-stop infinite ribbon
      gsap.to(trackRef.current, {
        xPercent: -50,
        repeat: -1,
        duration: 32,
        ease: "none",
      });
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  // Double array for continuous seamless ribbon
  const loopMoments = [...MOMENTS, ...MOMENTS];

  return (
    <section className="figma-moments-section" id="experience">
      <div className="container text-center">
        <span className="figma-eyebrow">✦ CAPTURED MEMORIES &amp; LIVING STORIES ✦</span>
        <h2 className="figma-section-title">Moments in Sanctuary</h2>
        <p className="figma-section-sub">
          Candid frames from private terraces, candlelit courtyards, and starlit alpine evenings.
        </p>
      </div>

      {/* WARM FESTOON STRING LIGHTS ("JHALAR MALA") */}
      <div className="festoon-jhalar-wire-container">
        <svg
          className="festoon-wire-svg"
          viewBox="0 0 1440 80"
          fill="none"
          preserveAspectRatio="none"
        >
          <path
            d="M0,35 Q180,65 360,35 Q540,65 720,35 Q900,65 1080,35 Q1260,65 1440,35"
            stroke="rgba(217, 119, 6, 0.45)"
            strokeWidth="1.5"
            strokeDasharray="4 2"
          />
        </svg>

        {/* Ambient Glowing Bulbs Along The Curve */}
        <div className="festoon-bulbs-row">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="festoon-bulb-node"
              style={{
                animationDelay: `${(i % 4) * 0.4}s`,
                top: `${i % 2 === 0 ? 32 : 48}px`,
              }}
            >
              <div className="bulb-socket"></div>
              <div className="bulb-glass">
                <div className="bulb-filament"></div>
              </div>
              <div className="bulb-glow-halo"></div>
            </div>
          ))}
        </div>
      </div>

      {/* CONTINUOUS GSAP POLAROID MOMENTS TRACK */}
      <div className="moments-marquee-viewport" ref={containerRef}>
        <div className="moments-edge-fade left"></div>
        <div className="moments-edge-fade right"></div>

        <div className="moments-marquee-track" ref={trackRef}>
          {loopMoments.map((item, idx) => (
            <div
              key={`${item.id}-${idx}`}
              className="polaroid-hanging-frame"
              style={{
                "--rotate-deg": `${item.rotation}deg`,
              }}
            >
              {/* String Hanging Pin / Clip */}
              <div className="polaroid-clip-wrap">
                <div className="hanging-wire"></div>
                <div className="brass-clip"></div>
              </div>

              {/* Polaroid Photo Body */}
              <div className="polaroid-inner-card">
                <div className="polaroid-photo-box">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="polaroid-photo-img"
                    loading="lazy"
                  />
                  <div className="polaroid-photo-vignette"></div>
                  <div className="polaroid-camera-tag">
                    <Camera size={12} />
                    <span>Basera Memoir</span>
                  </div>
                </div>

                {/* Editorial Caption & Handwritten Note */}
                <div className="polaroid-caption-area">
                  <div className="polaroid-title-row">
                    <h4 className="polaroid-title">{item.title}</h4>
                    <span className="polaroid-heart">
                      <Heart size={13} fill="#D97706" color="#D97706" />
                    </span>
                  </div>

                  <p className="polaroid-note">"{item.note}"</p>

                  <div className="polaroid-meta-footer">
                    <div className="meta-loc">
                      <MapPin size={12} className="loc-icon" />
                      <span>{item.location}</span>
                    </div>
                    <span className="meta-time">{item.time}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
