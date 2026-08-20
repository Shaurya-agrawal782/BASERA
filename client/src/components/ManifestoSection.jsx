import React from "react";
import { Sparkles, Shield, Feather, Compass } from "lucide-react";

const PILLARS = [
  {
    icon: Shield,
    title: "Vetted Architectural Provenance",
    desc: "Every stay is privately inspected to ensure exceptional design integrity and acoustic tranquility.",
  },
  {
    icon: Feather,
    title: "The Art of Slow Living",
    desc: "Spaces deliberately curated to slow down time, immerse in nature, and reconnect with clarity.",
  },
  {
    icon: Compass,
    title: "Discreet Bespoke Concierge",
    desc: "Tailored local cultural masters, private chefs, and nautical charters at your effortless disposal.",
  },
];

const ManifestoSection = () => {
  return (
    <section className="basera-manifesto-section" id="about">
      <div className="container">
        <div className="manifesto-content-box">
          {/* Eyebrow Pill */}
          <div className="manifesto-eyebrow-wrap">
            <span className="manifesto-eyebrow">
              <Sparkles size={13} className="text-amber-500" />
              THE BASERA PHILOSOPHY
            </span>
          </div>

          {/* Grand Editorial Headline */}
          <h2 className="manifesto-headline">
            We curate sanctuaries where <em>architectural mastery</em> meets the poetry of stillness.
          </h2>

          {/* Editorial Narrative Paragraph */}
          <p className="manifesto-body-text">
            Basera was founded on a singular conviction: extraordinary travel is not merely about reaching a destination, but arriving at a profound state of peace. From brutalist clifftop pavilions in the Aegean to timber refuges suspended over Nordic fjords, every residence in our atelier is hand-vetted for rare provenance, sensory warmth, and uncompromised privacy.
          </p>

          {/* 3 Pillars Row */}
          <div className="manifesto-pillars-grid">
            {PILLARS.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div key={idx} className="manifesto-pillar-item">
                  <div className="pillar-icon-box">
                    <Icon size={18} />
                  </div>
                  <div className="pillar-text-box">
                    <h4 className="pillar-title">{pillar.title}</h4>
                    <p className="pillar-desc">{pillar.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ManifestoSection;
