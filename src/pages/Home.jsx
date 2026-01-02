import { useState } from "react";
import churchSingers1 from "../images/NewYear1.jpg";
import churchSingers2 from "../images/NewYear2.jpg";
import churchSingers3 from "../images/NewYear3.jpg";

function Home() {
    const [showMap, setShowMap] = useState(false);

    return (
        <>
            {/* HERO SECTION */}
            <div className="home-page">
            <section className="hero">
                <h1>Welcome to Our Church</h1>

                <div className="hero-block">
                    {/*<img src={churchSingers1} alt="PEEC singers" className="hero-image" />*/}
                    <img src={churchSingers1} alt="PEEC singers" loading="eager"
                         fetchPriority="high"/>
                    <p>
                        Whether you are from Columbus or across the globe, we invite you
                        to join us in worship, fellowship, and serving our community.
                    </p>
                </div>

                <div className="hero-block reverse">
                    <img src={churchSingers2} alt="PEEC singers" loading="lazy"/>
                    <p>Come and grow with us in faith and community.</p>
                </div>

                <div className="hero-block">
                    <img src={churchSingers3} alt="PEEC singers" loading="lazy"/>
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
                            We are located at <strong>751 Rosehill Rd, Reynoldsburg, OH 43068</strong>
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
            </section>
            </div>

        </>
    );
}

export default Home;

