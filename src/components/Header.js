import React from 'react';
import styles from '../styles/Header.css'; // Import the CSS module

const Header = () => {
    return (
        <header className="header">
            <div className="logo">
                <img src="/images/tstcplayhub.png" alt="TSTC Playhub Logo" />
                TSTC PLAYHUB
            </div>
            <nav className="nav">
                <a href="/" className="navLink">Home</a>
                <a href="/services" className="navLink">Services</a>
                <a href="/faq" className="navLink">FAQ</a>
                <a href="/contact" className="navLink">Contact</a>
                <button className="signUpButton">Sign Up</button>
            </nav>
        </header>
    );
}

export default Header;
