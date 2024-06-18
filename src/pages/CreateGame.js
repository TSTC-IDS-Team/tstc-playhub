import React, { useState } from 'react';
import axios from 'axios';
import config from '../Config';
import LoadingSpinner from '../components/LoadingSpinner';
import '../styles/CreateGame.css';

const CreateGame = () => {
    const [title, setTitle] = useState('');
    const [genre, setGenre] = useState('');
    const [engineType, setEngineType] = useState('unity');
    const [variables, setVariables] = useState([{ key: '', value: '' }]);
    const [gameFiles, setGameFiles] = useState([]);
    const [imageFile, setImageFile] = useState(null); // New state for image file
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        const rootFolderName = files[0]?.webkitRelativePath?.split('/')[0]; // Get root folder name

        const filesWithPaths = files.map(file => {
            let relativePath = file.webkitRelativePath || file.name;
            if (rootFolderName) {
                relativePath = relativePath.replace(`${rootFolderName}/`, ''); // Remove root folder name
            }
            return { file, relativePath };
        });
        setGameFiles(filesWithPaths);
    };

    const handleImageChange = (e) => {
        setImageFile(e.target.files[0]);
    };

    const handleAddVariable = () => {
        setVariables([...variables, { key: '', value: '' }]);
    };

    const handleRemoveVariable = (index) => {
        const newVariables = variables.filter((_, i) => i !== index);
        setVariables(newVariables);
    };

    const handleVariableChange = (index, e) => {
        const { name, value } = e.target;
        const newVariables = [...variables];
        newVariables[index][name] = value;
        setVariables(newVariables);
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
        formData.append('engineType', engineType);
        formData.append('variables', JSON.stringify(variables.reduce((acc, curr) => {
            acc[curr.key] = curr.value;
            return acc;
        }, {})));
        gameFiles.forEach(({ file, relativePath }) => {
            formData.append('gameFiles', file);
            formData.append('relativePaths', relativePath); // Append the relative path as a separate field
        });

        if (imageFile) {
            formData.append('imageFile', imageFile); // Append the image file to the form data
        }

        console.log('Form Data:', {
            title,
            genre,
            engineType,
            variables: JSON.stringify(variables.reduce((acc, curr) => {
                acc[curr.key] = curr.value;
                return acc;
            }, {})),
            gameFiles,
            imageFile
        });

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
            setEngineType('unity');
            setVariables([{ key: '', value: '' }]);
            setGameFiles([]);
            setImageFile(null); // Reset image file state
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
                    <select value={engineType} onChange={(e) => setEngineType(e.target.value)} required>
                        <option value="unity">Unity</option>
                        <option value="unreal">Unreal</option>
                        <option value="construct3">Construct 3</option>
                    </select>
                    <label htmlFor="gameFiles">Game Files</label>
                    <input
                        type="file"
                        webkitdirectory="true"
                        directory=""
                        onChange={handleFileChange}
                        multiple
                        required
                    />
                    <div className="variables-section">
                        <h4>Variables</h4>
                        {variables.map((variable, index) => (
                            <div key={index} className="variable">
                                <input
                                    type="text"
                                    placeholder="Key"
                                    name="key"
                                    value={variable.key}
                                    onChange={(e) => handleVariableChange(index, e)}
                                    required
                                />
                                <input
                                    type="text"
                                    placeholder="Value"
                                    name="value"
                                    value={variable.value}
                                    onChange={(e) => handleVariableChange(index, e)}
                                    required
                                />
                                <button type="button" onClick={() => handleRemoveVariable(index)}>Remove</button>
                            </div>
                        ))}
                        <button type="button" onClick={handleAddVariable}>Add Variable</button>
                    </div>
                    <label htmlFor="imageFile">Title Image</label>
                    <input
                        type="file"
                        onChange={handleImageChange}
                        accept="image/*"
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
