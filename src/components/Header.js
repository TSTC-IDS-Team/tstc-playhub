﻿import React, { useState, useEffect } from 'react';
import '../styles/Header.css'; // Import the CSS module
import { Link } from 'react-router-dom';
import Modal from './Modal';
import SignIn from './SignIn'; // Ensure this is correctly imported

const Header = () => {
    const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);

    const openSignInModal = () => {
        setIsSignInModalOpen(true);
    };

    const closeSignInModal = () => {
        setIsSignInModalOpen(false);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
    };

    return (
        <header className="header">
            <div className="logo">
                <img src={process.env.PUBLIC_URL + "/images/tstcplayhub.png"} alt="TSTC Playhub Logo" />
                TSTC PLAYHUB
            </div>
            <nav className="nav">
                <Link to="/" className="navLink">Home</Link>
                <Link to="/faq" className="navLink">FAQ</Link>
                {isAuthenticated && <Link to="/dashboard" className="navLink">Dashboard</Link>}
                {isAuthenticated ? (
                    <button className="logoutButton" onClick={handleLogout}>Logout</button>
                ) : (
                    <button className="signInButton" onClick={openSignInModal}>Sign In</button>
                )}
            </nav>
            <Modal isShowing={isSignInModalOpen} hide={closeSignInModal}>
                <SignIn closeModal={closeSignInModal} setAuth={setIsAuthenticated} />
            </Modal>
        </header>
    );
};

export default Header;
