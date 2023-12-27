const jwt = require('jsonwebtoken')
const cookie = require('cookie')

class JWTManager {
  constructor () {
    this.secret = process.env.JWT_SECRET || 'defaultSecret'
    this.expiresIn = '1h'
  }

  generateToken (user) {
    const payload = {
      userId: user.id,
      username: user.username,
      email: user.email
      //role: user.role,
    }

    const token = jwt.sign(payload, this.secret, { expiresIn: this.expiresIn })
    return token
  }

  setCookie (res, tokenName, token) {
    const cookieOptions = {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 // 1 hour in milliseconds
    }

    const cookieString = cookie.serialize(tokenName, token, cookieOptions)
    res.setHeader('Set-Cookie', cookieString)
  }

  authenticateToken (req) {
    return new Promise((resolve, reject) => {
      const token =
        req.headers.authorization && req.headers.authorization.split(' ')[1]

      if (!token) {
        reject({ success: false, message: 'Unauthorized', user_data: null })
      }

      jwt.verify(token, process.env.JWT_SECRET, (err, user_data) => {
        if (err) {
          reject({ success: false, message: 'Invalid token', user_data: null })
        }
        resolve({
          success: true,
          message: 'Token verified successfully',
          user_data
        })
      })
    })
  }
}

module.exports = JWTManager
