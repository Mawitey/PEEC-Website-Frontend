import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import event24 from "../images/Event24.webp";

import event0 from "../images/Event0.webp";
import event1 from "../images/Event1.webp";
import event2 from "../images/Event2.webp";
import event3 from "../images/Event3.webp";
import event4 from "../images/Event4.webp";
import event5 from "../images/Event5.webp";
import event6 from "../images/Event6.webp";
import event8 from "../images/Event8.webp";
import event10 from "../images/Event10.webp";
import event11 from "../images/Event11.webp";
import event12 from "../images/Event12.webp";
import event13 from "../images/Event13.webp";
import event14 from "../images/Event14.webp";
import event15 from "../images/Event15.webp";
import event16 from "../images/Event16.webp";
import event17 from "../images/Event17.webp";
import event18 from "../images/Event18.webp";
import event19 from "../images/Event19.webp";
import event22 from "../images/Event22.webp";
import event23 from "../images/Event23.webp";
import event25 from "../images/Event25.webp";
import event26 from "../images/Event26.webp";
import event28 from "../images/Event28.webp";

import paster from "../images/Paster.webp";
import elder1 from "../images/Elder1.webp";
import elder2 from "../images/Elder2.webp";
import elder3 from "../images/Elder3.webp";
import elder4 from "../images/Elder4.webp";
import elder5 from "../images/Elder5.webp";

