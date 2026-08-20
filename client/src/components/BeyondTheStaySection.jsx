import React, { useState, useEffect, useRef } from "react";
import { ArrowRight, Sparkles, Clock, Check, Compass } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import toast from "react-hot-toast";

const EXPERIENCES = [
  {
    id: 1,
    title: "Private Cliffside Chef Tasting",
    category: "Gastronomy & Wine",
    location: "Santorini, Greece",
    price: "$220",
    unit: "/ guest",
    duration: "3.5 Hours",
    image:
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1000&q=80",
    desc: "An intimate 5-course degustation menu prepared by a private chef on your caldera terrace overlooking the sunset.",
    highlights: ["5-Course Artisanal Menu", "Sommelier Wine Pairing", "Private Terrace Seating"],
  },
  {
    id: 2,
    title: "Zen Temple & Tea Ceremony",
    category: "Heritage & Mindfulness",
    location: "Kyoto, Japan",
    price: "$140",
    unit: "/ guest",
    duration: "2.5 Hours",
    image:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1000&q=80",
    desc: "Private morning access to a 400-year-old Daitoku-ji sub-temple with an authentic matcha tea master.",
    highlights: ["Private Tea Master", "Exclusive Zen Garden Access", "Historical Monograph"],
  },
  {
    id: 3,
    title: "Alpine Cedar Thermal Spa",
    category: "Holistic Wellness",
    location: "Zermatt, Switzerland",
    price: "$310",
    unit: "/ guest",
    duration: "4.0 Hours",
    image:
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1000&q=80",
    desc: "Private heated cedar wood onsen soaking under the gaze of the Matterhorn, followed by alpine botanical oils.",
    highlights: ["Panoramic Hot Bath", "Herbal Aromatherapy", "Mountain Spring Teas"],
  },
  {
    id: 4,
    title: "Vintage Riva Lakefront Cruise",
    category: "Nautical Expedition",
    location: "Lake Como, Italy",
    price: "$450",
    unit: "/ voyage",
    duration: "3.0 Hours",
    image:
      "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1000&q=80",
    desc: "Drift past neoclassical villas and hidden grottos aboard a restored 1968 mahogany Riva Aquarama.",
    highlights: ["Captained Mahogany Riva", "Prosecco & Cicchetti", "Villa Balbianello Views"],
  },
  {
    id: 5,
    title: "Atlas Sunrise Balloon Flight",
    category: "Aerial Expedition",
    location: "Marrakech, Morocco",
    price: "$260",
    unit: "/ guest",
    duration: "3.0 Hours",
    image:
      "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1000&q=80",
    desc: "Soar above the desert dunes as the morning sun casts amber hues over the snow-capped High Atlas range.",
    highlights: ["Sunrise Champagne Flight", "Traditional Berber Breakfast", "360° Mountain Panorama"],
  },
  {
    id: 6,
    title: "Truffle Foraging & Cellar Reserve",
    category: "Terroir & Heritage",
    location: "Val d'Orcia, Tuscany",
    price: "$190",
    unit: "/ guest",
    duration: "4.0 Hours",
    image:
      "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=1000&q=80",
    desc: "Forage for prized white truffles with trained Lagotto dogs across private estate forests, followed by cellar tasting.",
    highlights: ["Trained Foraging Dogs", "Barolo & Brunello Tasting", "Handmade Pasta Lunch"],
  },
];

