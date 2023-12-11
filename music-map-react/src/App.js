import React, { useState } from 'react';
import HamburgerMenu from './HamburgerMenu';

import './App.css';

const App = () => {

  const [showSignOut, setShowSignOut] = useState(false);

  return (
    <div>
      <div className="header-container">
        <div className="left-section">
          <HamburgerMenu />
          <div className="header-text">Music-Map</div>
        </div>
        <div className="sign-in-container" onMouseEnter={() => setShowSignOut(true)} onMouseLeave={() => setShowSignOut(false)}>
          <div className="header-text">Logged in as X</div>
          <div className={`sign-out-option ${showSignOut ? 'show' : ''}`} onClick={() => console.log('Sign out clicked')}>
            Sign out
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
