import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const DESTINATIONS = [
  {
    name: "Kyoto",
    region: "Japan",
    image:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80",
    query: "Kyoto",
  },
  {
    name: "Santorini",
    region: "Greece",
    image:
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80",
    query: "Santorini",
  },
  {
    name: "Tuscany",
    region: "Italy",
    image:
      "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=800&q=80",
    query: "Tuscany",
  },
  {
    name: "Maldives",
    region: "South Asia",
    image:
      "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=80",
    query: "Maldives",
  },
  {
    name: "Swiss Alps",
    region: "Switzerland",
    image:
      "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=800&q=80",
    query: "Swiss",
  },
  {
    name: "Marrakech",
    region: "Morocco",
    image:
      "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?auto=format&fit=crop&w=800&q=80",
    query: "Marrakech",
  },
  {
    name: "Lake Como",
    region: "Italy",
    image:
      "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80",
    query: "Lake",
  },
  {
    name: "Bali",
    region: "Indonesia",
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80",
    query: "Bali",
  },
];

const ExploreWorldSection = ({ onSelectDestination }) => {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const tweenRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create seamless infinite horizontal linear loop
      tweenRef.current = gsap.to(trackRef.current, {
        xPercent: -50,
        repeat: -1,
        duration: 18,
        ease: "none",
      });
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  const handleMouseEnterCard = () => {
    if (tweenRef.current) tweenRef.current.pause();
  };

  const handleMouseLeaveCard = () => {
    if (tweenRef.current) tweenRef.current.play();
  };

  // Double list for infinite loop
  const loopDestinations = [...DESTINATIONS, ...DESTINATIONS];

  return (
    <section className="figma-explore-section">
      <div className="container text-center">
        <span className="figma-eyebrow">CURATED GLOBAL EXPEDITIONS</span>
        <h2 className="figma-section-title">Explore the World</h2>
        <p className="figma-section-sub">
          Find sanctuary in our most coveted global landscapes
        </p>
      </div>

      {/* GSAP Marquee Container with edge fading masks */}
      <div className="explore-marquee-viewport" ref={containerRef}>
        <div className="explore-edge-fade left"></div>
        <div className="explore-edge-fade right"></div>

        <div className="explore-marquee-track" ref={trackRef}>
          {loopDestinations.map((dest, idx) => (
            <div
              key={`${dest.name}-${idx}`}
              className="figma-circle-card"
              onClick={() => onSelectDestination && onSelectDestination(dest.query)}
              onMouseEnter={handleMouseEnterCard}
              onMouseLeave={handleMouseLeaveCard}
            >
              <div className="figma-circle-wrapper">
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="figma-circle-img"
                  loading="lazy"
                />
              </div>
              <div className="figma-circle-info">
                <span className="figma-circle-name">{dest.name}</span>
                <span className="figma-circle-region">{dest.region}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExploreWorldSection;
