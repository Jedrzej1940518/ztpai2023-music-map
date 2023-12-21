
import React, { useState } from 'react';
import './SignIn.css';

const SignIn = ({ setShowLoginPanel, setShowRegisterPanel, setShowSignedIn, showSignedIn }) => {

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
                            //setSignedIn(false);
                            setShowLoginPanel(false);
                        }}>
                            Sign out
                        </div>
                    </>
                ) : (
                    <>
                        <div className="header-text" onClick={() => {
                            console.log('Sign in clicked');
                            //setSignedIn(true);
                            setShowLoginPanel(true);
                            setShowSignedIn(false)
                        }}> Sign in
                        </div>
                        <div className={`sign-out-option ${showSignOptions ? 'show' : ''}`} onClick={() => {
                            console.log('Register clicked');
                            setShowRegisterPanel(true);
                            //setSignedIn(true);
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
