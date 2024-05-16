import React, {useEffect, useState} from 'react';
import '../styles/DashboardHeader.css';
import axios from "axios";
import config from "../Config"; // Create a separate CSS file for the header styles

const DashboardHeader = ({ userName, userImage }) => {
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
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(res);
            setUserInfo(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <header className="header">
            <input type="search" placeholder="Search Class, Documents, Activities..." />
            <div className="user-info">
                {userImage && <img src={userImage} alt="User Avatar" className="user-avatar" />}
                <span>{userName}</span>
            </div>
        </header>
    );
};

export default DashboardHeader;
