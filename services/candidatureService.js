const CandidatureControl = require('../controllers/candidatureControl');

module.exports = (app, auth) => {
  app.use('/api/candidatures', auth.authenticate());

  app.put('/api/candidatures', auth.isStudent, CandidatureControl.create);
  app.patch('/api/candidatures', auth.isStudent, CandidatureControl.update);
  app.delete('/api/candidatures', auth.isStudent, CandidatureControl.delete);
  app.get('/api/candidatures', CandidatureControl.search);
  app.post('/api/candidatures', auth.isTeachingOffice, CandidatureControl.dowloadDocumentFile);
};
