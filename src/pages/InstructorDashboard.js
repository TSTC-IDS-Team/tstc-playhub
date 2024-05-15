import React from 'react';
import Sidebar from '../components/Sidebar';

import '../styles/InstructorDashboard.css';
import DashboardHeader from "../components/DashboardHeader";
import DashboardHome from "./DashboardHome"; // Ensure this file contains the styles for the main content area

const Dashboard = () => {
    return (
        <div className="dashboard">
            <Sidebar />
            <main className="main-content">
                <DashboardHeader />
                <DashboardHome />
            </main>
        </div>
    );
};

export default Dashboard;
