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
  const [nickname, setNickname] = useState('')

  const [message, setMessage] = useState('')
  const [isError, setIsError] = useState(false)

  const handleRegister = () => {
    const requestBody = {
      email: email,
      nickname: nickname,
      password: password,
      repPassword: repPassword
    }
    setMessage('')
    setIsError(false)

    fetch(config.registerApi, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    })
      .then(response => {
        return response.json().then(data => {
          if (!response.ok) {
            throw new Error(
              data.message || `HTTP error! Status: ${response.status}`
            )
          }
          return data
        })
      })
      .then(data => {
        console.log('User registration', data)
        if (!data.success) {
          setIsError(true)
          setMessage(data.message)
        } else {
          setMessage('Registration successful')
          setShowRegisterPanel(false)
          setShowSignedIn(true)
        }
      })
      .catch(err => {
        setIsError(true)
        console.error('Error registering:', err)
        setMessage(err.message || 'An error occurred during registration')
      })
  }
  const handleMouseEnter = () => {
    setShowRegisterPanel(true)
    setShowSignedIn(false)
    setMessage('')
  }
  const handleMouseLeave = () => {
    setShowRegisterPanel(false)
    setShowSignedIn(true)
    setMessage('')
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
        {message && (
          <div style={{ color: isError ? 'red' : 'green' }}>{message}</div>
        )}
      </div>
    </div>
  )
}

export default RegisterPanel
