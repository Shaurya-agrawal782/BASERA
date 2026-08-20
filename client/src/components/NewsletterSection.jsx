import React, { useState } from "react";
import toast from "react-hot-toast";
import { Mail, ArrowRight, BookOpen, Sparkles, CheckCircle2 } from "lucide-react";

const ESSAYS = [
  {
    num: "01",
    title: "The Nordic Solitude Revival",
    subtitle: "Lofoten timber cabins & midnight sun architecture",
  },
  {
    num: "02",
    title: "Restoring Tuscan Provenance",
    subtitle: "16th-century stone estates reimagined for living art",
  },
  {
    num: "03",
    title: "Stargazing Desert Pavilions",
    subtitle: "Off-grid celestial architecture in the Sahara sands",
  },
];

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setIsSubscribed(true);
    toast.success("Welcome to The Basera Gazette. Volume IV is on its way.");
    setEmail("");
  };

  return (
    <section className="figma-journal-section" id="journal">
      <div className="container">
        <div className="gazette-card">
          {/* LEFT EDITORIAL COLUMN */}
          <div className="gazette-left">
            <div className="gazette-eyebrow-pill">
              <Sparkles size={12} className="gazette-sparkle" />
              <span>MONTHLY PRIVATE MONOGRAPH</span>
            </div>

            <h2 className="gazette-title">The Basera Gazette</h2>
            <p className="gazette-desc">
              Curated essays on quiet architecture, private estate releases, and conversations with the world's most visionary hosts.
            </p>

            {/* 3 MONOGRAPH TOPICS */}
            <div className="gazette-essays-list">
              {ESSAYS.map((essay) => (
                <div key={essay.num} className="gazette-essay-item">
                  <span className="essay-num">{essay.num}</span>
                  <div className="essay-meta">
                    <h4 className="essay-title">{essay.title}</h4>
                    <p className="essay-subtitle">{essay.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* FORM */}
            <form onSubmit={handleSubscribe} className="gazette-form">
              <div className="gazette-input-wrap">
                <Mail size={16} className="gazette-mail-icon" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your personal email..."
                  className="gazette-input"
                  required
                />
              </div>
              <button type="submit" className="gazette-submit-btn">
                <span>{isSubscribed ? "Subscribed" : "Receive Gazette"}</span>
                <ArrowRight size={14} />
              </button>
            </form>

            <span className="gazette-micro-note">
              Complimentary dispatch on the first Sunday of every month · Zero spam.
            </span>
          </div>

          {/* RIGHT MAGAZINE COVER DISPLAY */}
          <div className="gazette-right">
            <div className="magazine-cover-card">
              {/* Cover Top Header */}
              <div className="magazine-masthead">
                <span className="masthead-logo">B A S E R A</span>
                <span className="masthead-issue">VOL. IV · 2026</span>
              </div>

              {/* Cover Background Photo */}
              <div className="magazine-cover-photo-box">
                <img
                  src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=2000&q=95"
                  alt="Basera Gazette Cover"
                  className="magazine-cover-photo"
                  loading="lazy"
                />
                <div className="magazine-cover-scrim"></div>
              </div>

              {/* Cover Bottom Headlines */}
              <div className="magazine-cover-headlines">
                <span className="cover-special-tag">EXCLUSIVE EDITION</span>
                <h3 className="cover-main-title">The Art of Stillness &amp; Sanctuary</h3>
                <div className="cover-footer-row">
                  <span>Printed in Milan &amp; Zurich</span>
                  <span>Digital Monograph</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
