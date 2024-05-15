import React from 'react';
import '../styles/Sidebar.css'; // Create a separate CSS file for the sidebar styles

const Sidebar = () => {
    return (
        <aside className="sidebar">
            <div className="logo">TSTC_PlayDash</div>
            <nav className="nav">
                <ul>
                    <li className="nav-item active">Home</li>
                    <li className="nav-item">Students</li>
                    <li className="nav-item">Classes</li>
                    <li className="nav-item">Records</li>
                    <li className="nav-item">Statistics</li>
                    <li className="nav-item">Settings</li>
                    <li className="nav-item">Staff Room</li>
                </ul>
            </nav>
            <div className="sign-out">Sign Out</div>
        </aside>
    );
};

export default Sidebar;
