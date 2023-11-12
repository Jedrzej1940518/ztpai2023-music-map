const express = require('express');

const app = express();
const port = 3001; 

const festivalRouter = require('./routes/festival');

app.use(express.json());

app.use('/api/festivals', festivalRouter);

app.listen(port, () => {
  console.log(`Serwer działa na http://localhost:${port}`);
});