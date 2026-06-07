import React, { useState } from "react";
import flyerImage from "../images/Flyer.jpg";

function Giving() {
  const [showGiving, setShowGiving] = useState(false);

  const toggleGiving = () => {
    setShowGiving(!showGiving);
  };

  return (
    <main className="building-page">
      <section className="building-hero">
        <div className="building-hero-content">
          <h1>Help Us Build Our Church Home</h1>
          <p>
            We are prayerfully working toward purchasing a permanent church
            building where our congregation can worship, grow, and serve the
            community for generations to come.
          </p>

          <div className="building-buttons">
            <a href="#vision" className="home-action-btn">
              Learn More
            </a>

            <a href="#give" className="home-action-btn">
              Give Now
            </a>
          </div>
        </div>
      </section>

      <section id="vision" className="building-section">
        <h2>Our Vision</h2>
        <p>
          A permanent building will provide Philadelphia Evangelical Eritrean
          Church with a stable home for worship services, prayer meetings,
          Bible studies, youth ministry, fellowship, and outreach to the
          community.
        </p>
      </section>

      <section className="impact-grid">
        <div>
          <h3>Worship</h3>
          <p>A dedicated place to gather together and praise God.</p>
        </div>

        <div>
          <h3>Youth Ministry</h3>
          <p>A safe space to teach and encourage the next generation.</p>
        </div>

        <div>
          <h3>Outreach</h3>
          <p>A home base to serve families and neighbors in need.</p>
        </div>
      </section>

      <section className="building-section goal-box">
        <h2>Fundraising Goal</h2>

        <p>
          We invite our church family, friends, and supporters to partner with us
          in this vision.
        </p>

        <div className="goal-numbers">
          <p>
            <strong>Goal:</strong> $1.5M – $2M
          </p>
          <p>
            <strong>Raised so far:</strong> $350,000+
          </p>
        </div>

        <div className="flyer-box">
          <h3>📄 View Full Fundraising Flyer</h3>
          <p>
            See the full vision, progress, and how you can be part of building a
            permanent home for PEEC.
          </p>

          <div className="flyer-buttons">
            <a
              href={flyerImage}
              target="_blank"
              rel="noopener noreferrer"
              className="home-action-btn"
            >
              Open Flyer
            </a>

            <a
              href={flyerImage}
              download="PEEC-Building-Fundraiser-Flyer.jpg"
              className="home-action-btn"
            >
              Download Flyer
            </a>
          </div>
        </div>
      </section>

      <section id="give" className="building-section give-box">
        <h2>Partner With Us</h2>
        <p>
          You can support this mission through prayer, sharing the vision, and
          giving through the official church-approved donation methods.
        </p>

        <div className="give-options">
          <p>🙏 Pray for God’s guidance and provision</p>
          <p>🤝 Share this page with family and friends</p>
          <p>💛 Give through the official church donation methods</p>
        </div>

        <button
          type="button"
          className="home-action-btn give-btn"
          onClick={toggleGiving}
        >
          {showGiving ? "Hide Giving Options" : "Show Giving Options"}
        </button>

        {showGiving && (
          <div className="giving-container">
            <h2>Give Now</h2>

            <div className="giving-options-grid">
              <div className="card">
                <h3>Zelle Giving</h3>
                <ul>
                  <li>
                    One-time or recurring donations — Zelle:{" "}
                    <strong>fundpeec2023@gmail.com</strong>
                  </li>
                </ul>
              </div>

              <div className="card">
                <h3>Card Giving</h3>
                <ul>
                  <li>Online donations with debit or credit card</li>
                </ul>

                <a
                  href="https://givealittle.co/c/a43278e3-1113-4d56-b488-04b6eb2e80c3"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="home-action-btn"
                >
                  Give Online
                </a>
              </div>

              <div className="card">
                <h3>In-Person Giving</h3>
                <ul>
                  <li>During Sunday service</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}

export default Giving;