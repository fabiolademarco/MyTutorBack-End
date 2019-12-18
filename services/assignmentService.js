module.exports = (app) => {
  const AssignmentControl = require('../controllers/assignmentControl');

  app.get('/assignments/search', AssignmentControl.search);
};

