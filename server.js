const express = require('express');

const app = express();
const port = process.env.PORT || 5000;
const data = require('./data.json')

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/api/hello', (req, res) => {
  res.send(JSON.stringify(data));
});

app.listen(port, () => console.log(`Listening on port ${port}`));