import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  User,
  LogOut,
  LogIn,
  UserPlus,
  PlusCircle,
  Compass,
  Bookmark,
  ChevronDown,
  Sparkles,
  Menu,
  X,
  ArrowRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "./Logo";

const NAV_LINKS = [
  { label: "Stays", id: "stays", num: "01" },
  { label: "Experiences", id: "experiences", num: "02" },
  { label: "Collections", id: "collections", num: "03" },
  { label: "Journal", id: "journal", num: "04" },
  { label: "About", id: "about", num: "05" },
];

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [visible, setVisible] = useState(true);
  const [atTop, setAtTop] = useState(true);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const profileRef = useRef(null);
  const lastScrollY = useRef(0);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setProfileMenuOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Close desktop dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Smart Hide-on-Scroll-Down / Reveal-on-Scroll-Up
  useEffect(() => {
    const handleScroll = () => {
      if (mobileMenuOpen) return; // Don't hide navbar when mobile menu is open
      const currentScrollY = window.scrollY;

      if (currentScrollY <= 0) {
        setAtTop(true);
        setVisible(true);
      } else {
        setAtTop(false);

        if (currentScrollY > lastScrollY.current + 4) {
          setVisible(false);
          setProfileMenuOpen(false);
        } else if (currentScrollY < lastScrollY.current - 4) {
          setVisible(true);
        }
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [mobileMenuOpen]);

  const handleNavClick = (sectionId) => {
    setMobileMenuOpen(false);
    if (sectionId === "stays") {
      navigate("/stays");
      return;
    }
    if (location.pathname === "/") {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate(`/#${sectionId}`);
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  return (
    <header
      className={`basera-navbar-wrapper ${atTop ? "at-top" : "scrolled"} ${
        visible ? "nav-visible" : "nav-hidden"
      } ${mobileMenuOpen ? "mobile-drawer-open" : ""}`}
    >
      <div className="basera-nav-layout">
        {/* FAR LEFT: Brand Logo */}
        <div className="basera-nav-brand-col">
          <Logo />
        </div>

        {/* DESKTOP NAVIGATION & PROFILE */}
        <div className="basera-nav-right-col desktop-only">
          {/* Primary Nav Links */}
          <nav className="basera-links-group" aria-label="Main Navigation">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className="basera-link-btn"
              >
                <span>{link.label}</span>
                <span className="basera-hover-line"></span>
              </button>
            ))}
          </nav>

          <div className="basera-nav-divider"></div>

          {/* Desktop Profile Menu */}
          <div className="basera-profile-wrapper" ref={profileRef}>
            <button
              onClick={() => setProfileMenuOpen(!profileMenuOpen)}
              className={`basera-profile-trigger-btn ${
                profileMenuOpen ? "active" : ""
              }`}
              aria-label="User Profile & Account Menu"
            >
              <div className="profile-avatar-circle">
                {user ? (
                  <span className="avatar-initial">
                    {user.username ? user.username.charAt(0).toUpperCase() : "U"}
                  </span>
                ) : (
                  <User size={15} />
                )}
              </div>
              <span className="profile-label-text">
                {user ? user.username : "Profile"}
              </span>
              <ChevronDown
                size={14}
                className={`profile-chevron ${profileMenuOpen ? "rotate" : ""}`}
              />
            </button>

            {/* Profile Dropdown Menu */}
            <AnimatePresence>
              {profileMenuOpen && (
                <motion.div
                  className="basera-profile-dropdown"
                  initial={{ opacity: 0, y: 10, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.96 }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                >
                  {user ? (
                    <>
                      {/* User Info Header */}
                      <div className="dropdown-user-header">
                        <div className="dropdown-avatar-lg">
                          {user.username
                            ? user.username.charAt(0).toUpperCase()
                            : "U"}
                        </div>
                        <div className="dropdown-user-info">
                          <span className="user-name">@{user.username}</span>
                          <span className="user-role">
                            <Sparkles size={11} color="#D97706" /> Basera Patron
                          </span>
                        </div>
                      </div>

                      <div className="dropdown-separator"></div>

                      {/* Logged-In Menu Links */}
                      <div className="dropdown-menu-list">
                        <Link
                          to="/stays"
                          className="dropdown-menu-item"
                          onClick={() => setProfileMenuOpen(false)}
                        >
                          <Compass size={16} />
                          <span>Explore All Stays</span>
                        </Link>
                        <Link
                          to="/listings/new"
                          className="dropdown-menu-item"
                          onClick={() => setProfileMenuOpen(false)}
                        >
                          <PlusCircle size={16} />
                          <span>Host a Sanctuary</span>
                        </Link>
                      </div>

                      <div className="dropdown-separator"></div>

                      <button
                        onClick={() => {
                          setProfileMenuOpen(false);
                          logout();
                        }}
                        className="dropdown-menu-item logout-item"
                      >
                        <LogOut size={16} />
                        <span>Sign Out</span>
                      </button>
                    </>
                  ) : (
                    <>
                      {/* Guest Header */}
                      <div className="dropdown-guest-header">
                        <span className="guest-title">Welcome to Basera</span>
                        <span className="guest-sub">
                          The Art of Sanctuary &amp; Escape
                        </span>
                      </div>

                      <div className="dropdown-separator"></div>

                      {/* Guest Menu Links */}
                      <div className="dropdown-menu-list">
                        <Link
                          to="/login"
                          className="dropdown-menu-item primary-action"
                          onClick={() => setProfileMenuOpen(false)}
                        >
                          <LogIn size={16} />
                          <span>Sign In</span>
                        </Link>
                        <Link
                          to="/signup"
                          className="dropdown-menu-item"
                          onClick={() => setProfileMenuOpen(false)}
                        >
                          <UserPlus size={16} />
                          <span>Create Account</span>
                        </Link>
                        <Link
                          to="/listings/new"
                          className="dropdown-menu-item"
                          onClick={() => setProfileMenuOpen(false)}
                        >
                          <PlusCircle size={16} />
                          <span>Host with Basera</span>
                        </Link>
                      </div>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* MOBILE HAMBURGER BUTTON */}
        <div className="basera-mobile-hamburger-wrap mobile-only">
          <button
            type="button"
            className={`basera-hamburger-btn ${mobileMenuOpen ? "open" : ""}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close Navigation Menu" : "Open Navigation Menu"}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* FULL-SCREEN LUXURY MOBILE DRAWER MENU */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="basera-luxury-mobile-drawer"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="mobile-drawer-inner">
              {/* Top Atelier Badge */}
              <div className="mobile-drawer-top-badge">
                <span className="drawer-edition-text">
                  BASERA SANCTUARIES · PRIVATE ATELIER
                </span>
              </div>

              {/* Navigation Links with Numbering */}
              <div className="mobile-nav-items-list">
                {NAV_LINKS.map((link, idx) => (
                  <motion.button
                    key={link.id}
                    className="mobile-nav-link-row"
                    onClick={() => handleNavClick(link.id)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * idx, duration: 0.3 }}
                  >
                    <span className="mobile-nav-index">{link.num}</span>
                    <span className="mobile-nav-label">{link.label}</span>
                    <ArrowRight size={16} className="mobile-nav-arrow" />
                  </motion.button>
                ))}
              </div>

              <div className="mobile-drawer-gold-divider"></div>

              {/* User Account / Authentication Card */}
              <div className="mobile-drawer-auth-card">
                {user ? (
                  <div className="mobile-user-profile-box">
                    <div className="mobile-user-row">
                      <div className="dropdown-avatar-lg">
                        {user.username ? user.username.charAt(0).toUpperCase() : "U"}
                      </div>
                      <div className="mobile-user-text">
                        <span className="mobile-username">@{user.username}</span>
                        <span className="mobile-patron-badge">
                          <Sparkles size={11} color="#D97706" /> Basera Patron
                        </span>
                      </div>
                    </div>

                    <div className="mobile-user-actions-grid">
                      <Link
                        to="/stays"
                        className="mobile-btn-secondary"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <Compass size={16} />
                        <span>Explore Stays</span>
                      </Link>
                      <Link
                        to="/listings/new"
                        className="mobile-btn-primary"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <PlusCircle size={16} />
                        <span>Host Sanctuary</span>
                      </Link>
                    </div>

                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        logout();
                      }}
                      className="mobile-btn-signout"
                    >
                      <LogOut size={16} />
                      <span>Sign Out</span>
                    </button>
                  </div>
                ) : (
                  <div className="mobile-guest-box">
                    <p className="mobile-guest-tagline">
                      The Art of Sanctuary &amp; Escape
                    </p>
                    <div className="mobile-guest-actions-grid">
                      <Link
                        to="/login"
                        className="mobile-btn-primary"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <LogIn size={16} />
                        <span>Sign In</span>
                      </Link>
                      <Link
                        to="/signup"
                        className="mobile-btn-secondary"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <UserPlus size={16} />
                        <span>Create Account</span>
                      </Link>
                    </div>
                    <Link
                      to="/listings/new"
                      className="mobile-btn-host-pill"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <PlusCircle size={15} />
                      <span>Host with Basera</span>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
