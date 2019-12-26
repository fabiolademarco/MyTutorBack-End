const AuthenticationControl = require('../controllers/authenticationControl');

module.exports = (app, auth) => {
  app.post('/api/auth/login', auth.isLogged, AuthenticationControl.login);
  app.get('/api/auth/logout', auth.authenticate(), AuthenticationControl.logout);
  app.post('/api/auth/registerStudent', auth.isLogged, AuthenticationControl.registerStudent);
  app.post('/api/auth/registerProfessor', auth.isLogged, AuthenticationControl.registerProfessor);
  app.post('/api/auth/recovery', auth.isLogged, AuthenticationControl.passwordRecovery);
  app.get('/api/auth/verified', auth.authenticate(), auth.isTeachingOffice, AuthenticationControl.insertVerifiedEmail);
};
