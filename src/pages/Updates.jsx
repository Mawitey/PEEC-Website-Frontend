import concertFlyer from "../images/Fundraising-concert.jpg";

function Updates() {
    return (
        <div className="page-container">
            <h1>Church Updates</h1>

            {/* Dark Section */}
            <section className="dark-section">
                <h2>Announcements</h2>

                <div className="card">
                    <h3>PEEC Fundraising Concert</h3>

                    <p>
                        Join us for a special fundraising concert as we work together
                        toward building a permanent home for Philadelphia Evangelical
                        Eritrean Church. We invite everyone to worship, fellowship,
                        and support this important vision.
                    </p>

                    <img
                        src={concertFlyer}
                        alt="PEEC Fundraising Concert"
                        className="announcement-flyer"
                    />

                </div>
            </section>

            {/* Dark Section*/}
            <section className="dark-section">
              <h2>Events</h2>

              <div className="card event-card">
                <h3>Sunday Worship Service</h3>
                <p>Every Sunday at 12:30 PM</p>
              </div>

              <div className="card event-card">
                <h3>Morning Prayer</h3>
                <p>Everyday, 6:00 - 7:00 AM</p>
              </div>

              <div className="card event-card">
                <h3>Saturday Prayer</h3>
                <p>Saturday, 4:00 - 6:00 PM</p>
              </div>

              <div className="card event-card">
                <h3>Bible Study</h3>
                <p>Bible study group meets every weekday evening, with an additional program on Friday mornings.</p>
              </div>
            </section>


        </div>
    );
}

export default Updates;
