import React from "react";

const ManifestoSection = () => {
  return (
    <section className="basera-manifesto-section" id="about">
      <div className="container">
        <div className="manifesto-content-box">
          {/* Grand Editorial Headline */}
          <h2 className="manifesto-headline">
            We curate sanctuaries where <em>architectural mastery</em> meets the poetry of stillness.
          </h2>

          {/* Editorial Narrative Paragraph */}
          <p className="manifesto-body-text">
            Basera was founded on a singular conviction: extraordinary travel is not merely about reaching a destination, but arriving at a profound state of peace. From brutalist clifftop pavilions in the Aegean to timber refuges suspended over Nordic fjords, every residence in our atelier is hand-vetted for rare provenance, sensory warmth, and uncompromised privacy.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ManifestoSection;
