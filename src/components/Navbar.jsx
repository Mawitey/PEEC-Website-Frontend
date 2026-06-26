import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../images/LogoT.webp";

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="navbar-modern">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <img src={logo} alt="PEEC Logo" className="navbar-logo" />
          <div className="navbar-title">
            <span>Philadelphia Eritrean</span>
            <span>Evangelical Church</span>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="navbar-links desktop-links">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/updates">Events</Link>
          <Link to="/sermons">Media</Link>
          <Link to="/giving">Building Fund</Link>
          <Link to="/contact">Contact</Link>
        </div>

        {/* Mobile Button */}
        <button
          className="menu-btn"
          onClick={() => setOpen(!open)}
        >
          ☰ Menu
        </button>

        {/* Mobile Dropdown */}
        {open && (
          <div className="mobile-menu">
            <Link to="/" onClick={() => setOpen(false)}>Home</Link>
            <Link to="/about" onClick={() => setOpen(false)}>About</Link>
            <Link to="/updates" onClick={() => setOpen(false)}>Events</Link>
            <Link to="/sermons" onClick={() => setOpen(false)}>Media</Link>
            <Link to="/giving" onClick={() => setOpen(false)}>Building Fund</Link>
            <Link to="/contact" onClick={() => setOpen(false)}>Contact</Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;