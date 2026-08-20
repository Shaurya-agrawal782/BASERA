import React from "react";
import { motion } from "framer-motion";

const DESTINATIONS = [
  {
    name: "Kyoto",
    image:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=600&q=80",
    query: "Kyoto",
  },
  {
    name: "Tuscany",
    image:
      "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=600&q=80",
    query: "Tuscany",
  },
  {
    name: "Maldives",
    image:
      "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=600&q=80",
    query: "Maldives",
  },
  {
    name: "Swiss Alps",
    image:
      "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=600&q=80",
    query: "Swiss",
  },
  {
    name: "Marrakech",
    image:
      "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?auto=format&fit=crop&w=600&q=80",
    query: "Marrakech",
  },
];

const ExploreWorldSection = ({ onSelectDestination }) => {
  return (
    <section className="figma-explore-section">
      <div className="container text-center">
        <h2 className="figma-section-title">Explore the World</h2>
        <p className="figma-section-sub">
          Find sanctuary in our most coveted global landscapes
        </p>

        <div className="figma-circles-row">
          {DESTINATIONS.map((dest) => (
            <motion.div
              key={dest.name}
              className="figma-circle-card"
              onClick={() => onSelectDestination && onSelectDestination(dest.query)}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.25 }}
            >
              <div className="figma-circle-wrapper">
                <img src={dest.image} alt={dest.name} className="figma-circle-img" />
              </div>
              <span className="figma-circle-name">{dest.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExploreWorldSection;
