import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import API from "../api/client";
import ListingCard from "../components/ListingCard";
import { CATEGORIES } from "../constants/categories";
import { Search, Sparkles, X, RefreshCw, SlidersHorizontal, ArrowUpDown } from "lucide-react";

const StaysPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get("category") || "";
  const queryParam = searchParams.get("q") || "";
  const sortParam = searchParams.get("sort") || "recommended";

  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState(queryParam);

  const fetchListings = async () => {
    setLoading(true);
    try {
      const params = {};
      if (categoryParam) params.category = categoryParam;
      if (queryParam) params.q = queryParam;

      const res = await API.get("/listings", { params });
      if (res.data && res.data.listings) {
        let results = [...res.data.listings];

        // Client side sorting
        if (sortParam === "price_asc") {
          results.sort((a, b) => Number(a.price || 0) - Number(b.price || 0));
        } else if (sortParam === "price_desc") {
          results.sort((a, b) => Number(b.price || 0) - Number(a.price || 0));
        }

        setListings(results);
      }
    } catch (err) {
      console.error("Error fetching stays:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListings();
  }, [categoryParam, queryParam, sortParam]);

  useEffect(() => {
    setSearchInput(queryParam);
  }, [queryParam]);

  const handleCategorySelect = (category) => {
    const nextParams = new URLSearchParams(searchParams);
    if (category) {
      nextParams.set("category", category);
    } else {
      nextParams.delete("category");
    }
    setSearchParams(nextParams);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const nextParams = new URLSearchParams(searchParams);
    if (searchInput.trim()) {
      nextParams.set("q", searchInput.trim());
    } else {
      nextParams.delete("q");
    }
    setSearchParams(nextParams);
  };

  const handleSortChange = (e) => {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.set("sort", e.target.value);
    setSearchParams(nextParams);
  };

  const clearFilters = () => {
    setSearchInput("");
    setSearchParams({});
  };

  return (
    <div className="stays-page-wrapper">
      {/* Page Header */}
      <section className="stays-header-section">
        <div className="container">
          <div className="stays-header-top">
            <div>
              <span className="figma-eyebrow">Explore Stays</span>
              <h1 className="stays-page-title">Discover All Extraordinary Sanctuaries</h1>
              <p className="stays-page-subtitle">
                From cliffside villas to mountain retreats — explore {listings.length > 0 ? listings.length : "verified"} architectural stays worldwide.
              </p>
            </div>

            {/* Quick Search Box */}
            <form onSubmit={handleSearchSubmit} className="stays-search-form">
              <div className="stays-search-input-box">
                <Search size={18} className="stays-search-icon" />
                <input
                  type="text"
                  placeholder="Search by city, country, or stay title..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="stays-search-input"
                />
                {searchInput && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchInput("");
                      const nextParams = new URLSearchParams(searchParams);
                      nextParams.delete("q");
                      setSearchParams(nextParams);
                    }}
                    className="stays-clear-input"
                    aria-label="Clear search"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
              <button type="submit" className="stays-search-btn">
                Search
              </button>
            </form>
          </div>

          {/* Full Category Filter Scrollbar */}
          <div className="stays-categories-bar">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.label}
                onClick={() => handleCategorySelect(cat.value)}
                className={`stays-category-chip ${
                  categoryParam === cat.value ? "active" : ""
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Filter Bar Controls & Results Count */}
          <div className="stays-controls-bar">
            <div className="stays-count-text">
              <strong>{listings.length}</strong> {listings.length === 1 ? "stay" : "stays"} available
              {(queryParam || categoryParam) && (
                <span className="stays-active-filter-tag">
                  · Filtered by {queryParam ? `"${queryParam}"` : ""} {categoryParam ? `(${categoryParam})` : ""}
                </span>
              )}
            </div>

            <div className="stays-sort-container">
              <ArrowUpDown size={15} color="#6B7280" />
              <span className="stays-sort-label">Sort by:</span>
              <select
                value={sortParam}
                onChange={handleSortChange}
                className="stays-sort-select"
                aria-label="Sort stays"
              >
                <option value="recommended">Recommended</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
              </select>

              {(queryParam || categoryParam) && (
                <button onClick={clearFilters} className="stays-reset-filters-btn">
                  <X size={14} /> Reset
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Stays Grid */}
      <section className="stays-grid-section">
        <div className="container">
          {loading ? (
            <div className="figma-stays-grid">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div key={n} className="figma-skeleton-card">
                  <div className="figma-skeleton-img">
                    <div className="figma-shimmer"></div>
                  </div>
                  <div className="figma-skeleton-text title"></div>
                  <div className="figma-skeleton-text loc"></div>
                  <div className="figma-skeleton-text price"></div>
                </div>
              ))}
            </div>
          ) : listings.length === 0 ? (
            <div className="figma-empty-stays">
              <h3 className="figma-empty-title">No Stays Found</h3>
              <p className="figma-empty-desc">
                We couldn't find any stays matching your current filters. Try changing your search or resetting categories.
              </p>
              <button className="figma-filter-pill active" onClick={clearFilters}>
                <RefreshCw size={14} /> Clear All Filters
              </button>
            </div>
          ) : (
            <motion.div
              className="figma-stays-grid"
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.04,
                  },
                },
              }}
            >
              {listings.map((listing, index) => (
                <ListingCard
                  key={listing._id}
                  listing={listing}
                  index={index}
                />
              ))}
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
};

export default StaysPage;
