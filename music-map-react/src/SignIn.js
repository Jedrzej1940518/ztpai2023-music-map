
import React, { useState, useEffect } from 'react';
import './SignIn.css';

const SignIn = ({ setShowLoginPanel, setShowRegisterPanel, setShowSignedIn, showSignedIn, userData, setUserData }) => {

    const [showSignOptions, setShowSignOptions] = useState(false);
    const [signedIn, setSignedIn] = useState(false);

    const userUtils = require('./userUtils');

    useEffect(() => {
        setSignedIn(userData);
        console.log(`useEffect ${userData}`);
    }, [userData]);

    return (
        <div className={`sign-in-container ${showSignedIn ? 'show' : ''}`} onMouseEnter={() => setShowSignOptions(true)} onMouseLeave={() => setShowSignOptions(false)}>
            {signedIn ?
                (
                    <>
                        <div className="header-text">Logged in as {userData.nickname}</div>
                        <div className={`sign-out-option ${showSignOptions ? 'show' : ''}`} onClick={() => {
                            console.log('Sign out clicked');
                            userUtils.removeTokenFromCookie();
                            setUserData(null);
                            setSignedIn(false);
                            setShowLoginPanel(false);
                        }}>
                            Sign out
                        </div>
                    </>
                ) : (
                    <>
                        <div className="header-text" onClick={() => {
                            console.log('Sign in clicked');
                            setShowLoginPanel(true);
                            setShowSignedIn(false)
                        }}> Sign in
                        </div>
                        <div className={`sign-out-option ${showSignOptions ? 'show' : ''}`} onClick={() => {
                            console.log('Register clicked');
                            setShowRegisterPanel(true);
                            setShowSignedIn(false);
                        }}> Register
                        </div>
                    </>
                )
            }
        </div>
    );
};

export default SignIn;
