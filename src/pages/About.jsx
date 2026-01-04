function About() {
    return (
        <>
            <div className="page-container">
                <h1 className="page-title">About Us</h1>
            </div>

            <section className="dark-section">
                {/*<div className="page-container">*/}
                    <h2>Our Vision</h2>
                    <p>
                        To spread the love of Jesus and make disciples in every neighborhood.
                    </p>
                {/*</div>*/}
            </section>

            <section>
                <div className="page-container">
                    <h2>Our Mission</h2>
                    <p>
                        We are a Christ-centered church dedicated to worship, discipleship,
                        and community service.
                    </p>
                </div>
            </section>

            <section className="dark-section">
                {/*<div className="page-container">*/}
                    <h2>Our History</h2>
                    <p>
                        Our church has grown to serve hundreds of families in
                        the community, providing worship, fellowship, and service programs.
                    </p>
                {/*</div>*/}
            </section>
        </>
    );
}

export default About;
