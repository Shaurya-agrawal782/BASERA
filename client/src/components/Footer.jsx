import React from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";

const Footer = () => {
  return (
    <footer className="figma-footer" id="about">
      <div className="container">
        {/* Main 5-Column Grid */}
        <div className="figma-footer-grid">
          {/* Brand Info */}
          <div className="figma-footer-brand-col">
            <Logo showTagline={true} />
            <p className="figma-footer-brand-text">
              A premium vacation rental marketplace curating the world's most architectural and historically exceptional stays.
            </p>
          </div>

          {/* Company */}
          <div className="figma-footer-col">
            <h4 className="figma-footer-header">Company</h4>
            <ul className="figma-footer-links">
              <li><Link to="/">About Us</Link></li>
              <li><Link to="/">Careers</Link></li>
              <li><a href="#journal">Journal</a></li>
              <li><Link to="/">Press Kit</Link></li>
            </ul>
          </div>

          {/* Hosting */}
          <div className="figma-footer-col">
            <h4 className="figma-footer-header">Hosting</h4>
            <ul className="figma-footer-links">
              <li><Link to="/listings/new">Why Host?</Link></li>
              <li><Link to="/">Host Standards</Link></li>
              <li><Link to="/">Insurance</Link></li>
              <li><Link to="/">Earnings Estimator</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div className="figma-footer-col">
            <h4 className="figma-footer-header">Support</h4>
            <ul className="figma-footer-links">
              <li><Link to="/">Help Center</Link></li>
              <li><Link to="/">Cancellation Policies</Link></li>
              <li><Link to="/">Safety</Link></li>
              <li><Link to="/">COVID-19 Response</Link></li>
            </ul>
          </div>

          {/* Destinations */}
          <div className="figma-footer-col">
            <h4 className="figma-footer-header">Destinations</h4>
            <ul className="figma-footer-links">
              <li><a href="#stays">Santorini</a></li>
              <li><a href="#stays">Tuscany</a></li>
              <li><a href="#stays">Swiss Alps</a></li>
              <li><a href="#stays">Kyoto</a></li>
              <li><a href="#stays">Marrakech</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="figma-footer-bottom">
          <p className="figma-footer-copy">
            &copy; 2026 Basera Collection, Inc. All rights reserved.
          </p>
          <div className="figma-footer-socials">
            {/* Instagram SVG */}
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
              </svg>
            </a>
            {/* Twitter/X SVG */}
            <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
              </svg>
            </a>
            {/* Facebook SVG */}
            <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
