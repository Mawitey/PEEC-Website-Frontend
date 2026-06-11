// import { FaFacebook, FaYoutube } from "react-icons/fa";
//
// function Footer() {
//     return (
//         <footer className="footer">
//             <p>© PEEC Columbus Ohio. All rights reserved.</p>
//
//             <div className="footer-links">
//                 <a
//                     href="https://www.facebook.com/phila.eri"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     aria-label="Facebook"
//                 >
//                     <FaFacebook />
//                 </a>
//
//                 <a
//                     href="https://www.youtube.com/@philadelphiaevangelicaleri8291"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     aria-label="YouTube"
//                 >
//                     <FaYoutube />
//                 </a>
//             </div>
//         </footer>
//     );
// }
//
// export default Footer;
//

import {
  FaFacebook,
  FaYoutube,
  FaInstagram,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer-modern">

      <div className="footer-grid">

        <div>
          <h3>Philadelphia Evangelical Eritrean Church</h3>

          <p>
            Building Faith. Strengthening Families.
            Transforming Lives.
          </p>

          <div className="footer-socials">
            <a
              href="https://www.facebook.com/phila.eri"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook />
            </a>

            <a
              href="https://www.youtube.com/@philadelphiaevangelicaleri8291"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaYoutube />
            </a>

          </div>
        </div>

        <div>
          <h4>Quick Links</h4>

          <ul>
            <li><a href="/about">About Us</a></li>
            <li><a href="/updates">Events</a></li>
            <li><a href="/sermons">Media</a></li>
            <li><a href="/giving">Building Fund</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        <div>
          <h4>Contact Us</h4>

          <p>
            <FaMapMarkerAlt /> 751 Rosehill Rd,
            Reynoldsburg, OH 43068
          </p>

          <p>
            <FaPhone /> (614) 596-3132
          </p>

        </div>

        <div>
          <h4>Service Times</h4>

          <p>Sunday Worship</p>
          <p>12:30 PM - 3:00 PM</p>

          <br />

        </div>

      </div>

      <div className="footer-bottom">
        © 2026 Philadelphia Evangelical Eritrean Church.
        All rights reserved.
      </div>

    </footer>
  );
}

export default Footer;