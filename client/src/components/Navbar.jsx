import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { LogOut, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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

  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (sectionId) => {
    setMobileMenuOpen(false);
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
    <header className={`figma-navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="container figma-navbar-inner">
        {/* Logo Wordmark */}
        <Link to="/" className="figma-brand-logo">
          Basera
        </Link>

        {/* Center Nav Links */}
        <nav className="figma-nav-center hidden md:flex">
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className="figma-nav-link"
              style={{ background: "none", border: "none", cursor: "pointer" }}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="figma-nav-right hidden md:flex">
          {user ? (
            <div className="flex items-center gap-3">
              <span className="figma-user-label">@{user.username}</span>
              <button
                onClick={logout}
                className="figma-logout-btn"
                title="Sign Out"
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <Link to="/login" className="figma-signin-btn">
              Sign In
            </Link>
          )}
          <Link to="/listings/new" className="figma-apply-host-btn">
            Apply to Host
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          className="figma-mobile-toggle-btn md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Drawer with AnimatePresence */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="figma-mobile-menu md:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className="text-left py-2 font-medium"
                style={{ background: "none", border: "none", cursor: "pointer", color: "inherit" }}
              >
                {link.label}
              </button>
            ))}

            <Link
              to="/listings/new"
              className="figma-mobile-host-btn"
              onClick={() => setMobileMenuOpen(false)}
            >
              Apply to Host
            </Link>

            {user ? (
              <button
                onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                }}
                className="text-left text-red-400 py-2"
                style={{ background: "none", border: "none", cursor: "pointer" }}
              >
                Sign Out (@{user.username})
              </button>
            ) : (
              <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                Sign In
              </Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
