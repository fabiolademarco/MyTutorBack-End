const AssignmentControl = require('../controllers/assignmentControl');

module.exports = (app, auth) => {
  /**
   * Middleware of authentication control
   */
  app.use(/\/api\/assignments\.*/, auth.authenticate());

  /**
   * @api {POST} /api/assignments/request Sends a request
   * @apiName SendRequest
   * @apiGroup Assignment
   * @apiPermission Teaching Office
   * @apiParam {Assignment} assignment The assignment to send in the request
   * @apiParam {string} emailStudent The email of the student to send the request to
   * @apiSuccess {Assignment} assignment The updated assignment
   */
  app.post('/api/assignments/request', auth.isTeachingOffice, AssignmentControl.sendRequest);

  /**
   * @api {POST} /api/assignments/book Books an assignment
   * @apiName BookAssignment
   * @apiGroup Assignment
   * @apiPermission Student
   * @apiParam {Assignment} assignment The assignment to book
   * @apiSuccess {boolean} status Boolean which expresses the result of the operation
   */
  app.post('/api/assignments/book', auth.isStudent, AssignmentControl.book);

  /**
   * @api {POST} /api/assignments/assign Assigns an assignment
   * @apiName Assign
   * @apiGroup Assignment
   * @apiPermission Teaching Office
   * @apiParam {Assignment} assignment The assignment to assign
   * @apiSuccess {boolean} status Boolean which expresses the result of the operation
   */
  app.post('/api/assignments/assign', auth.isTeachingOffice, AssignmentControl.assign);

  /**
   * @api {GET} /api/assignments/search Searches assignments
   * @apiName SearchAssignment
   * @apiGroup Assignment
   * @apiPermission User
   * @apiParam {string} code The code of the assignment
   * @apiParam {string} noticeProtocol The notice protocol
   * @apiParam {string} state The state of the assignment
   * @apiParam {string} student The student email (only allowed to Teaching Office)
   * @apiSuccess {Assignment[]} list The list of the assignments which respect the search criteria
   */
  app.get('/api/assignments/search', AssignmentControl.search);

  /**
   * @api {POST} /api/assignments/decline Declines an assignment
   * @apiName DeclineAssignment
   * @apiGroup Assignment
   * @apiPermission Student
   * @apiParam {Assignment} assignment The assignment to decline
   * @apiSuccess {boolean} status Boolean which expresses the result of the operation
   */
  app.post('/api/assignments/decline', auth.isStudent, AssignmentControl.decline);

  /**
   * @api {GET} /api/assignments/:id Finds an assignment
   * @apiName Find
   * @apiGroup Assignment
   * @apiPermission User
   * @apiParam {string} id The id of the assignment
   * @apiSuccess {Assignment} assignemnt The assignment with the given id
   */
  app.get('/api/assignments/:id', AssignmentControl.find); // Non ricordo chi è autorizzato a farla

  /**
   * @api {POST} /api/assognments/close Closes an assignment
   * @apiName Close
   * @apiGroup Assignment
   * @apiPermission Teaching Office
   * @apiParam {Assignment} assignment The assignment to close
   * @apiSuccess {boolean} status Boolean which expresses the result of the operation
   */
  app.post('/api/assignments/close', auth.isTeachingOffice, AssignmentControl.close);
};