const BeyondTheStaySection = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const itemsRef = useRef([]);
  const orbitProgress = useRef({ angle: 0 });
  const radius = 180; // Exactly matches the 360px diameter track ring

  useEffect(() => {
    // 60FPS Butter-Smooth Trigonometric Orbit Motion
    const orbitTween = gsap.to(orbitProgress.current, {
      angle: 360,
      duration: 34,
      repeat: -1,
      ease: "none",
      onUpdate: () => {
        const baseAngle = orbitProgress.current.angle;
        EXPERIENCES.forEach((_, idx) => {
          const el = itemsRef.current[idx];
          if (!el) return;
          const nodeAngle = baseAngle + (idx * (360 / EXPERIENCES.length));
          const rad = (nodeAngle * Math.PI) / 180;
          const x = Math.cos(rad) * radius;
          const y = Math.sin(rad) * radius;
          // Precision centering on the track ring line
          gsap.set(el, { x, y, xPercent: -50, yPercent: -50 });
        });
      },
    });

    return () => {
      orbitTween.kill();
    };
  }, [radius]);

  const activeExp = EXPERIENCES[selectedIndex];

  return (
    <section className="figma-beyond-section" id="experiences">
      <div className="container">
        {/* SECTION HEADER */}
        <div className="figma-section-header text-center">
          <span className="figma-eyebrow">✦ BESPOKE CONCIERGE &amp; ADVENTURES ✦</span>
          <h2 className="figma-section-title">Beyond the Stay</h2>
          <p className="figma-section-sub">
            Uniquely local, meticulously organized experiences curated by our resident cultural masters.
          </p>
        </div>

        {/* 50% - 50% SPLIT: CIRCULAR ORBIT WHEEL + SQUARE DETAIL SHOWCASE */}
        <div className="beyond-atelier-layout">
          {/* LEFT 50%: CONTINUOUS CIRCULAR ORBIT WHEEL */}
          <div className="beyond-orbit-column">
            <div className="beyond-orbit-stage">
              {/* Outer Decorative Track Ring - exactly 360px diameter for 180px radius */}
              <div className="orbit-track-ring"></div>
              <div className="orbit-track-ring-inner"></div>

              {/* Center Compass Hub */}
              <div className="orbit-center-hub">
                <Compass size={26} className="orbit-compass-icon" />
                <span className="hub-label">CURATED</span>
                <span className="hub-count">06 EXP</span>
              </div>

              {/* Orbiting Circle Nodes */}
              <div className="orbit-canvas-center">
                {EXPERIENCES.map((exp, idx) => {
                  const isActive = idx === selectedIndex;
                  return (
                    <div
                      key={exp.id}
                      ref={(el) => (itemsRef.current[idx] = el)}
                      className={`orbit-circle-node ${isActive ? "active" : ""}`}
                      onClick={() => setSelectedIndex(idx)}
                      title={exp.title}
                    >
                      <img
                        src={exp.image}
                        alt={exp.title}
                        className="orbit-circle-img"
                        loading="lazy"
                      />
                      <div className="orbit-circle-overlay"></div>
                      <span className="orbit-node-index">0{idx + 1}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="orbit-instruction-hint">
              <Sparkles size={13} color="#D97706" />
              <span>Select any destination circle to explore bespoke details</span>
            </div>
          </div>

          {/* RIGHT 50%: SQUARE EDITORIAL SHOWCASE CARD */}
          <div className="beyond-detail-column">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeExp.id}
                className="beyond-square-card"
                initial={{ opacity: 0, x: 20, scale: 0.98 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -20, scale: 0.98 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Square Photo Banner */}
                <div className="square-photo-banner">
                  <img
                    src={activeExp.image}
                    alt={activeExp.title}
                    className="square-photo-img"
                  />
                  <div className="square-photo-overlay"></div>

                  {/* Category Pill */}
                  <div className="square-category-badge">
                    <span>{activeExp.category}</span>
                  </div>

                  {/* Price & Duration Badge */}
                  <div className="square-price-pill">
                    <span className="price-val">{activeExp.price}</span>
                    <span className="price-unit">{activeExp.unit}</span>
                  </div>
                </div>

                {/* Detail Content */}
                <div className="square-detail-body">
                  <div className="square-header-row">
                    <span className="square-location-tag">{activeExp.location}</span>
                    <div className="square-duration-tag">
                      <Clock size={13} />
                      <span>{activeExp.duration}</span>
                    </div>
                  </div>

                  <h3 className="square-title">{activeExp.title}</h3>
                  <p className="square-desc">{activeExp.desc}</p>

                  {/* Highlights List */}
                  <div className="square-highlights-wrap">
                    {activeExp.highlights.map((item, hIdx) => (
                      <div key={hIdx} className="square-highlight-item">
                        <div className="highlight-check">
                          <Check size={12} />
                        </div>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Action CTA */}
                  <div className="square-action-row">
                    <button
                      type="button"
                      className="square-primary-btn"
                      onClick={() => toast.success(`Inquiry initiated for ${activeExp.title}`)}
                    >
                      <span>Reserve Experience</span>
                      <ArrowRight size={15} />
                    </button>
                    <span className="square-trust-note">
                      Instant concierge confirmation
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BeyondTheStaySection;
