import React, { useState } from 'react'
import './LoginPanel.css'
import '../Common.css'

const userUtils = require('./../userUtils')
const config = require('./../config')

const LoginPanel = ({
  showLoginPanel,
  setShowLoginPanel,
  setShowSignedIn,
  setUserData
}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [message, setMessage] = useState('')
  const [isError, setIsError] = useState(false)

  const handleSignIn = () => {
    const requestBody = {
      email: email,
      password: password
    }
    setIsError(false)
    setMessage('')
    fetch(config.singInApi, {
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
        console.log('Sign in requested', data)
        if (!data.success) {
          setIsError(true)
          setMessage(data.message)
        } else {
          userUtils.storeTokenInCookie(data.token)
          setUserData(data.user)
          setMessage(`User successfully signed in as ${data.user.nickname}`)
          console.log(
            `Signed in as ${data.user.nickname} with token ${data.token}`
          )
        }
      })
      .catch(e => {
        console.error('Error signing in:', e)
        setIsError(true)
        setMessage(e.message || 'An error occurred')
      })
  }
  const handleMouseEnter = () => {
    setShowLoginPanel(true)
    setShowSignedIn(false)
    setMessage('')
  }
  const handleMouseLeave = () => {
    setShowLoginPanel(false)
    setShowSignedIn(true)
    setMessage('')
  }

  return (
    <div
      className={`login-panel ${showLoginPanel ? 'show' : ''}`}
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
          type='password'
          className='text-input'
          placeholder='Password'
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button className='button-style' onClick={handleSignIn}>
          Sign In
        </button>
        {message && (
          <div style={{ color: isError ? 'red' : 'green' }}>{message}</div>
        )}
      </div>
    </div>
  )
}

export default LoginPanel
