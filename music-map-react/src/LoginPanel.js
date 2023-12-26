import React, { useState } from 'react';
import './LoginPanel.css';
import './Common.css';

const userUtils = require('./userUtils');
const config = require('./config');

const LoginPanel = ({ showLoginPanel, setShowLoginPanel, setShowSignedIn, setUserData }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState('');

    const setErrorMessage = (message) => {
        setError(message);
    };

    const handleSignIn = () => {
        const requestBody = {
            email: email,
            password: password
        };
        setErrorMessage('');
        fetch(config.singInApi, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        })
            .then(response => {
                if (!response.ok)
                    throw new Error(`HTTP error! Status: ${response.status}`);

                return response.json();
            })
            .then(data => {
                console.log('Sign in requested', data);
                if (!data.success)
                    setErrorMessage(data.message);
                else {
                    userUtils.storeTokenInCookie(data.token);
                    setUserData(data.user);
                    console.log(`Signed in as ${data.user.nickname} with token ${data.token}`);
                }
            })
            .catch(e => {
                console.error('Error signing in:', e);
                setErrorMessage(e.message || 'An error occurred');
            });

    };
    const handleMouseEnter = () => {
        setShowLoginPanel(true);
        setShowSignedIn(false);
        setErrorMessage('');
    }
    const handleMouseLeave = () => {
        setShowLoginPanel(false);
        setShowSignedIn(true);
        setErrorMessage('');
    }

    return (
        <div className={`login-panel ${showLoginPanel ? 'show' : ''}`} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <div className="menu-content">
                <input
                    type="text"
                    className="text-input"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    className="text-input"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className="button-style" onClick={handleSignIn}>
                    Sign In
                </button>
                {error && (
                    <div style={{ color: 'red' }}>
                        {error}
                    </div>
                )}
            </div>
        </div>
    );
};

export default LoginPanel;
