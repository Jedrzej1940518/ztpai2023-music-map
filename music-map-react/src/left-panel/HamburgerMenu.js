import React, { useState } from 'react'
import './HamburgerMenu.css'

const HamburgerMenu = ({ setShowGenres }) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
    setShowGenres(!isOpen)
  }

  return (
    <div
      className={`hamburger-menu ${isOpen ? 'open' : ''}`}
      onClick={toggleMenu}
    >
      <div className='bar'></div>
      <div className='bar'></div>
      <div className='bar'></div>
    </div>
  )
}

export default HamburgerMenu
