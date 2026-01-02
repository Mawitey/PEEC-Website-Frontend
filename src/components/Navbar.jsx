import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

function Navbar() {
    const [open, setOpen] = useState(false);
    const menuRef = useRef(null);

    // Close menu when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <nav className="navbar">
            <div className="logo">PEEC COLUBUS</div>
            {/*<div className="header"><h1>PEEC COLUMBUS</h1></div>*/}

            <ul className="nav-links">
                <li className="dropdown" ref={menuRef}>
                    <button
                        className="dropdown-button"
                        onClick={() => setOpen(!open)}
                    >
                        Menu ▾
                    </button>

                    {open && (
                        <ul className="dropdown-menu">
                            <li onClick={() => setOpen(false)}>
                                <Link to="/">Home</Link>
                            </li>
                            <li onClick={() => setOpen(false)}>
                                <Link to="/about">About</Link>
                            </li>
                            <li onClick={() => setOpen(false)}>
                                <Link to="/sermons">Sermons</Link>
                            </li>
                            <li onClick={() => setOpen(false)}>
                                <Link to="/updates">Updates</Link>
                            </li>
                            <li onClick={() => setOpen(false)}>
                                <Link to="/giving">Giving</Link>
                            </li>
                            <li onClick={() => setOpen(false)}>
                                <Link to="/contact">Contact</Link>
                            </li>
                        </ul>
                    )}
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;


