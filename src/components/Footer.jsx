import { FaFacebook, FaYoutube } from "react-icons/fa";

function Footer() {
    return (
        <footer className="footer">
            <p>© PEEC. All rights reserved.</p>

            <div className="footer-links">
                <a
                    href="https://www.facebook.com/phila.eri"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                >
                    <FaFacebook />
                </a>

                <a
                    href="https://www.youtube.com/@philadelphiaevangelicaleri8291"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="YouTube"
                >
                    <FaYoutube />
                </a>
            </div>
        </footer>
    );
}

export default Footer;

