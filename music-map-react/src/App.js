import React, { useState, useEffect } from 'react'
import HamburgerMenu from './left-panel/HamburgerMenu'
import GenreComponent from './left-panel/GenreComponent'
import SignIn from './right-panel/SignIn'
import LoginPanel from './right-panel/LoginPanel'
import RegisterPanel from './right-panel/RegisterPanel'
import MapComponent from './map/MapComponent'
import './App.css'
import './Common.css'

const App = () => {
  const userUtils = require('./userUtils')

  const [showGenres, setShowGenres] = useState(false)
  const [showLoginPanel, setShowLoginPanel] = useState(false)
  const [showRegisterPanel, setShowRegisterPanel] = useState(false)
  const [showSignedIn, setShowSignedIn] = useState(true)
  const [userData, setUserData] = useState(null)

  const [checkedGenres, setCheckedGenres] = useState(['Rap', 'Deephouse'])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await userUtils.getUserData()
        setUserData(user.user)
        console.log('User data:', user)
      } catch (error) {
        console.error('Error:', error)
      }
    }

    fetchData()
  }, [userUtils])

  return (
    <div className='main-container'>
      <div className='header-container'>
        <div className='left-section'>
          <div className='hamburger-container'>
            <HamburgerMenu setShowGenres={setShowGenres} />
            <div className='header-text'>Music-Map</div>
          </div>
        </div>
        <SignIn
          setShowLoginPanel={setShowLoginPanel}
          setShowRegisterPanel={setShowRegisterPanel}
          setShowSignedIn={setShowSignedIn}
          showSignedIn={showSignedIn}
          userData={userData}
          setUserData={setUserData}
        />{' '}
        {}
      </div>
      <div className='center-container'>
        <MapComponent checkedGenres={checkedGenres} />;
        <GenreComponent
          showGenres={showGenres}
          setCheckedGenres={setCheckedGenres}
        />
      </div>
      <RegisterPanel
        showRegisterPanel={showRegisterPanel}
        setShowRegisterPanel={setShowRegisterPanel}
        setShowSignedIn={setShowSignedIn}
      />
      <LoginPanel
        showLoginPanel={showLoginPanel}
        setShowLoginPanel={setShowLoginPanel}
        setShowSignedIn={setShowSignedIn}
        setUserData={setUserData}
      />
    </div>
  )
}

export default App
