const AssignmentControl = require('../controllers/assignmentControl');

module.exports = (app, auth) => {
  /**
   * Middleware of authentication control
   */
  app.use('/api/assignments', auth.authenticate());

  /**
   * Allows to send a request
   * @param {Request} req Contains the json with an assignment and a student email.
   * @return {Response} Response body with an assignment json.
   */
  app.post('/api/assignments/request', auth.isTeachingOffice, AssignmentControl.sendRequest);

  /**
   * Allows to book an assignment
   * @param {Request} req Contains the json body with an assignment.
   * @return {Response} Response body with a boolean result attribute.
   */
  app.post('/api/assignments/book', auth.isStudent, AssignmentControl.book);

  /**
   * Allows to assign an assignment
   * @param {Request} req Contains the json body with an assignment.
   * @return {Response} Response body with a boolean result attribute.
   */
  app.post('/api/assignments/assign', auth.isTeachingOffice, AssignmentControl.assign);

  /**
   * Allows to search
   * @param {Request} req Contains a series of params
   * @return {Response} Response body containing a list of Assignments
   */
  app.get('/api/assignments/search', AssignmentControl.search);

  /** Allows to decline an assignment
   * @param {Request} req Contains the json body with an assignment
   * @return {Response} Response body containing a boolean result attribute.
   */
  app.post('/api/assignments/decline', auth.isStudent, AssignmentControl.decline);

  /**
   * Allows to find an single assignment
   * @param {Request} req Contains the id param
   * @return {Response} Response body containing the assignment
   */
  app.get('/api/assignments/:id', AssignmentControl.find); // Non ricordo chi è autorizzato a farla

  /**
   * Allows to close an assignment
   * @param {Request} req Contains the json body with an assignment
   * @return {Response} Response body containing a boolean result attribute.
   */
  app.post('/api/assignments/close', auth.isTeachingOffice, AssignmentControl.close);
};

