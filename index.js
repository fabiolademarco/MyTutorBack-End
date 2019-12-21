const dotenv = require('dotenv');
dotenv.config();// FileName: index.js
// Import express
const express = require('express');

// Import Body parser
const bodyParser = require('body-parser');
// Import MySql
// let mysql = require('mysql');
// Initialize the app
const app = express();
// import services
// ...
const assignmentService = require('./services/assignmentService');
const noticeService = require('./services/noticeService');

app.use(function(req, res, next) {
  // Website you wish to allow to connect,
  // * means that all the website are allowed
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, OPTIONS, PUT, PATCH, DELETE',
  );

  // Request headers you wish to allow
  res.setHeader(
      'Access-Control-Allow-Headers',
      'X-Requested-With,content-type',
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

// Configure bodyparser to handle post requests
app.use(
    bodyParser.urlencoded({
      extended: true,
    }),
);
app.use(bodyParser.json());

// Setup server port
const port = process.env.EXPRESS_PORT;

// Import routes
// NomeVariabileImportServices(app);

// Launch app to listen to specified port
app.listen(port, function() {
  console.log('Running MyTutor-Back on port ' + port);
});

// AssignmentService routes
assignmentService(app);
noticeService(app);

