const express = require('express')
const DbManager = require('../utils/DbManager')
const JWTManager = require('../auth/JWTManager')
const config = require('../config/config')
const validator = require('validator')

class UserRouter {
  constructor () {
    this.router = express.Router()
    this.db = new DbManager()
    this.jwtManager = new JWTManager()
    this.initializeRoutes()
  }

  initializeRoutes () {
    this.router.get('/', this.getUserApi.bind(this))
    this.router.get('/:id', this.getUserDetails.bind(this))
    this.router.post(config.singInApi, this.signIn.bind(this))
    this.router.post(config.registerApi, this.register.bind(this))
    this.router.post(
      config.setFavoriteFestivalApi,
      this.setFavoriteFestival.bind(this)
    )
  }
  async setFavoriteFestival (req, res) {
    this.jwtManager
      .authenticateToken(req)
      .then(({ user_data }) => {
        const { festivalId, value } = req.body

        this.db
          .updateFavoriteFestivals(user_data.userId, festivalId, value)
          .then(() => {
            res.json({
              success: true,
              message: 'Favorite status updated successfully.'
            })
          })
          .catch(error => {
            console.error('Database operation failed:', error)
            res
              .status(500)
              .json({ success: false, message: 'Internal server error' })
          })
      })
      .catch(authError => {
        res.status(401).json(authError)
      })
  }

  async getUserApi (req, res) {
    this.jwtManager
      .authenticateToken(req)
      .then(result => {
        if (result.success) {
          this.db.getUserById(result.user_data.userId).then(user_res => {
            res
              .status(200)
              .json({ success: true, message: 'User ', user: user_res })
          })
        } else
          res
            .status(401)
            .json({ success: false, message: 'coudlnt find user', user: null })
      })
      .catch(error => {
        console.error(error)
        res.status(401).json({ success: false, message: error, user: null })
      })
  }

  async getUserDetails (req, res) {
    const userId = req.params.id
    res.json({ message: `Szczegóły usera o ID ${userId}` })
  }

  async signIn (req, res) {
    const { email, password } = req.body

    try {
      const user = await this.db.getUserByEmailAndPassword(email, password)

      if (user) {
        const token = this.jwtManager.generateToken(user)
        this.jwtManager.setCookie(res, 'token', token)

        res.status(200).json({
          success: true,
          message: 'Sign in successful',
          user: user,
          token: token
        })
      } else {
        res
          .status(401)
          .json({ success: false, message: 'Invalid email or password' })
      }
    } catch (error) {
      console.error('Error querying the database:', error)
      res.status(500).json({ success: false, message: 'Internal server error' })
    }
  }
  async register (req, res) {
    const { email, nickname, password, repPassword } = req.body

    try {
      const user = await this.db.getUserByEmail(email)

      if (user) {
        res
          .status(401)
          .json({ success: false, message: 'Email already registred!' })
      } else if (password != repPassword) {
        res
          .status(401)
          .json({ success: false, message: "Passwords don't match!" })
      } else if (!validator.isEmail(email)) {
        res.status(401).json({ success: false, message: 'Invalid email!' })
      } else {
        this.db.registerUser(email, nickname, password).then(result => {
          if (result.success) {
            console.log('Registration successful!')
            res
              .status(200)
              .json({ success: true, message: 'User registered', user: user })
          } else {
            console.error('Registration failed:', result.error)
            res.status(401).json({ success: false, message: result.error })
          }
        })
      }
    } catch (error) {
      console.error('Error querying the database:', error)
      res.status(500).json({ success: false, message: 'Internal server error' })
    }
  }
}

module.exports = UserRouter
