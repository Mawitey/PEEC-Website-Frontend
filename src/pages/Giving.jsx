function Giving() {
    return (
        <div className="page-container">
            <h1>Giving</h1>

            <section className="dark-section">
                <div className="card">
                    <h3>Online Giving</h3>
                    <ul>
                        {/*<li>Secure online donation form</li>*/}
                        <li>One-time or recurring donations. Zelle - peecc2010@gmail.com</li>
                    </ul>
                </div>

                <div className="card">
                    <h3>In-Person Giving</h3>
                    <ul>
                        <li>During Sunday service</li>
                        {/*<li>Drop your offering in the collection box</li>*/}
                    </ul>
                </div>
            </section>
        </div>
    );
}

export default Giving;
