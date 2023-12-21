import React, { useState } from 'react';
import './LoginPanel.css';
import './Common.css';

const config = require('./config');

const LoginPanel = ({ showLoginPanel, setShowLoginPanel, setShowSignedIn }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignIn = () => {
        const requestBody = {
            email: email,
            password: password
        };
        fetch(config.singInApi, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log('Sign in successful:', data);
            })
            .catch(error => {
                console.error('Error signing in:', error);
            });
        console.log('Signing in with:', email, password);
    };
    const handleMouseEnter = () => {
        setShowLoginPanel(true);
        setShowSignedIn(false);
    }
    const handleMouseLeave = () => {
        setShowLoginPanel(false);
        setShowSignedIn(true)
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
            </div>
        </div>
    );
};

export default LoginPanel;
