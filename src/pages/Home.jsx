import { useEffect, useMemo, useRef, useState } from "react";
import churchSingers1 from "../images/NewYear1.jpg";
import churchSingers2 from "../images/NewYear2.jpg";
import churchSingers3 from "../images/NewYear3.jpg";

function Home() {
    const [showMap, setShowMap] = useState(false);

    // Leadership carousel
    const trackRef = useRef(null);
    const [activeDot, setActiveDot] = useState(0);

    // Modal state (notes)
    const [selectedLeader, setSelectedLeader] = useState(null);

    // Leaders data (add notes here)
    const leaders = useMemo(
        () => [
            {
                img: churchSingers1,
                role: "Pastor",
                name: "Nega",
                notes:
                    "Our pastor is devoted to preaching the Gospel of Jesus Christ, shepherding the church, and leading with prayer and humility.",
            },
            {
                img: churchSingers1,
                role: "Pastor",
                name: "Mulgeta",
                notes:
                    "Our pastor is devoted to preaching the Gospel of Jesus Christ, shepherding the church, and leading with prayer and humility.",
            },
            {
                img: churchSingers2,
                role: "Elder",
                name: "Tesfu",
                notes:
                    "Our elders support the church through prayer, discipleship, and serving the congregation with wisdom and love.",
            },
            {
                img: churchSingers3,
                role: "Elder",
                name: "Paulos",
                notes:
                    "Our elders stand with the pastor to strengthen the church and encourage spiritual growth in the body of Christ.",
            },
            {
                img: churchSingers2,
                role: "Elder",
                name: "Mussie",
                notes:
                    "Dedicated to serving, teaching, and helping the church walk in unity and faith.",
            },
            {
                img: churchSingers3,
                role: "Elder",
                name: "Teklit",
                notes:
                    "Committed to prayer, outreach, and caring for the spiritual needs of the church family.",
            },
        ],
        []
    );

    // Dots count based on screen width (pages)
    const getPerPage = () => {
        const w = window.innerWidth;
        if (w < 520) return 1;
        if (w < 900) return 2;
        return 3;
    };
    const [perPage, setPerPage] = useState(getPerPage());

    useEffect(() => {
        const onResize = () => setPerPage(getPerPage());
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);

    const dotCount = Math.max(1, Math.ceil(leaders.length / perPage));

    // Active dot based on real scroll progress
    const handleScroll = () => {
        const el = trackRef.current;
        if (!el) return;

        const max = el.scrollWidth - el.clientWidth;
        if (max <= 0) {
            setActiveDot(0);
            return;
        }

        const progress = el.scrollLeft / max; // 0..1
        const index = Math.round(progress * (dotCount - 1));
        setActiveDot(index);
    };

    // Click dot -> scroll (clamped to max)
    const scrollToDot = (index) => {
        const el = trackRef.current;
        if (!el) return;
        if (dotCount === 1) return;

        const max = el.scrollWidth - el.clientWidth;
        if (max <= 0) return;

        const target = (index / (dotCount - 1)) * max;
        el.scrollTo({ left: target, behavior: "smooth" });
    };

    // Close modal (overlay click)
    const closeModal = () => setSelectedLeader(null);

    return (
        <>
            {/* HERO SECTION */}
            <div className="home-page">
                <section className="hero">
                    <h1>Welcome to Our Church</h1>

                    <div className="hero-block">
                        <img
                            src={churchSingers1}
                            alt="PEEC singers"
                            loading="eager"
                            fetchPriority="high"
                        />
                        <p>
                            Whether you are from Columbus or across the globe, we invite you to
                            join us as we worship Jesus, build faith, and live out His love
                            every day.
                        </p>
                    </div>

                    <div className="hero-block reverse">
                        <img src={churchSingers2} alt="PEEC singers" loading="lazy" />
                        <p>Come and grow with us in faith and community.</p>
                    </div>

                    <div className="hero-block">
                        <img src={churchSingers3} alt="PEEC singers" loading="lazy" />
                    </div>

                    {/* PLAN A VISIT BUTTON */}
                    <div className="plan-visit">
                        <button
                            className="plan-visit-btn"
                            onClick={() => setShowMap(!showMap)}
                        >
                            {showMap ? "Hide Location" : "Plan a Visit"}
                        </button>
                    </div>

                    {/* LOCATION MAP (TOGGLED) */}
                    {showMap && (
                        <div className="location-container">
                            <h2>Our Location</h2>
                            <p>
                                We are located at{" "}
                                <strong>751 Rosehill Rd, Reynoldsburg, OH 43068</strong>
                            </p>

                            <div className="map-wrapper">
                                <iframe
                                    title="Church Location"
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d97730.01836957318!2d-82.96823176093748!3d40.05169333219518!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8838647f081b0a85%3A0x2f7957d158dbf5fb!2sThe%20Cross%20Walk%20Church!5e0!3m2!1sen!2sus!4v1767201921284!5m2!1sen!2sus"
                                    width="100%"
                                    height="350"
                                    style={{ border: 0 }}
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    allowFullScreen
                                />
                            </div>
                        </div>
                    )}

                    {/* LEADERSHIP CAROUSEL */}
                    <div className="leadership-section">
                        <h2>Our Leadership</h2>

                        <div
                            className="leader-track leader-track--paged leader-track--big"
                            ref={trackRef}
                            onScroll={handleScroll}
                        >
                            {leaders.map((leader, idx) => (
                                <button
                                    type="button"
                                    className="leader-card leader-card--btn"
                                    key={idx}
                                    onClick={() => setSelectedLeader(leader)}
                                >
                                    <img src={leader.img} alt={leader.name} loading="lazy" />
                                    <div className="leader-meta">
                                        <div className="leader-role">{leader.role}</div>
                                        <div className="leader-name">{leader.name}</div>
                                        <div className="leader-tap">Tap for notes</div>
                                    </div>
                                </button>
                            ))}
                        </div>

                        {/* DOTS */}
                        <div className="slider-dots" aria-label="Leadership slider dots">
                            {Array.from({ length: dotCount }).map((_, i) => (
                                <button
                                    key={i}
                                    className={`dot ${i === activeDot ? "active" : ""}`}
                                    onClick={() => scrollToDot(i)}
                                    aria-label={`Go to slide ${i + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                </section>
            </div>

            {/* MODAL (NOTES) */}
            {selectedLeader && (
                <div className="leader-modal-overlay" onClick={closeModal}>
                    <div
                        className="leader-modal"
                        onClick={(e) => e.stopPropagation()}
                        role="dialog"
                        aria-modal="true"
                    >
                        <img
                            className="leader-modal-img"
                            src={selectedLeader.img}
                            alt={selectedLeader.name}
                        />
                        <h2 className="leader-modal-title">{selectedLeader.name}</h2>
                        <p className="leader-modal-role">{selectedLeader.role}</p>
                        <p className="leader-modal-notes">{selectedLeader.notes}</p>

                        <button type="button" className="leader-modal-close" onClick={closeModal}>
                            Close
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

export default Home;
