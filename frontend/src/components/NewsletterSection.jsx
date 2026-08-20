import React, { useState } from "react";
import toast from "react-hot-toast";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    toast.success("Welcome to the Basera Journal.");
    setEmail("");
  };

  return (
    <section className="figma-journal-section" id="journal">
      <div className="container">
        <div className="figma-journal-card">
          <span className="figma-journal-eyebrow">Monthly Inspiration</span>
          <h2 className="figma-journal-title">Join the Basera Journal</h2>
          <p className="figma-journal-desc">
            Curated travelogues, secret property releases, and architectural stories delivered monthly.
          </p>

          <form onSubmit={handleSubscribe} className="figma-journal-form">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="figma-journal-input"
              required
            />
            <button type="submit" className="figma-journal-submit-btn">
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
