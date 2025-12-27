function Updates() {
    return (
        <div className="page-container">
            <h1>Church Updates</h1>

            {/* Light Section */}
            <section>
                <h2>Upcoming Events</h2>
                <div className="card">
                    <h3>Sunday Worship Service</h3>
                    <small>Every Sunday at 12:30 PM</small>
                </div>
                <div className="card">
                    <h3>Prayer</h3>
                    <small>Everyday, 6:00 AM</small>
                </div>
            </section>

            {/* Dark Section */}
            <section className="dark-section">
                <h2>Announcements</h2>
                <div className="card">
                    <p>Children's Ministry is starting this Sunday!</p>
                </div>
                <div className="card">
                    <p>New Bible study group meeting on Wednesday evenings.</p>
                </div>
            </section>
        </div>
    );
}

export default Updates;
