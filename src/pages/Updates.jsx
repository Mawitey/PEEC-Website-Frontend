function Updates() {
    return (
        <div className="page-container">
            <h1>Church Updates</h1>

            {/* Light Section not anymore*/}
            <section className="dark-section">
                <h2>Events</h2>
                <div className="card">
                    <h3>Sunday Worship Service</h3>
                    <small>Every Sunday at 12:30 PM</small>
                </div>
                <div className="card">
                    <h3>Prayer</h3>
                    <small>Everyday, 6:00 AM</small>
                </div>
                <div className="card">
                    <h3>Bible Study</h3>
                    <small>Bible study group meeting everyday.</small>
                </div>
            </section>

            {/* Dark Section */}
            <section className="dark-section">
                <h2>Announcements</h2>
                <div className="card">
                    <p>Special announcement for our church family:</p>

                    {/* YouTube Embed */}
                    <div className="video-wrapper">
                        <iframe
                            src="https://www.youtube.com/embed/1kszb3E_ge4"
                            title="Church Announcement Video"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Updates;
