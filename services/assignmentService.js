const AssignmentControl = require('../controllers/assignmentControl');

module.exports = (app) => {
  app.post('/api/assignments/request', AssignmentControl.sendRequest);

  app.post('/api/assignments/book', AssignmentControl.book);

  /**
   * Search Route
   */
  app.get('/api/assignments/search', AssignmentControl.search);

  app.post('/api/assignments/decline', AssignmentControl.decline);

  app.get('/api/assignments/:id', AssignmentControl.find);

  app.post('/api/assignments/close', AssignmentControl.close);
};

