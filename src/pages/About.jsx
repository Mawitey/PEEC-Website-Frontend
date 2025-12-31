function About() {
    return (
        <>

            <section className="dark-section page-container">
                <h1>About Us</h1>

                <h2>Our Location</h2>

                <div style={{width: "100%", height: "350px", borderRadius: "12px", overflow: "hidden"}}>
                    <iframe
                        title="Church Location"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d97730.01836957318!2d-82.96823176093748!3d40.05169333219518!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8838647f081b0a85%3A0x2f7957d158dbf5fb!2sThe%20Cross%20Walk%20Church!5e0!3m2!1sen!2sus!4v1767201921284!5m2!1sen!2sus"
                        width="600" height="450" style="border:0;" allowFullScreen="" loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        width="100%"
                        height="350"
                        style={{border: 0}}
                        //allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                </div>

                <div>
                <h3>Our Vision</h3>
                    <p>
                        To spread the love of Jesus and make disciples in every neighborhood.
                    </p>
                </div>
            </section>

            <section className="page-container">
                <h2>Our History</h2>
                <p>
                    Our church has grown to serve hundreds of families in
                    the community, providing worship, fellowship, and service programs.
                </p>
            </section>


        </>
    );
}

export default About;
