const config = require('./config/config')
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')

//swagger
const swaggerJsdoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

const DbManager = require('./utils/DbManager')
const UserRouter = require('./routes/UserRouter')
const FestivalRouter = require('./routes/FestivalRouter')

class WebServer {
  constructor () {
    this.dbManager = new DbManager()
    this.app = express()
    this.port = config.port

    this.initializeMiddleware()
    this.initializeRoutes()
  }

  initializeMiddleware () {
    this.app.use(express.json())
    this.app.use(cors())
    this.app.use(cookieParser())
  }

  initializeRoutes () {
    const festivalRouter = new FestivalRouter()
    const userRouter = new UserRouter()

    this.app.use(config.festivalApi, festivalRouter.router)
    this.app.use(config.userApi, userRouter.router)

    const options = {
      definition: {
        openapi: '3.0.0',
        info: {
          title: 'music-map-api',
          version: '1.0.0',
          description: 'api for music map!'
        },
        components: {
          securitySchemes: {
            bearerAuth: {
              type: 'http',
              scheme: 'bearer',
              bearerFormat: 'JWT'
            }
          }
        }
      },
      apis: ['./routes/*.js']
    }
    const specs = swaggerJsdoc(options)

    this.app.use('/swagger-api', swaggerUi.serve, swaggerUi.setup(specs))
  }

  start () {
    this.app.listen(this.port, () => {
      console.log(`Server is running at http://localhost:${this.port}`)
      this.dbManager.initializeDatabase()
    })
  }
}

const webServer = new WebServer()
webServer.start()
