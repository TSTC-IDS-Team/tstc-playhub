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
            setError('You must be logged in to view games.');
        }
    }, []);

    const fetchGames = async () => {
        setLoading(true);
        try {
            const res = await axios.get('https://tstc-playhub-backend.onrender.com/api/games');
            setAllGames(res.data);
        } catch (err) {
            console.error('Error fetching games:', err);
            setError('Failed to fetch games');
        } finally {
            setLoading(false);
        }
    };

    const fetchUserGames = async (token) => {
        setLoading(true);
        try {
            const res = await axios.get('https://tstc-playhub-backend.onrender.com/api/games/my-games', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUserGames(res.data.games);
        } catch (err) {
            console.error('Error fetching user games:', err);
            setError('Failed to fetch user games');
        } finally {
            setLoading(false);
        }
    };

    const handleLinkUnlinkGame = async (gameId, engineType, isLinking) => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('You need to be logged in to modify game links.');
            return;
        }

        const action = isLinking ? 'link' : 'unlink';
        if (!window.confirm(`Are you sure you want to ${action} this game?`)) {
            return;
        }

        setProcessingGameId(gameId);

        try {
            await axios.post(
                'https://tstc-playhub-backend.onrender.com/api/games/link', // Consolidated endpoint for linking and unlinking
                {
                    gameId,
                    link: isLinking, // true for linking, false for unlinking
                    engineType // Include engine type if necessary for the backend logic
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            alert(`Game ${action}ed successfully!`);
            fetchUserGames(token); // Refresh the user's games list
        } catch (err) {
            console.error(`Error ${action}ing game:`, err);
            alert(`Failed to ${action} game.`);
        } finally {
            setProcessingGameId(null);
        }
    };

    const isGameLinked = (gameId) => userGames.some((game) => game._id === gameId);

    if (loading) return <LoadingSpinner />;
    if (error) return <div className="error-message">{error}</div>;

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
                                    onClick={() => handleLinkUnlinkGame(game._id, game.engineType, false)}
                                    disabled={processingGameId === game._id}
                                >
                                    {processingGameId === game._id ? 'Processing...' : 'Unlink Game'}
                                </button>
                            ) : (
                                <button
                                    onClick={() => handleLinkUnlinkGame(game._id, game.engineType, true)}
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
