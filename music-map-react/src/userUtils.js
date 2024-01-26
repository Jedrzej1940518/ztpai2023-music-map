const config = require('./config')

const storeTokenInCookie = token => {
  document.cookie = `token=${token}; SameSite=Lax`
}
const removeTokenFromCookie = () => {
  document.cookie = `token=; SameSite=Lax`
}

const getTokenFromCookie = cookieName => {
  const cookies = document.cookie.split(';').map(cookie => cookie.trim())

  for (const cookie of cookies) {
    const [name, value] = cookie.split('=')
    if (name === cookieName) {
      return value
    }
  }

  return null
}

const getUserData = () => {
  const token = getTokenFromCookie('token')
  if (!token) {
    return Promise.reject('Token not available')
  }

  return fetch(config.userApi, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      return response.json()
    })
    .then(data => {
      console.log('User data:', data)
      return data
    })
    .catch(error => {
      console.error('Error:', error)
      return null
    })
}

module.exports = {
  storeTokenInCookie,
  removeTokenFromCookie,
  getTokenFromCookie,
  getUserData
}
