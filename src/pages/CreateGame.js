import React, { useState } from 'react';
import axios from 'axios';
import config from '../Config';
import LoadingSpinner from '../components/LoadingSpinner';
import '../styles/CreateGame.css';

const CreateGame = () => {
    const [title, setTitle] = useState('');
    const [genre, setGenre] = useState('');
    const [variables, setVariables] = useState({});
    const [gameFiles, setGameFiles] = useState([]);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e) => {
        setGameFiles(e.target.files);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');
        if (!token) {
            setMessage('You need to be logged in to create a game.');
            return;
        }

        setLoading(true);

        const formData = new FormData();
        formData.append('title', title);
        formData.append('genre', genre);
        formData.append('variables', JSON.stringify(variables));
        Array.from(gameFiles).forEach(file => formData.append('gameFiles', file));

        try {
            const res = await axios.post(
                `${config.apiUrl}/games/create-game`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            setMessage('Game created successfully!');
            setTitle('');
            setGenre('');
            setVariables({});
            setGameFiles([]);
        } catch (err) {
            console.error('Error creating game:', err);
            setMessage('Failed to create game.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="create-game">
            <h2>Create Game</h2>
            {loading ? (
                <LoadingSpinner />
            ) : (
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Game Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Genre (optional)"
                        value={genre}
                        onChange={(e) => setGenre(e.target.value)}
                    />
                    <input
                        type="file"
                        webkitdirectory="true"
                        directory=""
                        onChange={handleFileChange}
                        multiple
                        required
                    />
                    <button type="submit">Create Game</button>
                </form>
            )}
            {message && <p>{message}</p>}
        </div>
    );
};

export default CreateGame;
