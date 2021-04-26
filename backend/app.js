const express = require('express');
const app = express();
const port = 4000;

app.use(express.static('../front/build'));

app.get('/api', (req, res) => {
  res.status(200).send('to jest api');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
