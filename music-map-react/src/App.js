import React, { useState } from 'react';
import HamburgerMenu from './HamburgerMenu';
import SignIn from './SignIn'
import LoginMenu from './LoginMenu';

import './App.css';
import './Common.css';

const App = () => {

  const [showLoginMenu, setShowLoginMenu] = useState(false);
  const [showSignedIn, setShowSignedIn] = useState(true);

  return (
    <div>
      <div className="header-container">
        <div className="left-section">
          <HamburgerMenu />
          <div className="header-text">Music-Map</div>
        </div>
        <SignIn setShowLoginMenu={setShowLoginMenu} setShowSignedIn={setShowSignedIn} showSignedIn={showSignedIn} /> { }
      </div>
      <LoginMenu showLoginMenu={showLoginMenu} setShowLoginMenu={setShowLoginMenu} setShowSignedIn={setShowSignedIn} />
    </div>
  );
};

export default App;
