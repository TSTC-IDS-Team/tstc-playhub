import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Sidebar.css';

const Sidebar = () => {
    return (
        <aside className="sidebar">
            <div className="logo">TSTC_PlayDash</div>
            <nav className="nav">
                <ul>
                    <li className="nav-item">
                        <Link to="/dashboard">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/dashboard/my-games">My Games</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/dashboard/browse-games">Browse Games</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/dashboard/statistics">Statistics</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/dashboard/settings">Settings</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/dashboard/create-game">Create Game</Link>
                    </li>
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;
