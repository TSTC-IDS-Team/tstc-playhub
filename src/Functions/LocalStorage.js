import axios from 'axios';
import config from '../Config';


export const storeUserData = (userData) => {
    localStorage.setItem('userData', JSON.stringify(userData));
};

export const getUserData = () => {
    const data = localStorage.getItem('userData');
    return data ? JSON.parse(data) : null;
};

export const fetchAndStoreUserData = async () => {
    const token = localStorage.getItem('token');
    try {
        const res = await axios.get(`${config.apiUrl}/user`, {
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
