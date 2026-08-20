import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import API from "../api/client";
import { useAuth } from "../context/AuthContext";
import Map from "../components/Map";
import { StarRatingDisplay, StarRatingInput } from "../components/StarRating";
import ImageLightboxModal from "../components/ImageLightboxModal";
import toast from "react-hot-toast";
import {
  MapPin,
  User,
  Trash2,
  Edit3,
  MessageSquarePlus,
  Star,
  ShieldCheck,
  Sparkles,
  Wifi,
  Tv,
  Car,
  Utensils,
  Share2,
  Heart,
  Calendar,
  Maximize2,
  CheckCircle2,
  Clock,
  Award,
} from "lucide-react";

const ShowListingPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // Reservation simulator state
  const [guests, setGuests] = useState(2);
  const [nights, setNights] = useState(3);

  // Review form state
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submittingReview, setSubmittingReview] = useState(false);

  const fetchListing = async () => {
    try {
      const res = await API.get(`/listings/${id}`);
      if (res.data && res.data.listing) {
        setListing(res.data.listing);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Listing not found!");
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListing();
  }, [id]);

  const handleDeleteListing = async () => {
    if (!window.confirm("Are you sure you want to delete this listing?")) return;

    try {
      const res = await API.delete(`/listings/${id}`);
      toast.success(res.data.message || "Listing deleted successfully!");
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete listing.");
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) {
      toast.error("Please enter a review comment.");
      return;
    }

    setSubmittingReview(true);
    try {
      const res = await API.post(`/listings/${id}/reviews`, {
        review: { rating, comment },
      });
      if (res.data && res.data.review) {
        toast.success("Review posted successfully! ✨");
        setComment("");
        setRating(5);
        fetchListing();
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to submit review.");
    } finally {
      setSubmittingReview(false);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;

    try {
      const res = await API.delete(`/listings/${id}/reviews/${reviewId}`);
      toast.success(res.data.message || "Review deleted successfully!");
      fetchListing();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete review.");
    }
  };

  const handleReserve = () => {
    if (!user) {
      toast.error("Please log in to reserve this stay!");
      navigate("/login");
      return;
    }
    toast.success("Reservation request sent to host! Have a wonderful stay! ✈️✨");
  };

  if (loading) {
    return (
      <div className="container" style={{ padding: "4rem 2.5rem" }}>
        <div className="show-skeleton-wrapper">
          <div className="skeleton-line title" style={{ width: "60%", height: "2.5rem", marginBottom: "1rem" }}></div>
          <div className="skeleton-image-box" style={{ height: "420px", borderRadius: "var(--radius-xl)" }}>
            <div className="skeleton-shimmer"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!listing) return null;

  const isOwner = user && listing.owner && (user._id === listing.owner._id || user._id === listing.owner);
  const imageUrl =
    listing.image?.url ||
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80";

  const basePrice = listing.price || 0;
  const stayTotal = basePrice * nights;
  const cleaningFee = Math.round(basePrice * 0.1);
  const gstTax = Math.round((stayTotal + cleaningFee) * 0.18);
  const grandTotal = stayTotal + cleaningFee + gstTax;

  const avgRating =
    listing.reviews && listing.reviews.length > 0
      ? (
        listing.reviews.reduce((acc, r) => acc + (r.rating || 5), 0) /
        listing.reviews.length
      ).toFixed(1)
      : "4.95";

  return (
    <motion.div
      className="container show-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Lightbox Modal */}
      <ImageLightboxModal
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        imageUrl={imageUrl}
        title={listing.title}
        location={`${listing.location}, ${listing.country}`}
      />

      {/* Header Bar */}
      <div className="show-header">
        <motion.h1
          className="show-title"
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          {listing.title}
        </motion.h1>

        <div className="show-meta-bar">
          <div className="show-meta-left">
            <div className="show-rating-badge">
              <Star size={16} fill="#f59e0b" color="#f59e0b" />
              <span>{avgRating}</span>
              <span className="show-review-count">
                · {listing.reviews?.length || 0} reviews
              </span>
            </div>
            <span className="dot-separator">·</span>
            <div className="show-location-pill">
              <MapPin size={15} color="var(--primary-brand)" />
              <span>{listing.location}, {listing.country}</span>
            </div>
            {listing.category && (
              <span className="show-category-badge">
                <Sparkles size={12} /> {listing.category}
              </span>
            )}
          </div>

          <div className="show-actions-group">
            <motion.button
              className="btn-outline show-action-btn"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                toast.success("Listing link copied to clipboard!");
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Share2 size={16} /> Share
            </motion.button>
            <motion.button
              className="btn-outline show-action-btn"
              onClick={() => {
                setIsSaved(!isSaved);
                toast.success(isSaved ? "Removed from wishlist" : "Saved to wishlist!");
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Heart
                size={16}
                fill={isSaved ? "var(--primary-brand)" : "none"}
                color={isSaved ? "var(--primary-brand)" : "currentColor"}
              />
              {isSaved ? "Saved" : "Save"}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Hero Showcase Gallery with Interactive Lightbox Trigger */}
      <motion.div
        className="show-gallery-box"
        onClick={() => setLightboxOpen(true)}
        whileHover={{ scale: 1.008 }}
        transition={{ duration: 0.3 }}
      >
        <img
          src={imageUrl}
          alt={listing.title}
          className="show-gallery-img"
          onError={(e) => {
            e.target.src =
              "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80";
          }}
        />
        <div className="gallery-view-fullscreen-badge">
          <Maximize2 size={15} />
          <span>View Fullscreen Photos</span>
        </div>
      </motion.div>

      {/* 2-Column Content Layout */}
      <div className="show-content-layout">
        {/* Left Column: Details, Highlights, Amenities, Reviews, Map */}
        <div className="show-main-column">
          {/* Host profile card */}
          <motion.div
            className="host-profile-card"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div>
              <h2 className="host-card-title">
                Entire home hosted by {listing.owner?.username || "Basera Host"}
              </h2>
              <div className="host-card-subtitle">
                <span className="superhost-tag"><Award size={14} /> Superhost</span>
                <span>· 4 guests · 2 bedrooms · 2 beds · 2 baths</span>
              </div>
            </div>
            <div className="host-avatar-large">
              {(listing.owner?.username || "W").charAt(0).toUpperCase()}
            </div>
          </motion.div>

          {/* Highlights */}
          <div className="highlights-container">
            <div className="highlight-item">
              <div className="highlight-icon-box">
                <Sparkles size={20} color="var(--primary-brand)" />
              </div>
              <div>
                <h4 className="highlight-title">Dedicated workspace</h4>
                <p className="highlight-desc">A comfortable room with high-speed wifi well-suited for working.</p>
              </div>
            </div>
            <div className="highlight-item">
              <div className="highlight-icon-box">
                <ShieldCheck size={20} color="var(--primary-brand)" />
              </div>
              <div>
                <h4 className="highlight-title">Self check-in & Smart Lock</h4>
                <p className="highlight-desc">Check yourself in effortlessly with the secure smart keypad.</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="description-container">
            <h3 className="section-heading">About this place</h3>
            <p className="show-description-text">{listing.description}</p>
          </div>

          {/* Interactive Amenities Grid */}
          <div className="amenities-container">
            <h3 className="section-heading">What this place offers</h3>
            <div className="amenities-grid">
              <motion.div className="amenity-card" whileHover={{ scale: 1.03, y: -2 }}>
                <Wifi size={20} className="amenity-icon" />
                <span>High-speed Fiber Wi-Fi</span>
              </motion.div>
              <motion.div className="amenity-card" whileHover={{ scale: 1.03, y: -2 }}>
                <Tv size={20} className="amenity-icon" />
                <span>65" 4K Smart OLED TV</span>
              </motion.div>
              <motion.div className="amenity-card" whileHover={{ scale: 1.03, y: -2 }}>
                <Car size={20} className="amenity-icon" />
                <span>Free Dedicated Parking</span>
              </motion.div>
              <motion.div className="amenity-card" whileHover={{ scale: 1.03, y: -2 }}>
                <Utensils size={20} className="amenity-icon" />
                <span>Gourmet Chef Kitchen</span>
              </motion.div>
            </div>
          </div>

          {/* Owner Actions */}
          {isOwner && (
            <div className="owner-actions-card">
              <div className="owner-actions-info">
                <span style={{ fontWeight: 700 }}>Host Controls</span>
                <span style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>You are the verified owner of this listing</span>
              </div>
              <div className="owner-actions-btns">
                <Link to={`/listings/${listing._id}/edit`} className="btn-primary" style={{ padding: "0.55rem 1.2rem" }}>
                  <Edit3 size={16} /> Edit Listing
                </Link>
                <button onClick={handleDeleteListing} className="btn-danger">
                  <Trash2 size={16} /> Delete
                </button>
              </div>
            </div>
          )}

          {/* Reviews Section */}
          <div className="reviews-section">
            <div className="reviews-header-badge">
              <Star size={24} fill="#f59e0b" color="#f59e0b" />
              <span>{avgRating} · {listing.reviews?.length || 0} Reviews</span>
            </div>

            {/* Leave a review form */}
            {user ? (
              <motion.div
                className="review-form-card"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h4 className="review-form-title">
                  <MessageSquarePlus size={20} color="var(--primary-brand)" /> Leave a Review
                </h4>
                <form onSubmit={handleReviewSubmit}>
                  <div className="form-group">
                    <label className="form-label">Rating</label>
                    <StarRatingInput value={rating} onChange={setRating} />
                  </div>

                  <div className="form-group">
                    <label htmlFor="comment" className="form-label">Your experience</label>
                    <textarea
                      id="comment"
                      className="form-textarea"
                      placeholder="Share details of your stay, the neighborhood, hospitality and host..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      required
                    />
                  </div>

                  <motion.button
                    type="submit"
                    className="btn-primary"
                    disabled={submittingReview}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {submittingReview ? "Posting Review..." : "Submit Review"}
                  </motion.button>
                </form>
              </motion.div>
            ) : (
              <div className="review-login-prompt">
                <p>
                  Have you stayed here?{" "}
                  <Link to="/login" className="login-link">Log in</Link>{" "}
                  to share your verified review with the community.
                </p>
              </div>
            )}

            {/* Reviews List */}
            {listing.reviews && listing.reviews.length > 0 ? (
              <div className="review-grid">
                <AnimatePresence>
                  {listing.reviews.map((rev) => {
                    const isReviewAuthor =
                      user && rev.author && (user._id === rev.author._id || user._id === rev.author);

                    return (
                      <motion.div
                        key={rev._id}
                        className="review-card"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        whileHover={{ y: -3, boxShadow: "0 10px 25px rgba(0,0,0,0.06)" }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="review-card-top">
                          <div className="review-author-info">
                            <div className="user-avatar-circle" style={{ width: "38px", height: "38px" }}>
                              {(rev.author?.username || "G").charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <div className="review-author-name">
                                @{rev.author?.username || "Guest"}
                              </div>
                              <div className="review-verified-tag">
                                <CheckCircle2 size={12} color="#10b981" /> Verified stay
                              </div>
                            </div>
                          </div>

                          {isReviewAuthor && (
                            <motion.button
                              onClick={() => handleDeleteReview(rev._id)}
                              className="btn-danger"
                              style={{ padding: "0.3rem 0.65rem", fontSize: "0.78rem" }}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              Delete
                            </motion.button>
                          )}
                        </div>

                        <div style={{ margin: "0.6rem 0 0.4rem 0" }}>
                          <StarRatingDisplay rating={rev.rating} size={15} />
                        </div>
                        <p className="review-comment-text">
                          {rev.comment}
                        </p>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            ) : (
              <p className="no-reviews-text">
                No reviews yet for this listing. Be the first to leave one!
              </p>
            )}
          </div>

          {/* Map Section */}
          <div className="map-section">
            <h3 className="section-heading">Where you'll be</h3>
            <p className="map-location-sub">
              {listing.location}, {listing.country}
            </p>
            <div className="map-embed-wrapper">
              <Map
                coordinates={listing.coordinates?.coordinates}
                title={listing.title}
                location={`${listing.location}, ${listing.country}`}
              />
            </div>
          </div>
        </div>

        {/* Right Column: Sticky Reservation Box Simulator */}
        <motion.div
          className="sticky-reserve-card"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="reserve-price-header">
            <div>
              <span className="reserve-price-large">
                &#8377; {Number(listing.price || 0).toLocaleString("en-IN")}
              </span>
              <span className="reserve-price-night"> / night</span>
            </div>
            <div className="reserve-rating-pill">
              <Star size={14} fill="#f59e0b" color="#f59e0b" />
              <span>{avgRating}</span>
            </div>
          </div>

          {/* Dates Selector Simulator */}
          <div className="reserve-inputs-box">
            <div className="reserve-dates-row">
              <div className="reserve-date-col">
                <label>CHECK-IN</label>
                <div className="date-val">Aug 24, 2026</div>
              </div>
              <div className="reserve-date-col checkout">
                <label>CHECKOUT</label>
                <div className="date-val">Aug 27, 2026</div>
              </div>
            </div>

            <div className="reserve-guests-col">
              <label>GUESTS & NIGHTS</label>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <select
                  value={nights}
                  onChange={(e) => setNights(Number(e.target.value))}
                  className="reserve-select"
                  aria-label="Number of nights"
                >
                  <option value={1}>1 night</option>
                  <option value={2}>2 nights</option>
                  <option value={3}>3 nights</option>
                  <option value={4}>4 nights</option>
                  <option value={5}>5 nights</option>
                  <option value={7}>7 nights (1 week)</option>
                </select>

                <select
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className="reserve-select"
                  aria-label="Number of guests"
                >
                  <option value={1}>1 guest</option>
                  <option value={2}>2 guests</option>
                  <option value={3}>3 guests</option>
                  <option value={4}>4 guests</option>
                </select>
              </div>
            </div>
          </div>

          {/* Reserve Button */}
          <motion.button
            onClick={handleReserve}
            className="btn-primary reserve-submit-btn"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Reserve Now
          </motion.button>
          <p className="reserve-disclaimer">You won't be charged yet</p>

          {/* Price Calculation Breakdown with Animated Numbers */}
          <div className="reserve-breakdown">
            <div className="reserve-row">
              <span>&#8377; {basePrice.toLocaleString("en-IN")} x {nights} nights</span>
              <span>&#8377; {stayTotal.toLocaleString("en-IN")}</span>
            </div>
            <div className="reserve-row">
              <span>Cleaning fee</span>
              <span>&#8377; {cleaningFee.toLocaleString("en-IN")}</span>
            </div>
            <div className="reserve-row">
              <span>Basera service fee & GST (18%)</span>
              <span>&#8377; {gstTax.toLocaleString("en-IN")}</span>
            </div>
            <div className="reserve-row total">
              <span>Total before taxes</span>
              <span className="total-amount">&#8377; {grandTotal.toLocaleString("en-IN")}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ShowListingPage;
