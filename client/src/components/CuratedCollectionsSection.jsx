import React from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const COLLECTIONS = [
  {
    title: "Mountain Retreats",
    count: "24 Properties",
    category: "Mountains",
    image:
      "https://lh3.googleusercontent.com/aida/AP1WRLsJfWtZa8wBrvEU8bIRlueWW0ChNs8pGw0c_V6r7R974r3s--S1KejBQ0g6585gkkAeyLw8NBFRnnxOPzmtltG1G-Um7C7mCkqXbHc6u88XIzL3Qd4KHXhmExqGHonSaalOuev62oYMRJlXkc0bk_M5WggblGODIGE35DqmcYDWd_1z0boihoa3nD4BkaMu2vwZ79STwOyau9rI0adw3GD7Ww8ebdNvtsN2o038tsDc9GsJvjjwAUaKAHTI",
  },
  {
    title: "Coastal Escapes",
    count: "18 Properties",
    category: "Amazing pools",
    image:
      "https://lh3.googleusercontent.com/aida/AP1WRLvyoltbhdiX8wZ1r7G-YN59JKIm4-TVjRpL0NXZT6Lg2aHjnKW5UWWDrQvg7dBDAx5EOXqOw8N5PKv0wPLF6s_nBbQNpY6QWalZv8488KlrJMiqZTxskN68yYMOh1yxS8y5f1HiQQfxFlMM8cKweX8Qcjc0XQlXbGjTzFgUTjHICMjYgfiqrAUlDB57ytu_Rwrwur3EDccSlRh94eRlPL3KJTHy2bSdAr3C6QxnwlfTmomrTJYS1_lVwReH",
  },
  {
    title: "Heritage Estates",
    count: "12 Properties",
    category: "Castles",
    image:
      "https://lh3.googleusercontent.com/aida/AP1WRLtY0x2zGQxLBrsomslG5j1HYb4bvyuKs5Si2DTrLXBbcVIx_556pXJCUdksg6gvPAFJ1elEGZsONwWrdVJdnOl10TH1GF8O7mY1l-REnmaF1Y2Iw-75hA-QBKPpE3t5PDwkCusrLEpGqS2Sl0A-IF_-FVi8xdUWrTMeRRb3zCRsBJV2iyqnu2Lpv2jVVviGNsCb7tJRr68wTymbsxGTpwAvPOLD3O8mI5waPfooIyaQwbXWPQdaJR81ty4o",
  },
];

const CuratedCollectionsSection = ({ onSelectCategory }) => {
  return (
    <section className="figma-collections-section" id="collections">
      <div className="container">
        <div className="figma-section-header text-center">
          <h2 className="figma-section-title">Curated Collections</h2>
          <p className="figma-section-sub">
            Thoughtfully cataloged design languages for the discerning traveler
          </p>
        </div>

        <div className="figma-collections-grid">
          {COLLECTIONS.map((item, idx) => (
            <motion.div
              key={item.title}
              className="figma-collection-card group"
              onClick={() => onSelectCategory && onSelectCategory(item.category)}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3 }}
            >
              <img src={item.image} alt={item.title} className="figma-collection-img" />
              <div className="figma-collection-overlay"></div>
              <div className="figma-collection-meta">
                <h3 className="figma-collection-title">{item.title}</h3>
                <div className="figma-collection-link">
                  <span>{item.count}</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CuratedCollectionsSection;
