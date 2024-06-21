import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../Config';
import '../styles/DashboardHome.css';

const DashboardHome = () => {
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const storedUserInfo = getUserData();
            if (storedUserInfo) {
                setUserInfo(storedUserInfo);
            } else {
                fetchAndStoreUserData(token).then((data) => {
                    if (data) {
                        setUserInfo(data);
                    }
                });
            }
        }
    }, []);

    const fetchUserInfo = async (token) => {
        try {
            const res = await axios.get(`${config.apiUrl}/auth/user`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(res);
            localStorage.setItem('userInfo', JSON.stringify(res.data));
            setUserInfo(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const storeUserData = (userData) => {
        localStorage.setItem('userInfo', JSON.stringify(userData));
    };

    const getUserData = () => {
        const data = localStorage.getItem('userInfo');
        return data ? JSON.parse(data) : null;
    };

    const fetchAndStoreUserData = async (token) => {
        try {
            const res = await axios.get(`${config.apiUrl}/auth/user`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            storeUserData(res.data);
            return res.data;
        } catch (err) {
            console.error('Error fetching user data:', err);
            return null;
        }
    };

    return (
        <div className="dashboard-home">
            <section className="welcome-section">
                {userInfo && (
                    <>
                        <h2>Welcome back, {userInfo.userName}</h2>
                        <p>You have 27 new students added to your domain. Please reach out to the Head Teacher if you want them excluded from your domain.</p>
                    </>
                )}
            </section>
            {/* Other dashboard content */}
        </div>
    );
};

export default DashboardHome;
