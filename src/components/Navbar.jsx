import { Link } from 'react-router-dom'

function Navbar() {
    return (
        <nav className="navbar">
            <h2>Philadelphia Eritrean Evangelical Church</h2>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/sermons">Sermons</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/updates">Updates</Link></li>
                <li><Link to="/giving">Giving</Link></li>
                <li><Link to="/contact">Contact</Link></li>
            </ul>
        </nav>
    )
}

export default Navbar
