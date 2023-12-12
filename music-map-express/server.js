const { checkDatabaseConnection } = require('./initDb'); // Import the checkDatabaseConnection function

const express = require('express');
const cors = require('cors');

const app = express();
const port = 3001;

const festivalRouter = require('./routes/festival');
const userRouter = require('./routes/user');

app.use(express.json());

app.use(cors());

app.use('/api/festivals', festivalRouter);
app.use('/api/user', userRouter);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
  checkDatabaseConnection();
});
