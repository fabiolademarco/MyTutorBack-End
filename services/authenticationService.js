const AuthenticationControl = require('../controllers/authenticationControl');

module.exports = (app) => {
  app.post('/api/auth/login', AuthenticationControl.login);
  app.get('/api/auth/logout', AuthenticationControl.logout);
  app.post('/api/auth/registerStudent', AuthenticationControl.registerStudent);
  app.post('/api/auth/registerProfessor', AuthenticationControl.registerProfessor);
  app.post('/api/auth/recovery', AuthenticationControl.passwordRecovery);
  app.get('/api/auth/verified', AuthenticationControl.insertVerifiedEmail);
};
