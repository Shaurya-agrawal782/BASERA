import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Sparkles } from "lucide-react";

export const StarRatingDisplay = ({ rating = 5, size = 16 }) => {
  const numericRating = Math.max(1, Math.min(5, Number(rating) || 5));

  return (
    <div className="star-rating-display" style={{ display: "flex", gap: "3px", color: "#f59e0b" }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={size}
          fill={star <= numericRating ? "#f59e0b" : "none"}
          color={star <= numericRating ? "#f59e0b" : "#cbd5e1"}
          strokeWidth={1.8}
        />
      ))}
    </div>
  );
};

const RATING_LABELS = {
  1: "Needs Improvement",
  2: "Fair",
  3: "Good & Comfortable",
  4: "Very Good Stay",
  5: "Exceptional Luxury Experience! ✨",
};

export const StarRatingInput = ({ value = 5, onChange }) => {
  const [hoverRating, setHoverRating] = useState(0);
  const activeRating = hoverRating || value;

  return (
    <div className="star-rating-input-container">
      <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
        {[1, 2, 3, 4, 5].map((star) => {
          const isFilled = activeRating >= star;
          return (
            <motion.button
              type="button"
              key={star}
              onClick={() => onChange(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              whileHover={{ scale: 1.25, rotate: 5 }}
              whileTap={{ scale: 0.85, rotate: -10 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              className="star-input-btn"
              style={{
                background: "none",
                border: "none",
                padding: "2px",
                cursor: "pointer",
                display: "flex",
                outline: "none",
              }}
            >
              <Star
                size={26}
                fill={isFilled ? "#f59e0b" : "transparent"}
                color={isFilled ? "#f59e0b" : "#cbd5e1"}
                strokeWidth={1.8}
                style={{
                  filter: isFilled ? "drop-shadow(0 2px 6px rgba(245, 158, 11, 0.4))" : "none",
                  transition: "filter 0.2s ease",
                }}
              />
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.span
          key={activeRating}
          className="star-rating-label"
          initial={{ opacity: 0, y: 3 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -3 }}
          transition={{ duration: 0.15 }}
        >
          {RATING_LABELS[activeRating] || ""}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};
