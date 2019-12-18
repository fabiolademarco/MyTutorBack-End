const AssignmentControl = require('../controllers/assignmentControl');

module.exports = (app) => {
  app.post('/api/admin/assignments/sendRequest', AssignmentControl.sendRequest);

  app.post('/api/student/assignments/book', AssignmentControl.book);

  /**
   * Search Route
   */
  app.get('/api/assignments/search', AssignmentControl.search);

  app.post('/api/student/assignments/decline', AssignmentControl.decline);

  app.get('/api/assignment/:id', AssignmentControl.find);
};

