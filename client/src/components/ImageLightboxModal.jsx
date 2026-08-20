import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, ZoomOut, Download, MapPin, Share2 } from "lucide-react";
import toast from "react-hot-toast";

const ImageLightboxModal = ({ isOpen, onClose, imageUrl, title, location }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="lightbox-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
      >
        <motion.div
          className="lightbox-container"
          initial={{ scale: 0.85, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.85, opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header Bar */}
          <div className="lightbox-header">
            <div className="lightbox-info">
              <h3 className="lightbox-title">{title}</h3>
              {location && (
                <div className="lightbox-location">
                  <MapPin size={14} color="var(--primary-brand)" />
                  <span>{location}</span>
                </div>
              )}
            </div>

            <div className="lightbox-actions">
              <button
                className="lightbox-btn"
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  toast.success("Listing link copied to clipboard!");
                }}
                title="Share link"
              >
                <Share2 size={18} />
              </button>
              <button className="lightbox-btn lightbox-close-btn" onClick={onClose} title="Close viewer">
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Main Image View */}
          <div className="lightbox-image-wrapper">
            <motion.img
              src={imageUrl}
              alt={title}
              className="lightbox-image"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ImageLightboxModal;
