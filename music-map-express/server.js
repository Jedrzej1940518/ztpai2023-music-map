const config = require('./config');
const { checkDatabaseConnection } = require('./initDb');

const express = require('express');
const cors = require('cors');

const app = express();
const port = config.port;

const festivalRouter = require('./routes/festival');
const userRouter = require('./routes/user');

app.use(express.json());

app.use(cors());

app.use(config.festivalApi, festivalRouter);
app.use(config.userApi, userRouter);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
  checkDatabaseConnection();
});
