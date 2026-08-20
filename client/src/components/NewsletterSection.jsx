import React, { useState } from "react";
import toast from "react-hot-toast";
import { Mail, ArrowRight, Sparkles } from "lucide-react";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    toast.success("Welcome to the Basera Journal. Issue 01 delivered soon.");
    setEmail("");
  };

  return (
    <section className="figma-journal-section" id="journal">
      <div className="container">
        <div className="figma-journal-card">
          <div className="figma-journal-badge">
            <Sparkles size={14} color="#D97706" />
            <span>MONTHLY EDITORIAL DISPATCH</span>
          </div>

          <h2 className="figma-journal-title">Join the Basera Journal</h2>
          <p className="figma-journal-desc">
            Curated travelogues, secret property releases, and architectural essays delivered straight to your inbox on the first Sunday of every month.
          </p>

          <form onSubmit={handleSubscribe} className="figma-journal-form">
            <div className="figma-journal-input-box">
              <Mail size={18} className="journal-mail-icon" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your personal email address..."
                className="figma-journal-input"
                required
              />
            </div>
            <button type="submit" className="figma-journal-submit-btn">
              <span>Subscribe</span>
              <ArrowRight size={15} />
            </button>
          </form>

          <span className="figma-journal-disclaimer">
            We value your sanctuary. No spam, ever. Unsubscribe with one click.
          </span>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
