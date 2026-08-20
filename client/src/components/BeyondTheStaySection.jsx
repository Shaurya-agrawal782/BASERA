import React from "react";
import { motion } from "framer-motion";

const EXPERIENCES = [
  {
    title: "Private Chef Dinner",
    location: "SANTORINI, GREECE",
    price: "From $200 / person",
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Guided Heritage Walk",
    location: "KYOTO, JAPAN",
    price: "From $120 / person",
    image:
      "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Wellness Retreat",
    location: "SWISS ALPS",
    price: "From $280 / person",
    image:
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80",
  },
];

const BeyondTheStaySection = () => {
  return (
    <section className="figma-beyond-section" id="experiences">
      <div className="container">
        <div className="figma-section-header text-center">
          <span className="figma-eyebrow">Curated Add-ons</span>
          <h2 className="figma-section-title">Beyond the Stay</h2>
          <p className="figma-section-sub">
            Uniquely local, meticulously organized experiences curated by our partners
          </p>
        </div>

        <div className="figma-beyond-grid">
          {EXPERIENCES.map((item, idx) => (
            <motion.div
              key={item.title}
              className="figma-beyond-card group"
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
            >
              <div className="figma-beyond-image-wrapper">
                <img src={item.image} alt={item.title} className="figma-beyond-img" />
              </div>
              <div className="figma-beyond-meta">
                <span className="beyond-location">{item.location}</span>
                <h3 className="beyond-title">{item.title}</h3>
                <span className="beyond-price">{item.price}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BeyondTheStaySection;
