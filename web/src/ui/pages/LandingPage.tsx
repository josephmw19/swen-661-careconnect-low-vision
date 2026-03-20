import React from "react";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing">
      {/* Header */}
      <header className="landingHeader">
        <div className="landingBrand">CareConnect</div>
        <nav className="landingNav">
          <button className="navLink">Home</button>
          <button className="navLink">Features</button>
          <button className="navLink">Accessibility</button>
          <button className="navLink">Support</button>
          <button
            className="navPrimary"
            onClick={() => navigate("/role")}
          >
            Sign In
          </button>
        </nav>
      </header>

      {/* Hero */}
      <section className="landingHero">
        <h1>
          Healthcare Support <br />
          <span className="accent">Designed for Clarity</span>
        </h1>
        <p>
          Manage medications, track tasks, and stay connected with your care
          team. Built with accessibility at its core for users with low vision
          and cognitive needs.
        </p>

        <div className="heroActions">
          <button
            className="btnBlue"
            onClick={() => navigate("/role")}
          >
            Get Started
          </button>
          <button className="btnDark">Learn More</button>
        </div>
      </section>

      {/* Features */}
      <section className="landingSection">
        <h2>Everything You Need, Nothing You Don’t</h2>
        <p className="sectionSub">
          Essential features designed for simplicity and accessibility
        </p>

        <div className="featureGrid">
          {[
            ["Medication Reminders", "Never miss a dose with clear reminders and easy tracking."],
            ["Task Management", "Organize health tasks into simple, accessible lists."],
            ["Secure Messaging", "Communicate safely with your care team."],
            ["Offline Access", "View critical information anytime, even offline."]
          ].map(([title, desc]) => (
            <div key={title} className="featureCard">
              <h3>{title}</h3>
              <p>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Accessibility */}
      <section className="landingSection muted">
        <h2>Built for Everyone, Designed with Care</h2>

        <div className="featureGrid">
          {[
            "High Contrast Design",
            "Large, Scalable Text",
            "Full Keyboard Support",
            "Screen Reader Optimized",
            "Reduced Cognitive Load",
            "Caregiver-Friendly"
          ].map((label) => (
            <div key={label} className="featureCard">
              <h3>{label}</h3>
            </div>
          ))}
        </div>

        <div className="badge">WCAG 2.1 AA Compliant</div>
      </section>

      {/* Footer */}
      <footer className="landingFooter">
        <div>© 2026 CareConnect</div>
        <div className="footerLinks">
          <span>Privacy</span>
          <span>Terms</span>
          <span>Accessibility</span>
        </div>
      </footer>
    </div>
  );
}