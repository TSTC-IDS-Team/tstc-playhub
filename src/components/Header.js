import React from 'react';
import '../styles/Header.css'; // Import the CSS module
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="header">
            <div className="logo">
                <img src={process.env.PUBLIC_URL + "/images/tstcplayhub.png"} alt="TSTC Playhub Logo" />
                TSTC PLAYHUB
            </div>
            <nav className="nav">
                <Link to="/" className="navLink">Home</Link>
                <Link to="/services" className="navLink">Services</Link>
                <Link to="/faq" className="navLink">FAQ</Link>
                <Link to="/dashboard" className="navLink">DashBoard</Link>
                <button className="signUpButton">Sign Up</button>
            </nav>
        </header>
    );
};

export default Header;