function Home() {
  const navigate = useNavigate();
  const [showMap, setShowMap] = useState(false);
  const [showGiving, setShowGiving] = useState(false);
  const [selectedLeader, setSelectedLeader] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const [showEventLeft, setShowEventLeft] = useState(false);
  const [showEventRight, setShowEventRight] = useState(true);
  const [showLeaderLeft, setShowLeaderLeft] = useState(false);
  const [showLeaderRight, setShowLeaderRight] = useState(true);

  const eventSliderRef = useRef(null);
  const leaderSliderRef = useRef(null);

  const events = [
    event0,
    event1,
    event2,
    event5,
    event10,
    event16,
    event13,
    event22,
    event14,
    event25,
    event17,
    event18,
    event23,
    event19,
  ];

  const leaders = useMemo(
    () => [
      {
        img: paster,
        role: "Pastor",
        name: "Negga Woldesemait",
        title: "Pastor",
        notes:
          "Our pastor is devoted to preaching the Gospel of Jesus Christ, shepherding the church, and leading with prayer and humility.",
      },
      {
        img: elder1,
        role: "Elder",
        name: "Tesfazghi Tesfou",
        title: "Church Elder",
        notes:
          "Our elders support the church through prayer, discipleship, and serving the congregation with wisdom and love.",
      },
      {
        img: elder2,
        role: "Elder",
        name: "Paulos Gebremariam",
        title: "Church Elder",
        notes:
          "Our elders stand with the pastor to strengthen the church and encourage spiritual growth in the body of Christ.",
      },
      {
        img: elder3,
        role: "Elder",
        name: "Mussie Mengisteab",
        title: "Church Elder",
        notes:
          "Dedicated to serving, teaching, and helping the church walk in unity and faith.",
      },
      {
        img: elder4,
        role: "Elder",
        name: "Teklit Abraham",
        title: "Church Elder",
        notes:
          "Committed to prayer, outreach, and caring for the spiritual needs of the church family.",
      },
      {
        img: elder5,
        role: "Elder",
        name: "Efrem Buru",
        title: "Church Elder",
        notes:
          "Dedicated to serving with humility, guiding the congregation, and strengthening faith through prayer and support.",
      },
    ],
    []
  );

  const checkEventSlider = () => {
    const slider = eventSliderRef.current;
    if (!slider) return;

    setShowEventLeft(slider.scrollLeft > 5);
    setShowEventRight(
      slider.scrollLeft < slider.scrollWidth - slider.clientWidth - 5
    );
  };

  const checkLeaderSlider = () => {
    const slider = leaderSliderRef.current;
    if (!slider) return;

    setShowLeaderLeft(slider.scrollLeft > 5);
    setShowLeaderRight(
      slider.scrollLeft < slider.scrollWidth - slider.clientWidth - 5
    );
  };

  useEffect(() => {
    checkEventSlider();
    checkLeaderSlider();

    window.addEventListener("resize", checkEventSlider);
    window.addEventListener("resize", checkLeaderSlider);

    return () => {
      window.removeEventListener("resize", checkEventSlider);
      window.removeEventListener("resize", checkLeaderSlider);
    };
  }, []);

  const toggleMap = () => {
    setShowMap((value) => !value);
    setShowGiving(false);
  };

  const toggleGiving = () => {
    setShowGiving((value) => !value);
    setShowMap(false);
  };

  const slideEventsLeft = () => {
    eventSliderRef.current?.scrollBy({ left: -320, behavior: "smooth" });
    setTimeout(checkEventSlider, 450);
  };

  const slideEventsRight = () => {
    eventSliderRef.current?.scrollBy({ left: 320, behavior: "smooth" });
    setTimeout(checkEventSlider, 450);
  };

  const slideLeadersLeft = () => {
    leaderSliderRef.current?.scrollBy({ left: -300, behavior: "smooth" });
    setTimeout(checkLeaderSlider, 450);
  };

  const slideLeadersRight = () => {
    leaderSliderRef.current?.scrollBy({ left: 300, behavior: "smooth" });
    setTimeout(checkLeaderSlider, 450);
  };

  const PlanVisit = () => (
    <section className="toggle-section">
      <h2>Plan a Visit</h2>

      <p>
        We are located at{" "}
        <a
          href="https://www.google.com/maps/dir//Philadelphia+Eritrean+Evangelical+Church,+751+Rosehill+Rd,+Reynoldsburg,+OH+43068/"
          target="_blank"
          rel="noopener noreferrer"
          className="location-link"
        >
          <strong>751 Rosehill Rd, Reynoldsburg, OH 43068</strong>
        </a>
      </p>

      <div className="map-wrapper">
        <iframe
          title="Philadelphia Eritrean Evangelical Church"
          src="https://www.google.com/maps?q=Philadelphia+Eritrean+Evangelical+Church+751+Rosehill+Rd+Reynoldsburg+OH+43068&output=embed"
          width="100%"
          height="350"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
        />
      </div>
    </section>
  );

  const Give = () => (
    <section className="toggle-section">
      <h2>Give Now</h2>

      <div className="giving-grid">
        <div className="giving-card">
          <h3>Online Giving</h3>
          <p>
            Zelle: <strong>peecc2010@gmail.com</strong>
          </p>
        </div>

        <div className="giving-card">
          <h3>In-Person Giving</h3>
          <p>During Sunday worship service.</p>
        </div>
      </div>
    </section>
  );

  return (
    <main className="home-page">
      <section className="hero-section">
        <div className="hero-text">
          <h1>
            Welcome to <br />
            Our Church
          </h1>

          <p>
            Join us for worship, prayer, fellowship, and the Word of God. We
            welcome you and your family to worship with us in Columbus, Ohio.
          </p>

          <p className="service-time">Sunday Worship Service • 12:30 PM</p>

          <div className="hero-buttons">
            <button type="button" className="primary-btn" onClick={toggleMap}>
              {showMap ? "Hide Location" : "Plan a Visit"}
            </button>

            <button
              type="button"
              className="secondary-btn"
              onClick={toggleGiving}
            >
              {showGiving ? "Hide Give" : "Give"}
            </button>

            <button
              type="button"
              className="primary-btn"
              onClick={() => navigate("/giving")}
            >
              Building Fund
            </button>
          </div>

          <div className="mobile-toggle">
            {showMap && <PlanVisit />}
            {showGiving && <Give />}
          </div>
        </div>

        <div className="hero-image-wrapper">
          <img
            src={localStorage.getItem("homeHeroImage") || event28}
            alt="PEEC church worship"
            className="clickable-image"
            onClick={() =>
              setSelectedImage(localStorage.getItem("homeHeroImage") || event28)
            }
          />
        </div>
      </section>

      <div className="desktop-toggle">
        {showMap && <PlanVisit />}
        {showGiving && <Give />}
      </div>

      <section className="info-cards">
        <div className="info-card">
          <img
            src={localStorage.getItem("growFaithImage") || event15}
            alt="Grow in Faith"
            className="info-card-img clickable-image"
            onClick={() =>
              setSelectedImage(localStorage.getItem("growFaithImage") || event15)
            }
          />

          <div className="info-card-content">
            <div className="icon-circle">👥</div>
            <h3>Grow in Faith</h3>
            <p>Strengthen your relationship with God through prayer.</p>
          </div>
        </div>

        <div className="info-card">
          <img
            src={localStorage.getItem("communityImage") || event24}
            alt="Community"
            className="info-card-img clickable-image"
            onClick={() =>
              setSelectedImage(localStorage.getItem("communityImage") || event24)
            }
          />

          <div className="info-card-content">
            <div className="icon-circle">⛪</div>
            <h3>Community</h3>
            <p>We are a family. Connect, encourage, and serve together.</p>
          </div>
        </div>

        <div className="info-card">
          <img
            src={localStorage.getItem("impactImage") || event26}
            alt="Make an Impact"
            className="info-card-img clickable-image"
            onClick={() =>
              setSelectedImage(localStorage.getItem("impactImage") || event26)
            }
          />

          <div className="info-card-content">
            <div className="icon-circle">♡</div>
            <h3>Make an Impact</h3>
            <p>Serve others and share God’s love.</p>
          </div>
        </div>
      </section>

      <section className="events-section">
        <h2>Life at PEEC</h2>

        <p>
          Worship, fellowship, youth ministry, cultural celebrations, and church
          family gatherings.
        </p>

        <div className="slider-container">
          {showEventLeft && (
            <button
              type="button"
              className="slider-btn left"
              onClick={slideEventsLeft}
            >
              ❮
            </button>
          )}

          <div
            className="slider-track"
            ref={eventSliderRef}
            onScroll={checkEventSlider}
          >
            {events.map((image, index) => (
              <button
                type="button"
                className="slider-card"
                key={index}
                onClick={() => setSelectedImage(image)}
              >
                <img src={image} alt={`PEEC event ${index + 1}`} loading="lazy" />
              </button>
            ))}
          </div>

          {showEventRight && (
            <button
              type="button"
              className="slider-btn right"
              onClick={slideEventsRight}
            >
              ❯
            </button>
          )}
        </div>
      </section>

      <section className="leadership-section">
        <h2>Our Leadership</h2>
        <div className="section-line"></div>

        <div className="slider-container">
          {showLeaderLeft && (
            <button
              type="button"
              className="slider-btn left"
              onClick={slideLeadersLeft}
            >
              ❮
            </button>
          )}

          <div
            className="leader-slider-track"
            ref={leaderSliderRef}
            onScroll={checkLeaderSlider}
          >
            {leaders.map((leader, index) => (
              <button
                type="button"
                className="leader-card"
                key={index}
                onClick={() => setSelectedLeader(leader)}
              >
                <img src={leader.img} alt={leader.name} loading="lazy" />

                <div className="leader-info">
                  <span>{leader.role}</span>
                  <h3>{leader.name}</h3>
                  <p>{leader.title}</p>
                </div>
              </button>
            ))}
          </div>

          {showLeaderRight && (
            <button
              type="button"
              className="slider-btn right"
              onClick={slideLeadersRight}
            >
              ❯
            </button>
          )}
        </div>
      </section>

      {selectedImage && (
        <div
          className="gallery-modal-overlay"
          onClick={() => setSelectedImage(null)}
        >
          <div className="gallery-modal" onClick={(e) => e.stopPropagation()}>
            <img src={selectedImage} alt="PEEC enlarged view" />

            <button
              type="button"
              className="gallery-close-btn"
              onClick={() => setSelectedImage(null)}
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {selectedLeader && (
        <div
          className="leader-modal-overlay"
          onClick={() => setSelectedLeader(null)}
        >
          <div
            className="leader-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <img
              className="leader-modal-img"
              src={selectedLeader.img}
              alt={selectedLeader.name}
            />

            <h2>{selectedLeader.name}</h2>
            <p className="leader-modal-role">{selectedLeader.role}</p>
            <p>{selectedLeader.notes}</p>

            <button
              type="button"
              className="leader-modal-close"
              onClick={() => setSelectedLeader(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

export default Home;