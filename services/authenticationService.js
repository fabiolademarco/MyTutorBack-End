const AuthenticationControl = require('../controllers/authenticationControl');

module.exports = (app, auth) => {
  /**
   * @api {POST} /api/auth/login Allows to login
   * @apiName Login
   * @apiGroup Authentication
   * @apiPermission guest
   * @apiParam {User} user User, with email and password,who wants to do the login in the system.
   * @apiSuccess {User} user The user who logged in the system.
   * @apiSuccess {boolean} status The status of the operation.
   * @apiSuccess {string} token The jwt token for authorization.
   */
  app.post('/api/auth/login', auth.isNotLogged, AuthenticationControl.login);

  /**
   * @api {GET} /api/auth/logout Allows to logout
   * @apiName Logout
   * @apiGroup Authentication
   * @apiPermission User
   * @apiSuccess {boolean} status The status of the operation.
   * @apiSuccess {string} message A message describing what happened.
   */
  app.get('/api/auth/logout', auth.authenticate(), AuthenticationControl.logout);

  /**
   * @api {POST} /api/auth/registerStudent Allows to register a new Student
   * @apiName RegisterStudent
   * @apiGroup Authentication
   * @apiPermission guest
   * @apiParam {Student} student The student to register.
   * @apiSuccess {Student} student The registered student.
   * @apiSuccess {string} token The jwt token for authorization.
   */
  app.post('/api/auth/registerStudent', auth.isNotLogged, AuthenticationControl.registerStudent);

  /**
   * @api {POST} /api/auth/registerProfessor Allows to register a new Professor
     Working in progress...
   */
  app.post('/api/auth/registerProfessor', auth.isNotLogged, AuthenticationControl.registerProfessor);

  /**
   * @api {POST} /api/auth/recovery Allows to recover a password.
   * Working in progress...
   */
  app.post('/api/auth/recovery', auth.isNotLogged, AuthenticationControl.passwordRecovery);

  /**
   * @api {POST} /api/auth/verified Allows to insert a new verifiedEmail.
   * @apiName InsertVerifiedEmail
   * @apiGroup Authentication
   * @apiPermission Teaching Office
   * @apiParam {string} email The email to insert.
   * @apiSuccess {boolean} status The status of the operation.
   * @apiSuccess {string} message A message describing what happened.
   */
  app.post('/api/auth/verified', auth.authenticate(), auth.isTeachingOffice, AuthenticationControl.insertVerifiedEmail);
};
