import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../Config';
import '../styles/MyGames.css';

const MyGames = () => {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            fetchGames(token);
        }
    }, []);

    const fetchGames = async (token) => {
        try {
            const res = await axios.get('https://tstc-playhub-backend.onrender.com/api/games/my-games', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setGames(res.data.games);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching games:', err);
            setError('Failed to fetch games');
            setLoading(false);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="my-games">
            <h2>My Games</h2>
            {games.length > 0 ? (
                <ul>
                    {games.map((game) => (
                        <li key={game._id}>
                            <h3>{game.title}</h3>
                            {game.genre && <p>Genre: {game.genre}</p>}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No games available</p>
            )}
        </div>
    );
};

export default MyGames;
