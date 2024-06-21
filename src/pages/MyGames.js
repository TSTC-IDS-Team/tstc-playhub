import React, { useEffect, useState } from 'react';
import '../styles/MyGames.css';
import { useNavigate } from 'react-router-dom';

const MyGames = () => {
    const [myGames, setMyGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const userData = getUserData();
        console.log('UserData:', userData);  // Debug log to see the structure of userData
        if (userData) {
            const games = userData.games.filter(gameEntry => gameEntry.game);  // Filter out entries with only _id
            setMyGames(games);
            setLoading(false);
        } else {
            setError('User data not found');
            setLoading(false);
        }
    }, []);

    const getUserData = () => {
        const data = localStorage.getItem('userInfo');
        return data ? JSON.parse(data) : null;
    };

    const copyToClipboard = (url) => {
        navigator.clipboard.writeText(url).then(() => {
            alert('Game URL copied to clipboard');
        });
    };

    const handleEditVariables = (gameId) => {
        console.log(`Navigating to edit variables for gameId: ${gameId}`);  // Debug log
        navigate(`/dashboard/edit-variables/${gameId}`);
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
                    {myGames.map((gameEntry) => {
                        const gameId = gameEntry.game;  // Extract the game ID
                        const gameUrl = gameEntry.url;  // Extract the URL
                        const gameTitle = gameEntry.variables?.WelcomeTitle || 'Untitled Game';  // Extract title from variables with fallback

                        return (
                            <div className="game-card" key={gameId}>
                                <h3>{gameTitle}</h3>
                                <a href={gameUrl} target="_blank" rel="noopener noreferrer">
                                    <button>Play Game</button>
                                </a>
                                <button onClick={() => copyToClipboard(gameUrl)}>Copy URL</button>
                                <button onClick={() => handleEditVariables(gameId)}>Edit Variables</button>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <p>No games linked yet</p>
            )}
        </div>
    );
};

export default MyGames;

