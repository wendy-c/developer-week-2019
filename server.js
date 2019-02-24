const express = require('express');
const path = require('path');
const cors = require('cors');
const axios = require('axios');
var fs = require('fs');
var https = require('https');
const identify = require('./identify').identify;
const addAdmin = require('./identify').addAdmin;

require('dotenv').config();

const app = express();
app.use(cors())
app.use(express.static(path.join(__dirname, 'build')));

app.enable('trust proxy')

app.get('/getdata', async (req, res) => {
});

app.get('/ping', function(req, res) {
  return res.send('pong')
})

// identify who is currently watching
app.get('/who/admin', function(req, res) {
  addAdmin('./data.json');
});

app.get('/', function (_req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT || 8080, console.log("Listening on port 8080"));

https.createServer({
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cert')
}, app)
.listen(1989, function () {
  console.log('HTTPS listening on port 1989! Go to https://localhost:1989/')
})