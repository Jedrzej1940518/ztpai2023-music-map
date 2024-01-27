const { Sequelize } = require('sequelize')

class DbManager {
  constructor () {
    this.sequelize = new Sequelize({
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB
    })
    this.User = require('../models/user')(this.sequelize, Sequelize)
    this.Festival = require('../models/festival')(this.sequelize, Sequelize)
  }

  async initializeDatabase () {
    try {
      await this.sequelize.authenticate()
      console.log('Database connection successful.')
      await this.sequelize.sync({ force: false })
      console.log('Database synchronized.')
      // this.logUserTable()
      console.log('Users read correctly.')
    } catch (error) {
      console.error('Error connecting to the database. Retrying in ~2 seconds.')
      setTimeout(() => this.initializeDatabase(), 2000)
    }
  }
  async logUserTable () {
    try {
      const user = await this.getUserByEmail('ala@wp.pl')
      console.log('User 0: ', user)
    } catch (error) {
      console.error(
        'Error querying the "user" table - Retrying in 2 seconds:',
        error
      )
      setTimeout(() => this.logUserTable(), 2000)
    }
  }

  async getUserByEmailAndPassword (email, password) {
    try {
      const user = await this.User.findOne({
        where: {
          email: email,
          password: password
        }
      })

      return user
    } catch (error) {
      console.error('Error querying the database:', error)
      throw error
    }
  }
  async getUserById (id) {
    try {
      const user = await this.User.findOne({
        where: {
          id: id
        }
      })

      return user
    } catch (error) {
      console.error('Error querying the database:', error)
      throw error
    }
  }

  async getUserByEmail (email) {
    try {
      const user = await this.User.findOne({
        where: {
          email: email
        }
      })

      return user
    } catch (error) {
      console.error('Error querying the database:', error)
      throw error
    }
  }
  async registerUser (email, nickname, password) {
    try {
      const newUser = await this.User.create({
        email: email,
        nickname: nickname,
        password: password,
        favorite_festivals: []
      })

      console.log('User registered:', newUser.email)
      return { success: true, user: newUser }
    } catch (error) {
      console.error('Error registering user:', error.message)
      return { success: false, error: error.message }
    }
  }
  async updateFavoriteFestivals (userId, festivalId, value) {
    try {
      const user = await this.getUserById(userId)

      if (!user) {
        console.error('User not found')
        return { success: false, error: 'User not found' }
      }

      let favorites = user.favorite_festivals || []

      if (value) {
        if (!favorites.includes(festivalId)) {
          favorites.push(festivalId)
        }
      } else {
        favorites = favorites.filter(id => id !== festivalId)
      }
      await this.User.update(
        { favorite_festivals: favorites },
        {
          where: {
            id: user.id
          }
        }
      )
      console.log('Favorite festivals updated:', user.favorite_festivals)
      return { success: true, user: user }
    } catch (error) {
      console.error('Error updating favorite festivals:', error.message)
      return { success: false, error: error.message }
    }
  }

  async getFestivalsByDateRange (startDate, endDate) {
    try {
      const festivals = await this.Festival.findAll({
        where: {
          start_date: {
            [Sequelize.Op.between]: [startDate, endDate]
          }
        }
      })

      return festivals
    } catch (error) {
      console.error(
        'Error querying the database for festivals by date range:',
        error
      )
      throw error
    }
  }
}

module.exports = DbManager
