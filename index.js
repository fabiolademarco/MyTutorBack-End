// Import dotenv
const dotenv = require('dotenv');

// Configure dotenv
dotenv.config();

// Import express
const express = require('express');

// Import Body parser
const bodyParser = require('body-parser');

// Import cors
const cors = require('cors');

// Initialize the app
const app = express();

// Import auth
const auth = require('./auth')();

// Import services
const assignmentService = require('./services/assignmentService');
const noticeService = require('./services/noticeService');
const userService = require('./services/userService');
const authService = require('./services/authenticationService');
const candidatureService = require('./services/candidatureService');
const commentService = require('./services/commentService');
const applicationSheetService = require('./services/applicationSheetService');
const ratingService = require('./services/ratingService');

app.use(cors());

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');

  res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, OPTIONS, PUT, PATCH, DELETE',
  );

  res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  );

  res.setHeader('Access-Control-Allow-Credentials', true);

  res.set('Content-Type', 'application/json');

  // Pass to next layer of middleware
  next();
});

// Configure bodyparser to handle post requests
app.use(
    bodyParser.urlencoded({
      extended: true,
      limit: '5MB',
    }),
);
app.use(bodyParser.json({limit: '5MB'}));
app.use(auth.initialize());

// Setup server port
const port = process.env.PORT || process.env.EXPRESS_PORT;

// Launch app to listen to specified port
app.listen(port, function() {
  console.log('Running MyTutor-Back on port ' + port);
});

// AssignmentService routes
assignmentService(app, auth);

// NoticeService routes
noticeService(app, auth);

// UserService routes
userService(app, auth);

// AuthenticationService routes
authService(app, auth);

// CandidatureService routes
candidatureService(app, auth);

// CommentService routes
commentService(app, auth);

// ApplicationSheetService routes
applicationSheetService(app, auth);

// RatingService routes
ratingService(app, auth);
