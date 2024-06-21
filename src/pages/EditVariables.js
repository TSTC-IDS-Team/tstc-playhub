import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../Config';
import { useParams } from 'react-router-dom';
import '../styles/EditVariables.css';

const EditVariables = () => {
    const { gameId } = useParams(); // Ensure this is the correct _id
    const [variables, setVariables] = useState({});
    const [id, setId] = useState(""); // Correct initialization
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const userData = getUserData();
        if (userData) {
            // Find the game with the matching _id field
            const game = userData.games.find(gameEntry => gameEntry.game === gameId);
            if (game) {
                setId(game._id);
                console.log(id);
                setVariables(game.variables || {});
                setLoading(false);
            } else {
                setError('Game not found');
                setLoading(false);
            }
        } else {
            setError('User data not found');
            setLoading(false);
        }
    }, [gameId]);

    const getUserData = () => {
        const data = localStorage.getItem('userInfo');
        return data ? JSON.parse(data) : null;
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
            for (const [key, value] of Object.entries(variables)) {
                await axios.post(`${config.apiUrl}/games/games/${id}/variables`, { key, value }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
            }
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
