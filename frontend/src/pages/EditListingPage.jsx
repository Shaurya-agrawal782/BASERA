import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import API from "../api/client";
import { useAuth } from "../context/AuthContext";
import { CATEGORY_NAMES } from "../constants/categories";
import ListingCard from "../components/ListingCard";
import toast from "react-hot-toast";
import { UploadCloud, Sparkles, Image as ImageIcon } from "lucide-react";

const EditListingPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "Trending",
    location: "",
    country: "",
  });

  const [originalImageUrl, setOriginalImageUrl] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const res = await API.get(`/listings/${id}`);
        if (res.data && res.data.listing) {
          const l = res.data.listing;
          // Check ownership
          if (user && l.owner && user._id !== l.owner._id && user._id !== l.owner) {
            toast.error("You are not the owner of this listing!");
            navigate(`/listings/${id}`);
            return;
          }
          setFormData({
            title: l.title || "",
            description: l.description || "",
            price: l.price || "",
            category: l.category || "Trending",
            location: l.location || "",
            country: l.country || "",
          });
          setOriginalImageUrl(l.image?.url || "");
        }
      } catch (err) {
        toast.error("Failed to load listing for editing.");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    if (!authLoading) {
      if (!user) {
        toast.error("You must be logged in to edit a listing!");
        navigate("/login");
      } else {
        fetchListing();
      }
    }
  }, [id, user, authLoading, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const data = new FormData();
      data.append("listing[title]", formData.title);
      data.append("listing[description]", formData.description);
      data.append("listing[price]", formData.price);
      data.append("listing[category]", formData.category);
      data.append("listing[location]", formData.location);
      data.append("listing[country]", formData.country);

      if (imageFile) {
        data.append("image", imageFile);
      }

      const res = await API.put(`/listings/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success(res.data.message || "Listing updated successfully! ✨");
      navigate(`/listings/${id}`);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update listing.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading || authLoading) {
    return (
      <div className="container" style={{ padding: "4rem 2.5rem" }}>
        <div className="show-skeleton-wrapper">
          <div className="skeleton-line title" style={{ width: "40%", height: "2.5rem", marginBottom: "1rem" }}></div>
          <div className="skeleton-image-box" style={{ height: "350px", borderRadius: "var(--radius-xl)" }}>
            <div className="skeleton-shimmer"></div>
          </div>
        </div>
      </div>
    );
  }

  // Mock listing object for live preview
  const previewListing = {
    _id: id,
    title: formData.title || "Your Luxury Villa Title",
    location: formData.location || "City/Location",
    country: formData.country || "Country",
    price: Number(formData.price) || 4500,
    category: formData.category || "Trending",
    image: {
      url:
        imagePreview ||
        originalImageUrl ||
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
    },
    reviews: [{ rating: 5 }],
  };

  return (
    <motion.div
      className="container form-layout-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="form-header-box">
        <h1 className="form-page-title">Edit Listing</h1>
        <p className="form-page-subtitle">Update details, pricing, photos or categories for your stay</p>
      </div>

      <div className="form-split-grid">
        {/* Left Column: Form Controls */}
        <div className="form-card-glass">
          <form onSubmit={handleSubmit}>
            {/* Title */}
            <div className="form-group">
              <label className="form-label" htmlFor="title">Title</label>
              <input
                id="title"
                name="title"
                type="text"
                className="form-input"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            {/* Description */}
            <div className="form-group">
              <label className="form-label" htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                className="form-textarea"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                required
              />
            </div>

            {/* Image Upload Box */}
            <div className="form-group">
              <label className="form-label">Upload New Cover Photo (Optional)</label>
              <div className="upload-dropzone">
                <input
                  id="image-upload-edit"
                  type="file"
                  accept="image/*"
                  className="upload-input-hidden"
                  onChange={handleImageChange}
                />
                <label htmlFor="image-upload-edit" className="upload-dropzone-label">
                  <UploadCloud size={28} color="var(--primary-brand)" />
                  <span className="dropzone-text-main">
                    {imageFile ? imageFile.name : "Replace image (optional)"}
                  </span>
                </label>
              </div>
            </div>

            {/* Category & Price Row */}
            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="category">Category</label>
                <select
                  id="category"
                  name="category"
                  className="form-select"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  {CATEGORY_NAMES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="price">Price (&#8377; / night)</label>
                <input
                  id="price"
                  name="price"
                  type="number"
                  min="0"
                  className="form-input"
                  value={formData.price}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Location & Country Row */}
            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="location">Location</label>
                <input
                  id="location"
                  name="location"
                  type="text"
                  className="form-input"
                  value={formData.location}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="country">Country</label>
                <input
                  id="country"
                  name="country"
                  type="text"
                  className="form-input"
                  value={formData.country}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <motion.button
              type="submit"
              className="btn-primary form-submit-btn"
              disabled={submitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {submitting ? "Saving Changes..." : "Save Changes ✨"}
            </motion.button>
          </form>
        </div>

        {/* Right Column: Live Real-time 3D Card Preview */}
        <div className="form-preview-column">
          <div className="preview-sticky-box">
            <div className="preview-label-badge">
              <Sparkles size={14} color="var(--primary-brand)" />
              <span>Live Card Preview</span>
            </div>

            <ListingCard listing={previewListing} showTax={false} index={0} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default EditListingPage;
