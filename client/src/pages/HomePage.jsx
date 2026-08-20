import React, { useEffect, useState, useRef } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import API from "../api/client";
import HeroBanner from "../components/HeroBanner";
import PressSection from "../components/PressSection";
import CuratedCollectionsSection from "../components/CuratedCollectionsSection";
import ExploreWorldSection from "../components/ExploreWorldSection";
import HowItWorksSection from "../components/HowItWorksSection";
import SpotlightSection from "../components/SpotlightSection";
import BeyondTheStaySection from "../components/BeyondTheStaySection";
import HostSection from "../components/HostSection";
import NewsletterSection from "../components/NewsletterSection";
import ListingCard from "../components/ListingCard";
import { Sparkles, X, RefreshCw, ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const CATEGORY_TABS = [
  { label: "All", value: "" },
  { label: "Villas", value: "Amazing pools" },
  { label: "Cabins", value: "Mountains" },
  { label: "Estates", value: "Castles" },
  { label: "Penthouses", value: "Iconic cities" },
];

const HomePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get("category") || "";
  const queryParam = searchParams.get("q") || "";

  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchListings = async () => {
    setLoading(true);
    try {
      const params = {};
      if (categoryParam) params.category = categoryParam;
      if (queryParam) params.q = queryParam;

      const res = await API.get("/listings", { params });
      if (res.data && res.data.listings) {
        setListings(res.data.listings);
      }
    } catch (err) {
      console.error("Error fetching listings:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListings();
  }, [categoryParam, queryParam]);

  // Ultra-Luxury Smooth Scrolling & GSAP ScrollTrigger Soft Reveals
  useEffect(() => {
    // 1. Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smoothTouch: false,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const updateLenis = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    // 2. Soft Reveal Animations for Homepage Sections
    const revealElements = document.querySelectorAll(
      ".figma-section-header, .figma-featured-header, .figma-stays-grid, .curated-collections-section, .beyond-atelier-layout, .host-atelier-card, .gazette-card, .figma-spotlight-card, .jhalar-header-center"
    );

    const triggers = [];
    revealElements.forEach((el) => {
      const anim = gsap.fromTo(
        el,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        }
      );
      if (anim.scrollTrigger) triggers.push(anim.scrollTrigger);
    });

    return () => {
      triggers.forEach((st) => st.kill());
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
    };
  }, [listings]);

  const handleCategorySelect = (category) => {
    const nextParams = new URLSearchParams(searchParams);
    if (category) {
      nextParams.set("category", category);
    } else {
      nextParams.delete("category");
    }
    setSearchParams(nextParams);
    scrollToStays();
  };

  const handleSearchSubmit = (searchTerm) => {
    const nextParams = new URLSearchParams(searchParams);
    if (searchTerm) {
      nextParams.set("q", searchTerm);
    } else {
      nextParams.delete("q");
    }
    setSearchParams(nextParams);
    scrollToStays();
  };

  const scrollToStays = () => {
    const staysSection = document.getElementById("stays");
    if (staysSection) {
      staysSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="figma-homepage-wrapper">
      {/* 1. HERO SECTION WITH SEARCH CAPSULE */}
      <HeroBanner onSearch={handleSearchSubmit} />

      {/* 2. AS FEATURED IN PRESS STRIP */}
      <PressSection />

      {/* 3. CURATED COLLECTIONS */}
      {!queryParam && (
        <CuratedCollectionsSection onSelectCategory={handleCategorySelect} />
      )}

      {/* 4. FEATURED STAYS (MAIN LISTINGS GRID) */}
      <section className="figma-featured-stays-section" id="stays">
        <div className="container">
          <div className="figma-featured-header">
            <h2 className="figma-section-title text-left">Featured Stays</h2>
            <p className="figma-section-sub text-left">
              World-class architecture, exceptional hospitality, unparalleled locations
            </p>
          </div>

          {/* Filter Pills */}
          <div className="figma-category-pills">
            {CATEGORY_TABS.map((tab) => (
              <button
                key={tab.label}
                onClick={() => handleCategorySelect(tab.value)}
                className={`figma-filter-pill ${
                  categoryParam === tab.value ? "active" : ""
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Active Search/Filter Pill */}
          <AnimatePresence>
            {(queryParam || categoryParam) && (
              <motion.div
                className="figma-active-filter-alert"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <div className="flex items-center gap-2">
                  <Sparkles size={16} />
                  <span>
                    Filtering by:{" "}
                    <strong>
                      {queryParam ? `"${queryParam}"` : ""}
                      {queryParam && categoryParam ? " · " : ""}
                      {categoryParam ? `Category` : ""}
                    </strong>
                  </span>
                </div>
                <button
                  onClick={() => setSearchParams({})}
                  className="figma-reset-pill-btn"
                >
                  <X size={14} /> Clear
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 2-Column Responsive Stays Grid */}
          {loading ? (
            <div className="figma-stays-grid">
              {[1, 2, 3, 4].map((n) => (
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
                We couldn't find any stays matching your current filters.
              </p>
              <button
                className="figma-filter-pill active"
                onClick={() => setSearchParams({})}
              >
                <RefreshCw size={14} /> View All Stays
              </button>
            </div>
          ) : (
            <>
              <motion.div
                className="figma-stays-grid"
                initial="hidden"
                animate="visible"
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.06,
                    },
                  },
                }}
              >
                {listings.slice(0, 4).map((listing, index) => (
                  <ListingCard
                    key={listing._id}
                    listing={listing}
                    index={index}
                  />
                ))}
              </motion.div>

              {/* Explore All Stays Button */}
              <div className="figma-view-all-wrapper">
                <Link to="/stays" className="figma-view-all-btn">
                  <span>Explore All Stays ({listings.length})</span>
                  <ArrowRight size={18} />
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* 5. EXPLORE THE WORLD */}
      {!queryParam && !categoryParam && (
        <ExploreWorldSection onSelectDestination={handleSearchSubmit} />
      )}

      {/* 6. BEYOND THE STAY (CURATED ADD-ONS) */}
      {!queryParam && !categoryParam && (
        <BeyondTheStaySection />
      )}

      {/* 7. MOMENTS IN SANCTUARY (WARM JHALAR LIGHTS & POLAROID GALLERY) */}
      {!queryParam && !categoryParam && (
        <HowItWorksSection />
      )}

      {/* 8. BECOME A BASERA HOST */}
      {!queryParam && !categoryParam && (
        <HostSection />
      )}

      {/* 9. GLASSHOUSE QUOTE SPOTLIGHT */}
      {!queryParam && !categoryParam && (
        <SpotlightSection onExploreClick={scrollToStays} />
      )}

      {/* 10. JOIN THE BASERA JOURNAL */}
      {!queryParam && !categoryParam && (
        <NewsletterSection />
      )}
    </div>
  );
};

export default HomePage;
