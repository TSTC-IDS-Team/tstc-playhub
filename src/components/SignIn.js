import React, { useState } from 'react';
import axios from 'axios';
import '../styles/SignIn.css';
import SignUp from './SignUp'; // Ensure this is correctly imported
import config from '../Config'; // Import config

const SignIn = ({ closeModal, setAuth }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [showSignUp, setShowSignUp] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${config.apiUrl}/auth/signin`, { email, password });
            setMessage('Sign-in successful!');
            localStorage.setItem('token', res.data.token); // Store token in local storage
            setAuth(true); // Update authentication status
            closeModal();
        } catch (err) {
            setMessage('Sign-in failed!');
            console.error(err);
        }
    };

    if (showSignUp) {
        return <SignUp />;
    }

    return (
        <div className="signin-container">
            <h2>Sign In</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Sign In</button>
            </form>
            {message && <p>{message}</p>}
            <button onClick={() => setShowSignUp(true)} className="signUpLink">
                Don't have an account? Sign Up
            </button>
        </div>
    );
};

export default SignIn;
