const express = require('express')
const DbManager = require('../utils/DbManager')
const JWTManager = require('../auth/JWTManager')
const config = require('../config/config')
const validator = require('validator')
const bcrypt = require('bcrypt')

class UserRouter {
  constructor () {
    this.router = express.Router()
    this.db = new DbManager()
    this.jwtManager = new JWTManager()
    this.initializeRoutes()
  }

  initializeRoutes () {
    this.router.get('/', this.getUserApi.bind(this))
    this.router.post(config.singInApi, this.signIn.bind(this))
    this.router.post(config.registerApi, this.register.bind(this))
    this.router.post(
      config.setFavoriteFestivalApi,
      this.setFavoriteFestival.bind(this)
    )
  }

  async hashPassword (password) {
    return await bcrypt.hash(password, 10)
  }

  /**
   * @swagger
   * /api/user/favorite:
   *   post:
   *     summary: sets/unsets festival as favorite based on JWT token.
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               festivalId:
   *                 type: integer
   *               value:
   *                 type: boolean
   *     responses:
   *       200:
   *         description: Festival favorited/unfavorited
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                 message:
   *                   type: string
   *             example:
   *               success: true
   *               message: 'Favorite status updated successfully.'
   *       401:
   *         description: Authenticator error
   *       500:
   *         description: Server problems
   *
   * components:
   *   schemas:
   *     user:
   *       type: object
   *       properties:
   *         id:
   *           type: integer
   *           description: user id
   *         nickname:
   *           type: string
   *           description: user nickname
   *         email:
   *           type: string
   *           format: email
   *           description: user email
   *         password:
   *           type: string
   *           format: password
   *           description: hashed user password
   *         favorite_festivals:
   *           type: array
   *           items:
   *              type: integer
   *           description: array of ids - favorite user festivals
   *
   */

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

  /**
   * @swagger
   * /api/user/:
   *   get:
   *     summary: Retruns user info based on JWT token.
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: User info.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                  success:
   *                    type: boolean
   *                  message:
   *                    type: string
   *                  user:
   *                    schema:
   *                       $ref: '#/components/schemas/user'
   *       401:
   *         description: User not logged in.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                  success:
   *                    type: boolean
   *                  message:
   *                    type: string
   *                  user:
   *                    type: user
   *                    nullable: true
   *             example:
   *               success: false
   *               message: 'Authentication failed.'
   *               user: null
   */

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

  /**
   * @swagger
   * /api/user/signIn:
   *   post:
   *     summary: Sign in.
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               email:
   *                 type: string
   *               password:
   *                 type: string
   *     responses:
   *       200:
   *         description: Sign in succesfull
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                success:
   *                  type: boolean
   *                message:
   *                  type: string
   *                user:
   *                   schema:
   *                     $ref: '#/components/schemas/user'
   *                token:
   *                  type: string
   *       401:
   *         description: Sign in failed
   */

  async signIn (req, res) {
    const { email, password } = req.body

    try {
      const user = await this.db.getUserByEmail(email)

      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: 'User not found.' })
      }

      const match = await bcrypt.compare(password, user.password)
      if (!match) {
        return res
          .status(401)
          .json({ success: false, message: 'Invalid password' })
      }

      const token = this.jwtManager.generateToken(user)
      this.jwtManager.setCookie(res, 'token', token)

      return res.status(200).json({
        success: true,
        message: 'Sign in successful',
        user: user,
        token: token
      })
    } catch (error) {
      console.error('Error querying the database:', error)
      res.status(500).json({ success: false, message: 'Internal server error' })
    }
  }

  /**
   * @swagger
   * /api/user/register:
   *   post:
   *     summary: New user registration.
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               email:
   *                 type: string
   *               nickname:
   *                 type: string
   *               password:
   *                 type: string
   *     responses:
   *       200:
   *         description: User sucesfully registresd
   *       401:
   *         description: Registration failed
   *       500:
   *         description: Server problems
   */

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
        let hashedPassword = await this.hashPassword(password)
        this.db.registerUser(email, nickname, hashedPassword).then(result => {
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
