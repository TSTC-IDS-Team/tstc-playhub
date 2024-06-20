import React from 'react';
import { Route, Routes, useMatch } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import DashboardHeader from '../components/DashboardHeader';
import DashboardHome from './DashboardHome';
import MyGames from './MyGames';
import BrowseGames from './BrowseGames';
import Statistics from './Statistics';
import Settings from './Settings';
import CreateGame from './CreateGame';
import EditVariables from './EditVariables';  // Import the new component

import '../styles/InstructorDashboard.css';

const Dashboard = () => {
    const match = useMatch("/dashboard/*");

    return (
        <div className="dashboard">
            <Sidebar />
            <main className="main-content">
                <DashboardHeader />
                <Routes>
                    <Route path={`${match?.pathnameBase}/`} element={<DashboardHome />} />
                    <Route path={`${match?.pathnameBase}/my-games`} element={<MyGames />} />
                    <Route path={`${match?.pathnameBase}/browse-games`} element={<BrowseGames />} />
                    <Route path={`${match?.pathnameBase}/statistics`} element={<Statistics />} />
                    <Route path={`${match?.pathnameBase}/settings`} element={<Settings />} />
                    <Route path={`${match?.pathnameBase}/create-game`} element={<CreateGame />} />
                    <Route path={`${match?.pathnameBase}/edit-variables/:gameId`} element={<EditVariables />} /> {/* Add this line */}
                </Routes>
            </main>
        </div>
    );
};

export default Dashboard;
