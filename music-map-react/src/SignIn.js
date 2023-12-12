
import React, { useState } from 'react';
import './SignIn.css';

const SignIn = ({ setShowLoginMenu, setShowSignedIn, showSignedIn }) => {

    const [showSignOptions, setShowSignOptions] = useState(false);
    const [signedIn, setSignedIn] = useState(false);

    return (
        <div className={`sign-in-container ${showSignedIn ? 'show' : ''}`} onMouseEnter={() => setShowSignOptions(true)} onMouseLeave={() => setShowSignOptions(false)}>
            {signedIn ?
                (
                    <>
                        <div className="header-text">Logged in as X</div>
                        <div className={`sign-out-option ${showSignOptions ? 'show' : ''}`} onClick={() => {
                            console.log('Sign out clicked');
                            setSignedIn(false);
                            setShowLoginMenu(false);
                        }}>
                            Sign out
                        </div>
                    </>
                ) : (
                    <>
                        <div className="header-text" onClick={() => {
                            console.log('Sign in clicked');
                            setSignedIn(true);
                            setShowLoginMenu(true);
                            setShowSignedIn(false)
                        }}> Sign in
                        </div>
                        <div className={`sign-out-option ${showSignOptions ? 'show' : ''}`} onClick={() => {
                            console.log('Register clicked');
                            setSignedIn(true);
                        }}> Register
                        </div>
                    </>
                )
            }
        </div>
    );
};

export default SignIn;
