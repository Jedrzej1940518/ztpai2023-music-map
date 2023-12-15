const config = require('./config/config');
const express = require('express');
const cors = require('cors');
const DbManager = require('./utils/DbManager');
const UserRouter = require('./routes/UserRouter');
const FestivalRouter = require('./routes/FestivalRouter');

class WebServer {
  constructor() {
    this.dbManager = new DbManager();
    this.app = express();
    this.port = config.port;

    this.initializeMiddleware();
    this.initializeRoutes();
  }

  initializeMiddleware() {
    this.app.use(express.json());
    this.app.use(cors());
  }

  initializeRoutes() {
    const festivalRouter = new FestivalRouter();
    const userRouter = new UserRouter();

    this.app.use(config.festivalApi, festivalRouter.router);
    this.app.use(config.userApi, userRouter.router);
  }

  start() {
    this.app.listen(this.port, () => {
      console.log(`Server is running at http://localhost:${this.port}`);
      this.dbManager.initializeDatabase();
    });
  }
}

const webServer = new WebServer();
webServer.start();
