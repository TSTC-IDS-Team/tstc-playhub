import React from 'react';
import { Link, useMatch } from 'react-router-dom';
import '../styles/Sidebar.css';

const Sidebar = () => {
    const match = useMatch("/dashboard/*");

    return (
        <aside className="sidebar">
            <div className="logo">TSTC_PlayDash</div>
            <nav className="nav">
                <ul>
                    <li className={`nav-item ${match?.pathname === "/dashboard/" ? 'active' : ''}`}>
                        <Link to="/dashboard/">Home</Link>
                    </li>
                    <li className={`nav-item ${match?.pathname === "/dashboard/my-games" ? 'active' : ''}`}>
                        <Link to="/dashboard/my-games">My Games</Link>
                    </li>
                    <li className={`nav-item ${match?.pathname === "/dashboard/browse-games" ? 'active' : ''}`}>
                        <Link to="/dashboard/browse-games">Browse Games</Link>
                    </li>
                    <li className={`nav-item ${match?.pathname === "/dashboard/statistics" ? 'active' : ''}`}>
                        <Link to="/dashboard/statistics">Statistics</Link>
                    </li>
                    <li className={`nav-item ${match?.pathname === "/dashboard/settings" ? 'active' : ''}`}>
                        <Link to="/dashboard/settings">Settings</Link>
                    </li>
                    <li className={`nav-item ${match?.pathname === "/dashboard/logout" ? 'active' : ''}`}>
                        <Link to="/dashboard/logout">Logout</Link>
                    </li>
                </ul>
            </nav>
            <div className="sign-out">Sign Out</div>
        </aside>
    );
};

export default Sidebar;
