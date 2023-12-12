const { checkDatabaseConnection } = require('./initDb'); // Import the checkDatabaseConnection function

const express = require('express');

const app = express();
const port = 3001;

const festivalRouter = require('./routes/festival');
const userRouter = require('./routes/festival');

app.use(express.json());

app.use('/api/festivals', festivalRouter);
app.use('/api/users', userRouter);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
  checkDatabaseConnection();
});
