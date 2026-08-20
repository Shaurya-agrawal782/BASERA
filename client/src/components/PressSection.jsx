import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const PRESS_BRANDS = [
  "ARCHITECTURAL DIGEST",
  "VOGUE",
  "CONDÉ NAST TRAVELLER",
  "MONOCLE",
  "KINFOLK",
  "ROBB REPORT",
  "WALLPAPER*",
  "ELLE DÉCOR",
  "THE FINANCIAL TIMES",
];

const PressSection = () => {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const tweenRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Infinite seamless linear marquee
      tweenRef.current = gsap.to(trackRef.current, {
        xPercent: -50,
        repeat: -1,
        duration: 24,
        ease: "none",
      });
    }, containerRef);

    const containerEl = containerRef.current;
    const handleMouseEnter = () => {
      if (tweenRef.current) tweenRef.current.pause();
    };
    const handleMouseLeave = () => {
      if (tweenRef.current) tweenRef.current.play();
    };

    if (containerEl) {
      containerEl.addEventListener("mouseenter", handleMouseEnter);
      containerEl.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (containerEl) {
        containerEl.removeEventListener("mouseenter", handleMouseEnter);
        containerEl.removeEventListener("mouseleave", handleMouseLeave);
      }
      ctx.revert();
    };
  }, []);

  // Double items for zero-gap infinite loop
  const loopItems = [...PRESS_BRANDS, ...PRESS_BRANDS];

  return (
    <section className="figma-press-section">
      <div className="press-marquee-viewport" ref={containerRef}>
        {/* Soft Left & Right Edge Fades */}
        <div className="press-edge-fade left"></div>
        <div className="press-edge-fade right"></div>

        {/* Continuous Linear Moving Track */}
        <div className="press-marquee-track" ref={trackRef}>
          {loopItems.map((brand, idx) => (
            <div key={`${brand}-${idx}`} className="press-marquee-item">
              <span className="press-brand-text">{brand}</span>
              <span className="press-star-divider">✦</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PressSection;
