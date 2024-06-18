import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../Config';
import '../styles/MyGames.css';

const MyGames = () => {
    const [myGames, setMyGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            fetchMyGames(token);
        } else {
            setLoading(false);
        }
    }, []);

    const fetchMyGames = async (token) => {
        try {
            const res = await axios.get(`${config.apiUrl}/games/my-games`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setMyGames(res.data.games);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching my games:', err);
            setError('Failed to fetch my games');
            setLoading(false);
        }
    };

    const copyToClipboard = (url) => {
        navigator.clipboard.writeText(url).then(() => {
            alert('Game URL copied to clipboard');
        });
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
            {myGames.length > 0 ? (
                <div className="games-grid">
                    {myGames.map((game) => (
                        <div className="game-card" key={game._id}>
                            {game.image && <img src={game.image} alt={game.title} className="game-image" />}
                            <h3>{game.title}</h3>
                            {game.genre && <p>Genre: {game.genre}</p>}
                            <a href={game.url} target="_blank" rel="noopener noreferrer">
                                <button>Play Game</button>
                            </a>
                            <button onClick={() => copyToClipboard(game.url)}>Copy URL</button>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No games linked yet</p>
            )}
        </div>
    );
};

export default MyGames;
