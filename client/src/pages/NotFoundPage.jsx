import React from "react";
import { Link } from "react-router-dom";
import { Compass } from "lucide-react";

const NotFoundPage = () => {
  return (
    <div className="container">
      <div className="empty-state" style={{ minHeight: "60vh", justifyContent: "center" }}>
        <Compass size={64} color="var(--primary-color)" />
        <h1 style={{ fontSize: "2.5rem", fontWeight: 800 }}>404 - Page Not Found</h1>
        <p className="empty-state-text">
          We can't seem to find the page you're looking for. Maybe you took a wrong turn?
        </p>
        <Link to="/" className="btn-primary" style={{ marginTop: "1rem" }}>
          Back to Explore
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
