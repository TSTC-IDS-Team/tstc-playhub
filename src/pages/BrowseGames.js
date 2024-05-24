import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LoadingSpinner from '../components/LoadingSpinner';
import '../styles/BrowseGames.css';

const BrowseGames = () => {
    const [allGames, setAllGames] = useState([]);
    const [userGames, setUserGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [processingGameId, setProcessingGameId] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            fetchGames();
            fetchUserGames(token);
        } else {
            setLoading(false);
        }
    }, []);

    const fetchGames = async () => {
        try {
            const res = await axios.get('https://tstc-playhub-backend.onrender.com/api/games');
            setAllGames(res.data);
        } catch (err) {
            console.error('Error fetching games:', err);
            setError('Failed to fetch games');
        }
    };

    const fetchUserGames = async (token) => {
        try {
            const res = await axios.get('https://tstc-playhub-backend.onrender.com/api/games/my-games', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setUserGames(res.data.games);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching user games:', err);
            setError('Failed to fetch user games');
            setLoading(false);
        }
    };

    const linkGame = async (gameId, engineType) => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('You need to be logged in to link a game.');
            return;
        }

        try {
            setProcessingGameId(gameId);
            const endpoint = engineType === 'unity' ? 'link-game-unity' : 'link-game-unreal';
            const res = await axios.post(
                `https://tstc-playhub-backend.onrender.com/api/games/${endpoint}`,
                { gameId },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            alert('Game linked successfully!');
            fetchUserGames(token); // Refresh the user's games list
        } catch (err) {
            console.error('Error linking game:', err);
            alert('Failed to link game.');
        } finally {
            setProcessingGameId(null);
        }
    };

    const unlinkGame = async (gameId) => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('You need to be logged in to unlink a game.');
            return;
        }

        try {
            setProcessingGameId(gameId);
            const res = await axios.post(
                'https://tstc-playhub-backend.onrender.com/api/games/unlink',
                { gameId },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            alert('Game unlinked successfully!');
            fetchUserGames(token); // Refresh the user's games list
        } catch (err) {
            console.error('Error unlinking game:', err);
            alert('Failed to unlink game.');
        } finally {
            setProcessingGameId(null);
        }
    };

    const isGameLinked = (gameId) => {
        return userGames.some(game => game._id === gameId);
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="browse-games">
            <h2>Browse Games</h2>
            {allGames.length > 0 ? (
                <div className="games-grid">
                    {allGames.map((game) => (
                        <div className="game-card" key={game._id}>
                            <h3>{game.title}</h3>
                            {game.genre && <p>Genre: {game.genre}</p>}
                            <a href={game.url} target="_blank" rel="noopener noreferrer">
                                <button>Play Game</button>
                            </a>
                            {isGameLinked(game._id) ? (
                                <button
                                    onClick={() => unlinkGame(game._id)}
                                    disabled={processingGameId === game._id}
                                >
                                    {processingGameId === game._id ? 'Processing...' : 'Unlink Game'}
                                </button>
                            ) : (
                                <button
                                    onClick={() => linkGame(game._id, game.engineType)} // Pass the engine type
                                    disabled={processingGameId === game._id}
                                >
                                    {processingGameId === game._id ? 'Processing...' : 'Link Game'}
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <p>No games available</p>
            )}
        </div>
    );
};

export default BrowseGames;
