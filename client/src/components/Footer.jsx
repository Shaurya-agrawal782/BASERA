import React from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";

const Footer = () => {
  return (
    <footer className="basera-luxury-footer" id="about">
      <div className="container">
        {/* MAIN 5-COLUMN EDITORIAL GRID */}
        <div className="basera-footer-main-grid">
          {/* Column 1: Brand Atelier */}
          <div className="basera-footer-col-brand">
            <div className="footer-logo-wrap">
              <Logo theme="dark" />
            </div>
            <p className="basera-footer-bio">
              A private collection curating the world’s most architectural and historically exceptional sanctuaries for the discerning traveler.
            </p>
          </div>

          {/* Column 2: Destinations */}
          <div className="basera-footer-col">
            <h4 className="basera-footer-col-heading">
              <span>Destinations</span>
            </h4>
            <ul className="basera-footer-link-list">
              <li><Link to="/stays?q=Santorini">Santorini, Greece</Link></li>
              <li><Link to="/stays?q=Tuscany">Tuscany &amp; Amalfi, Italy</Link></li>
              <li><Link to="/stays?q=Swiss">Swiss Alps, Zermatt</Link></li>
              <li><Link to="/stays?q=Kyoto">Kyoto &amp; Hakone, Japan</Link></li>
              <li><Link to="/stays?q=Marrakech">Marrakech, Morocco</Link></li>
              <li><Link to="/stays?q=Lake">Lake Como &amp; Dolomites</Link></li>
            </ul>
          </div>

          {/* Column 3: Curation */}
          <div className="basera-footer-col">
            <h4 className="basera-footer-col-heading">
              <span>Curation</span>
            </h4>
            <ul className="basera-footer-link-list">
              <li><Link to="/stays?category=Amazing+pools">Architectural Villas</Link></li>
              <li><Link to="/stays?category=Castles">Heritage Estates</Link></li>
              <li><Link to="/stays?category=Iconic+cities">Cliffside Penthouses</Link></li>
              <li><Link to="/stays?category=Mountains">Alpine Sanctuaries</Link></li>
              <li><a href="#journal">Basera Journal</a></li>
              <li><Link to="/stays">Explore All Stays</Link></li>
            </ul>
          </div>

          {/* Column 4: Hosting Atelier */}
          <div className="basera-footer-col">
            <h4 className="basera-footer-col-heading">
              <span>Hosting</span>
            </h4>
            <ul className="basera-footer-link-list">
              <li><Link to="/listings/new">Why Host?</Link></li>
              <li><Link to="/listings/new">Host Standards</Link></li>
              <li><Link to="/listings/new">Insurance &amp; Protection</Link></li>
              <li><Link to="/listings/new">Earnings Estimator</Link></li>
              <li><Link to="/listings/new">Host Concierge</Link></li>
            </ul>
          </div>

          {/* Column 5: Support & Trust */}
          <div className="basera-footer-col">
            <h4 className="basera-footer-col-heading">
              <span>Support</span>
            </h4>
            <ul className="basera-footer-link-list">
              <li><a href="#about">Help Center</a></li>
              <li><a href="#about">Cancellation Policies</a></li>
              <li><a href="#about">Safety Protocols</a></li>
              <li><a href="#about">Privacy Charter</a></li>
              <li><a href="#about">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        {/* LUXURY BOTTOM BAR */}
        <div className="basera-footer-bottom-bar">
          <div className="footer-bottom-left">
            <p className="basera-footer-copyright">
              &copy; 2026 BASERA COLLECTION, INC. ALL RIGHTS RESERVED.
            </p>
          </div>

          <div className="footer-bottom-right">
            <div className="basera-footer-social-icons">
              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="social-icon-circle"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>

              {/* Twitter / X */}
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter"
                className="social-icon-circle"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4l11.733 16h4.267l-11.733-16z" />
                  <path d="M4 20l6.768-6.768m2.464-2.464l6.768-6.768" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="social-icon-circle"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
