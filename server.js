const express = require('express');
const path = require('path');
const cors = require('cors');
const axios = require('axios');

require('dotenv').config();

console.log('keys: ', process.env);

const app = express();
app.use(cors())
app.use(express.static(path.join(__dirname, 'build')));

app.enable('trust proxy')

app.get('/getdata', async (req, res) => {
});

app.get('/ping', function(req, res) {
  return res.send('pong')
})

app.get('/', function (_req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT || 8080, console.log("Listening on port 8080"));
