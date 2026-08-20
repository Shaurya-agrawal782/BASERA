import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Star, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

const ListingCard = ({ listing, showTax, index = 0 }) => {
  const [liked, setLiked] = useState(false);

  const price = Number(listing.price) || 0;
  const finalPrice = showTax ? Math.round(price * 1.18) : price;

  const displayRating = listing.rating ? Number(listing.rating).toFixed(2) : "4.95";
  const reviewCount = listing.reviews?.length || 84 + (index * 14);

  const toggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setLiked((prev) => !prev);
  };

  return (
    <motion.div
      className="featured-stay-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
    >
      <Link to={`/listings/${listing._id}`} className="stay-card-link">
        {/* Card Image with Wishlist Button */}
        <div className="stay-image-container">
          <img
            src={listing.image?.url || "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=2400&q=95"}
            alt={listing.title}
            className="stay-card-img"
            loading="lazy"
          />
          <button
            className={`stay-wishlist-btn ${liked ? "liked" : ""}`}
            onClick={toggleWishlist}
            aria-label="Add to wishlist"
          >
            <Heart
              size={18}
              fill={liked ? "#FF385C" : "rgba(0,0,0,0.2)"}
              color={liked ? "#FF385C" : "#ffffff"}
            />
          </button>
        </div>

        {/* Metadata Details */}
        <div className="stay-card-info">
          {/* Row 1: Title & Rating */}
          <div className="stay-row-top">
            <h3 className="stay-card-title">{listing.title}</h3>
            <div className="stay-rating-badge">
              <Star size={14} fill="#D97706" color="#D97706" />
              <span className="stay-rating-score">{displayRating}</span>
              <span className="stay-rating-count">({reviewCount})</span>
            </div>
          </div>

          {/* Row 2: Location */}
          <div className="stay-location-text">
            {listing.location ? `${listing.location}, ${listing.country || ""}` : listing.country || "Private Sanctuary"}
          </div>

          {/* Row 3: Price & View Details Link */}
          <div className="stay-row-bottom">
            <div className="stay-price-box">
              <span className="stay-price-val">&#8377;{finalPrice.toLocaleString("en-IN")}</span>
              <span className="stay-price-unit"> / night</span>
              {showTax && <span className="stay-tax-pill">incl. taxes</span>}
            </div>

            <div className="stay-view-details">
              <span>View Details</span>
              <ArrowUpRight size={15} />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ListingCard;
