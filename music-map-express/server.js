const express = require('express');

const app = express();
const port = 3001; 

//base path
app.get('/', (req, res) => {
  res.send('Hello world!');
});

app.listen(port, () => {
  console.log(`Server port: ${port}`);
});
