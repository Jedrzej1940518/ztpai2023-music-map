import React, { useState } from 'react';
import HamburgerMenu from './HamburgerMenu';
import SignIn from './SignIn'
import LoginPanel from './LoginPanel';
import RegisterPanel from './RegisterPanel';

import './App.css';
import './Common.css';

const App = () => {

  const [showLoginPanel, setShowLoginPanel] = useState(false);
  const [showRegisterPanel, setShowRegisterPanel] = useState(false);
  const [showSignedIn, setShowSignedIn] = useState(true);

  return (
    <div>
      <div className="header-container">
        <div className="left-section">
          <HamburgerMenu />
          <div className="header-text">Music-Map</div>
        </div>
        <SignIn setShowLoginPanel={setShowLoginPanel} setShowRegisterPanel={setShowRegisterPanel} setShowSignedIn={setShowSignedIn} showSignedIn={showSignedIn} /> { }
      </div>
      <RegisterPanel showRegisterPanel={showRegisterPanel} setShowRegisterPanel={setShowRegisterPanel} setShowSignedIn={setShowSignedIn} />
      <LoginPanel showLoginPanel={showLoginPanel} setShowLoginPanel={setShowLoginPanel} setShowSignedIn={setShowSignedIn} />
    </div>
  );
};

export default App;
