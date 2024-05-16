import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../Config';
import '../styles/DashboardHome.css';

const DashboardHome = () => {
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            fetchUserInfo(token);
        }
    }, []);

    const fetchUserInfo = async (token) => {
        try {
            const res = await axios.get(`${config.apiUrl}/auth/user`, {
                headers: {
                    'x-auth-token': token,
                },
            });
            setUserInfo(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="dashboard-home">
            <section className="welcome-section">
                {userInfo && (
                    <>
                        <h2>Welcome back, {userInfo.firstName} {userInfo.lastName}</h2>
                        <p>You have 27 new students added to your domain. Please reach out to the Head Teacher if you want them excluded from your domain.</p>
                    </>
                )}
            </section>
            {/* Other dashboard content */}
        </div>
    );
};

export default DashboardHome;
