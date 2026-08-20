import React, { useEffect, useState, useRef } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import API from "../api/client";
import HeroBanner from "../components/HeroBanner";
import PressSection from "../components/PressSection";
import ManifestoSection from "../components/ManifestoSection";
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

  // Ultra-Luxury Smooth Scrolling & Advanced GSAP ScrollTrigger Animation Suite
  useEffect(() => {
    // 1. Initialize Lenis Smooth Scroll with Premium Spring Physics
    const lenis = new Lenis({
      duration: 1.3,
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

    const ctx = gsap.context(() => {
      // 2. Top Scroll Reading Progress Ribbon
      gsap.to(".basera-scroll-progress-bar", {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.3,
        },
      });

      // 3. Hero Parallax & Floating Search Capsule
      gsap.to(".figma-hero-bg, .hero-video-bg", {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: ".figma-hero-section",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // 4. Staggered 3D Entrance for Section Headers
      const headers = document.querySelectorAll(".figma-section-header, .figma-featured-header");
      headers.forEach((header) => {
        const eyebrow = header.querySelector(".figma-eyebrow");
        const title = header.querySelector(".figma-section-title");
        const sub = header.querySelector(".figma-section-sub");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: header,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });

        if (eyebrow) {
          tl.fromTo(eyebrow, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" });
        }
        if (title) {
          tl.fromTo(title, { opacity: 0, y: 25, scale: 0.98 }, { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: "power3.out" }, "-=0.4");
        }
        if (sub) {
          tl.fromTo(sub, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.4");
        }
      });

      // 5. Featured Stays 3D Staggered Flip Entrance
      const stayCards = document.querySelectorAll(".figma-stays-grid > *");
      if (stayCards.length > 0) {
        gsap.fromTo(
          stayCards,
          { opacity: 0, y: 40, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".figma-stays-grid",
              start: "top 82%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // 5.5. Basera Manifesto & Philosophy Entrance
      const manifestoSection = document.querySelector(".basera-manifesto-section");
      if (manifestoSection) {
        gsap.fromTo(
          ".manifesto-content-box",
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: manifestoSection,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
        gsap.fromTo(
          ".manifesto-pillar-item",
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.12,
            duration: 0.75,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".manifesto-pillars-grid",
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // 6. Curated Collections 3D Spatial Lift
      const collectionsSection = document.querySelector(".curated-collections-section");
      if (collectionsSection) {
        gsap.fromTo(
          collectionsSection,
          { opacity: 0, y: 50, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: collectionsSection,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // 7. Beyond The Stay Orbit Wheel & Showcase Reveal
      const beyondOrbit = document.querySelector(".beyond-orbit-column");
      const beyondDetail = document.querySelector(".beyond-detail-column");
      if (beyondOrbit && beyondDetail) {
        gsap.fromTo(
          beyondOrbit,
          { opacity: 0, x: -40, scale: 0.92 },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".figma-beyond-section",
              start: "top 78%",
              toggleActions: "play none none none",
            },
          }
        );
        gsap.fromTo(
          beyondDetail,
          { opacity: 0, x: 40, scale: 0.95 },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".figma-beyond-section",
              start: "top 78%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // 8. Moments in Sanctuary Festoon Light Sway Scrub
      const jhalarSection = document.querySelector(".figma-how-section");
      if (jhalarSection) {
        gsap.fromTo(
          ".jhalar-festoon-stage",
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: jhalarSection,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // 9. Host Atelier Parallax Card
      const hostCard = document.querySelector(".host-atelier-card");
      if (hostCard) {
        gsap.fromTo(
          hostCard,
          { opacity: 0, y: 45, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: hostCard,
              start: "top 82%",
              toggleActions: "play none none none",
            },
          }
        );
        // Photo parallax scrub inside host card
        gsap.to(".host-hero-photo", {
          yPercent: -8,
          ease: "none",
          scrollTrigger: {
            trigger: hostCard,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      }

      // 10. Basera Gazette Magazine 3D Tilt Scroll Scrub
      const gazetteCard = document.querySelector(".gazette-card");
      if (gazetteCard) {
        gsap.fromTo(
          gazetteCard,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: gazetteCard,
              start: "top 82%",
              toggleActions: "play none none none",
            },
          }
        );
        gsap.fromTo(
          ".magazine-cover-card",
          { transform: "perspective(1000px) rotateY(-18deg) rotateX(8deg) scale(0.92)" },
          {
            transform: "perspective(1000px) rotateY(-4deg) rotateX(1deg) scale(1)",
            ease: "none",
            scrollTrigger: {
              trigger: gazetteCard,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2,
            },
          }
        );
      }

      // 11. Magnetic Cursor Pull on Luxury CTA Buttons
      const magneticBtns = document.querySelectorAll(
        ".figma-view-all-btn, .host-primary-cta, .gazette-submit-btn, .square-primary-btn, .figma-spotlight-btn"
      );

      magneticBtns.forEach((btn) => {
        const handleMouseMove = (e) => {
          const rect = btn.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          gsap.to(btn, {
            x: x * 0.25,
            y: y * 0.25,
            duration: 0.3,
            ease: "power2.out",
          });
        };

        const handleMouseLeave = () => {
          gsap.to(btn, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: "elastic.out(1, 0.3)",
          });
        };

        btn.addEventListener("mousemove", handleMouseMove);
        btn.addEventListener("mouseleave", handleMouseLeave);
      });
    });

    return () => {
      ctx.revert();
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
      {/* GOLD TOP SCROLL READING PROGRESS BAR */}
      <div className="basera-scroll-progress-bar" aria-hidden="true"></div>

      {/* 1. HERO SECTION WITH SEARCH CAPSULE */}
      <HeroBanner onSearch={handleSearchSubmit} />

      {/* 2. AS FEATURED IN PRESS STRIP */}
      <PressSection />

      {/* 2.5. BASERA MANIFESTO & BRAND PHILOSOPHY */}
      {!queryParam && (
        <ManifestoSection />
      )}

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
