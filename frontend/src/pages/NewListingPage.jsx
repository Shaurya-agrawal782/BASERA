import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import API from "../api/client";
import { useAuth } from "../context/AuthContext";
import { CATEGORY_NAMES } from "../constants/categories";
import ListingCard from "../components/ListingCard";
import toast from "react-hot-toast";
import { UploadCloud, Plus, Sparkles, Image as ImageIcon, CheckCircle2 } from "lucide-react";

const NewListingPage = () => {
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

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      toast.error("You must be logged in to create a listing!");
      navigate("/login");
    }
  }, [user, authLoading, navigate]);

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

    if (!formData.title || !formData.description || !formData.price || !formData.location || !formData.country) {
      toast.error("Please fill in all required fields.");
      return;
    }

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

      const res = await API.post("/listings", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data && res.data.listing) {
        toast.success(res.data.message || "New Listing Created! ✨");
        navigate(`/listings/${res.data.listing._id}`);
      } else {
        toast.success("Listing created!");
        navigate("/");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create listing.");
    } finally {
      setSubmitting(false);
    }
  };

  if (authLoading) return null;

  // Mock listing object for live preview
  const previewListing = {
    _id: "preview-id",
    title: formData.title || "Your Luxury Villa Title",
    location: formData.location || "City/Location",
    country: formData.country || "Country",
    price: Number(formData.price) || 4500,
    category: formData.category || "Trending",
    image: {
      url:
        imagePreview ||
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
        <h1 className="form-page-title">Create a New Stay</h1>
        <p className="form-page-subtitle">
          Share your extraordinary space with global luxury travelers
        </p>
      </div>

      <div className="form-split-grid">
        {/* Left Column: Form Controls */}
        <div className="form-card-glass">
          <form onSubmit={handleSubmit}>
            {/* Title */}
            <div className="form-group">
              <label className="form-label" htmlFor="title">
                Property Title *
              </label>
              <input
                id="title"
                name="title"
                type="text"
                className="form-input"
                placeholder="e.g. Clifftop Ocean Villa with Infinity Pool"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            {/* Description */}
            <div className="form-group">
              <label className="form-label" htmlFor="description">
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                className="form-textarea"
                placeholder="Describe the architectural design, surroundings, amenities and hospitality..."
                value={formData.description}
                onChange={handleChange}
                rows={4}
                required
              />
            </div>

            {/* Image Upload Box */}
            <div className="form-group">
              <label className="form-label">Cover Photo *</label>
              <div className="upload-dropzone">
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  className="upload-input-hidden"
                  onChange={handleImageChange}
                />
                <label htmlFor="image-upload" className="upload-dropzone-label">
                  <UploadCloud size={32} color="var(--primary-brand)" />
                  <span className="dropzone-text-main">
                    {imageFile ? imageFile.name : "Click or drag photo here to upload"}
                  </span>
                  <span className="dropzone-text-sub">High-resolution JPEG, PNG, WebP supported</span>
                </label>
              </div>
            </div>

            {/* Category & Price Row */}
            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="category">
                  Category *
                </label>
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
                <label className="form-label" htmlFor="price">
                  Price (&#8377; / night) *
                </label>
                <input
                  id="price"
                  name="price"
                  type="number"
                  min="0"
                  className="form-input"
                  placeholder="e.g. 7500"
                  value={formData.price}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Location & Country Row */}
            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="location">
                  City / Location *
                </label>
                <input
                  id="location"
                  name="location"
                  type="text"
                  className="form-input"
                  placeholder="e.g. Anjuna, Goa"
                  value={formData.location}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="country">
                  Country *
                </label>
                <input
                  id="country"
                  name="country"
                  type="text"
                  className="form-input"
                  placeholder="e.g. India"
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
              {submitting ? "Publishing Luxury Stay..." : "Publish Listing ✨"}
            </motion.button>
          </form>
        </div>

        {/* Right Column: Live Interactive 3D Card Preview */}
        <div className="form-preview-column">
          <div className="preview-sticky-box">
            <div className="preview-label-badge">
              <Sparkles size={14} color="var(--primary-brand)" />
              <span>Live Real-Time Card Preview</span>
            </div>

            <ListingCard listing={previewListing} showTax={false} index={0} />

            <div className="preview-tips-card">
              <h4 className="preview-tips-title">💡 Superhost Tip</h4>
              <p className="preview-tips-text">
                High quality landscape photography with natural morning or golden hour light increases booking rates by over 40%.
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default NewListingPage;
