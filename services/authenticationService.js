const AuthenticationControl = require('../controllers/authenticationControl');

module.exports = (app, auth) => {
  app.post('/api/auth/login', auth.isNotLogged, AuthenticationControl.login);
  app.get('/api/auth/logout', auth.authenticate(), AuthenticationControl.logout);
  app.post('/api/auth/registerStudent', auth.isNotLogged, AuthenticationControl.registerStudent);
  app.post('/api/auth/registerProfessor', auth.isNotLogged, AuthenticationControl.registerProfessor);
  app.post('/api/auth/recovery', auth.isNotLogged, AuthenticationControl.passwordRecovery);
  app.post('/api/auth/verified', auth.authenticate(), auth.isTeachingOffice, AuthenticationControl.insertVerifiedEmail);
};
