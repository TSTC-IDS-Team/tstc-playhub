import React from 'react';
import '../styles/DashboardHeader.css'; // Create a separate CSS file for the header styles

const DashboardHeader = () => {
    return (
        <header className="header">
            <input type="search" placeholder="Search Class, Documents, Activities..." />
            <div className="user-info">
                <img src="user-avatar-url" alt="User Avatar" className="user-avatar" />
                <span>Ayodele Irepodun</span>
            </div>
        </header>
    );
};

export default DashboardHeader;
