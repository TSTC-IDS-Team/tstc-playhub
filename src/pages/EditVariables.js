import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../Config';
import { useParams } from 'react-router-dom';
import '../styles/EditVariables.css';

const EditVariables = () => {
    const { gameId } = useParams();
    const [variables, setVariables] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            fetchGameVariables(token);
        } else {
            setLoading(false);
        }
    }, []);

    const fetchGameVariables = async (token) => {
        try {
            const res = await axios.get(`${config.apiUrl}/games/${gameId}/variables`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setVariables(res.data.variables);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching game variables:', err);
            setError('Failed to fetch game variables');
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setVariables({
            ...variables,
            [e.target.name]: e.target.value,
        });
    };

    const handleSave = async () => {
        const token = localStorage.getItem('token');
        try {
            await axios.put(`${config.apiUrl}/games/${gameId}/variables`, variables, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            alert('Variables updated successfully');
        } catch (err) {
            console.error('Error updating variables:', err);
            setError('Failed to update variables');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="edit-variables">
            <h2>Edit Variables for {gameId}</h2>
            <div className="variables-form">
                {Object.keys(variables).map((key) => (
                    <div key={key} className="variable-field">
                        <label htmlFor={key}>{key}</label>
                        <input
                            type="text"
                            name={key}
                            id={key}
                            value={variables[key]}
                            onChange={handleChange}
                        />
                    </div>
                ))}
                <button onClick={handleSave}>Save Variables</button>
            </div>
        </div>
    );
};

export default EditVariables;
