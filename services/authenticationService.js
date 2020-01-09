const AuthenticationControl = require('../controllers/authenticationControl');

module.exports = (app, auth) => {
  /**
   * @api {OBJECT} User User
   * @apiGroup Authentication
   * @apiParam {string} email The email of the user
   * @apiParam {string} password The user password
   * @apiParam {string} name The user name
   * @apiParam {string} surname The user surname
   * @apiParam {string="Student","Professor","DDI","Teaching Office"} role The user role
   * @apiParam {number="0","1"} verified
   */

  /**
   * @api {OBJECT} Student Student
   * @apiGroup Authentication
   * @apiParam {string} email The email of the user
   * @apiParam {string} password The user password
   * @apiParam {string} name The user name
   * @apiParam {string} surname The user surname
   * @apiParam {string="Student"} role The user role
   * @apiParam {number="0","1"} verified
   * @apiParam {string} registration_number The registration number of the student
   * @apiParam {date} birth_date The birth date
   */

  /**
   * @api {POST} /api/auth/login Login
   * @apiName Login
   * @apiGroup Authentication
   * @apiPermission guest
   * @apiParam {[User](#api-Authentication-ObjectUser)} user User, with email and password,who wants to do the login in the system.
   * @apiSuccess {[User](#api-Authentication-ObjectUser)} user The user who logged in the system.
   * @apiSuccess {boolean} status The status of the operation.
   * @apiSuccess {string} token The jwt token for authorization.
   */
  app.post('/api/auth/login', auth.isNotLogged, AuthenticationControl.login);

  /**
   * @api {GET} /api/auth/logout Logout
   * @apiName Logout
   * @apiGroup Authentication
   * @apiPermission User
   * @apiSuccess {boolean} status The status of the operation.
   * @apiSuccess {string} message A message describing what happened.
   */
  app.get('/api/auth/logout', auth.authenticate(), AuthenticationControl.logout);

  /**
   * @api {POST} /api/auth/registerStudent Student registration
   * @apiName RegisterStudent
   * @apiGroup Authentication
   * @apiPermission guest
   * @apiParam {[Student](#api-Authentication-ObjectStudent)} student The student to register.
   * @apiSuccess {[Student](#api-Authentication-ObjectStudent)} student The registered student.
   * @apiSuccess {string} token The jwt token for authorization.
   */
  app.post('/api/auth/registerStudent', auth.isNotLogged, AuthenticationControl.registerStudent);

  /**
   * @api {POST} /api/auth/registerProfessor[?token=] Professor registration
   * @apiName RegisterProfessor
   * @apiGroup Authentication
   * @apiPermission guest
   * @apiParam {[User](#api-Authentication-ObjectUser)} professor The professor to register
   * @apiParam {string} token Optional token sent to complete professor registration
   * @apiSuccess {boolean} status Boolean representing the result of the operation
   * @apiSuccess {[User](#api-Authentication-ObjectUser)} professor This attribute is sent only when the token is passed
   */
  app.post('/api/auth/registerProfessor', auth.isNotLogged, AuthenticationControl.registerProfessor);

  /**
   * @api {POST} /api/auth/recovery Password recovery
   * @apiName PasswordRecovery
   * @apiGroup Authentication
   * @apiPermission Guest
   * Working in progress...
   */
  app.post('/api/auth/recovery', auth.isNotLogged, AuthenticationControl.passwordRecovery);

  /**
   * @api {POST} /api/auth/verified Insert VerifiedEmail
   * @apiName InsertVerifiedEmail
   * @apiGroup Authentication
   * @apiPermission Teaching Office
   * @apiParam {string} email The email to insert.
   * @apiSuccess {boolean} status The status of the operation.
   * @apiSuccess {string} message A message describing what happened.
   */
  app.post('/api/auth/verified', auth.authenticate(), auth.isTeachingOffice, AuthenticationControl.insertVerifiedEmail);

  /**
   * @api {GET} /api/auth/check Check Session
   * @apiName CheckUserSession
   * @apiGroup Authentication
   * @apiPermission Guest
   * @apiSuccess {boolean} status A boolean that it's true if the user token is still valid, or else it's false
   */
  app.get('/api/auth/check', AuthenticationControl.checkUserSession);
};
