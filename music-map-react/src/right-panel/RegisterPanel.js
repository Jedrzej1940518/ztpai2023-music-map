import React, { useState } from 'react'
import './LoginPanel.css'
import './../Common.css'

const config = require('./../config')

const RegisterPanel = ({
  showRegisterPanel,
  setShowRegisterPanel,
  setShowSignedIn
}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repPassword, setRepPassword] = useState('')
  const [error, setError] = useState('')
  const [nickname, setNickname] = useState('')

  const setErrorMessage = message => {
    setError(message)
  }

  const handleRegister = () => {
    const requestBody = {
      email: email,
      nickname: nickname,
      password: password,
      repPassword: repPassword
    }
    setErrorMessage('')

    fetch(config.registerApi, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    })
      .then(response => {
        if (!response.ok) {
          setErrorMessage(response.message)
          console.log(error, response.message)
        }
        return response.json()
      })
      .then(data => {
        console.log('User registration', data)
        if (!data.success) {
          setErrorMessage(data.message)
          console.log('Registration failed', data)
        } else console.log('Registration Suceeded', data)
      })
      .catch(err => {
        console.error('Error signing in:', err)
      })
  }
  const handleMouseEnter = () => {
    setShowRegisterPanel(true)
    setShowSignedIn(false)
    setError('')
  }
  const handleMouseLeave = () => {
    setShowRegisterPanel(false)
    setShowSignedIn(true)
    setError('')
  }

  return (
    <div
      className={`login-panel ${showRegisterPanel ? 'show' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className='menu-content'>
        <input
          type='text'
          className='text-input'
          placeholder='Email'
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type='text'
          className='text-input'
          placeholder='Nickname'
          value={nickname}
          onChange={e => setNickname(e.target.value)}
        />
        <input
          type='password'
          className='text-input'
          placeholder='Password'
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <input
          type='password'
          className='text-input'
          placeholder='Repeat Password'
          value={repPassword}
          onChange={e => setRepPassword(e.target.value)}
        />
        <button className='button-style' onClick={handleRegister}>
          Register
        </button>
        {error && <div style={{ color: 'red' }}>{error}</div>}
      </div>
    </div>
  )
}

export default RegisterPanel
