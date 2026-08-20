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
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "./Logo";

const NAV_LINKS = [
  { label: "Stays", id: "stays" },
  { label: "Experiences", id: "experiences" },
  { label: "Collections", id: "collections" },
  { label: "Journal", id: "journal" },
  { label: "About", id: "about" },
];

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [visible, setVisible] = useState(true);
  const [atTop, setAtTop] = useState(true);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const profileRef = useRef(null);
  const lastScrollY = useRef(0);

  // Close dropdown on outside click
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
      const currentScrollY = window.scrollY;

      if (currentScrollY <= 0) {
        setAtTop(true);
        setVisible(true);
      } else {
        setAtTop(false);

        if (currentScrollY > lastScrollY.current + 3) {
          setVisible(false);
          setProfileMenuOpen(false);
        } else if (currentScrollY < lastScrollY.current - 3) {
          setVisible(true);
        }
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (sectionId) => {
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
      className={`basera-navbar-wrapper ${atTop ? "at-top" : "scrolled"} ${visible ? "nav-visible" : "nav-hidden"
        }`}
    >
      <div className="basera-nav-layout">
        {/* FAR LEFT: Brand Logo ONLY */}
        <div className="basera-nav-brand-col">
          <Logo />
        </div>

        {/* FAR RIGHT: Navigation Links + Profile Section */}
        <div className="basera-nav-right-col">
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

          {/* FAR RIGHT: Profile Section Menu */}
          <div className="basera-profile-wrapper" ref={profileRef}>
            <button
              onClick={() => setProfileMenuOpen(!profileMenuOpen)}
              className={`basera-profile-trigger-btn ${profileMenuOpen ? "active" : ""}`}
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
                          {user.username ? user.username.charAt(0).toUpperCase() : "U"}
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
                        <span className="guest-sub">The Art of Sanctuary &amp; Escape</span>
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
      </div>
    </header>
  );
};

export default Navbar;
