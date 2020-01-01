const CandidatureControl = require('../controllers/candidatureControl');

module.exports = (app, auth) => {
  app.use('/api/candidatures', auth.authenticate());

  /**
   * @api {PUT} /api/candidatures Creates a new candidature
   * @apiName Create
   * @apiGroup Candidature
   * @apiPermission Student
   * @apiParam {Candidature} candidature The candidature to create
   * @apiSuccess {boolean} status Boolean which expresses the result of the operation
   */
  app.put('/api/candidatures', auth.isStudent, CandidatureControl.create);

  /**
   * @api {PATCH} /api/candidatures Updates a candidature
   * @apiName Update
   * @apiGroup Candidature
   * @apiPermission Student
   * @apiParam {Candidature} candidature The candidature to update
   * @apiSuccess {boolean} status Boolean which expresses the result of the operation
   * @apiSuccess {Candidature} candidature The updated candidature
   */
  app.patch('/api/candidatures', auth.isStudent, CandidatureControl.update);

  /**
   * @api {DELETE} /api/candidatures/:notice Removes a candidature
   * @apiName Delete
   * @apiGroup Candidature
   * @apiPermission Student
   * @apiParam {string} notice The notice protocol
   * @apiSuccess {boolean} status Boolean which expresses the result of the operation
   */
  app.delete('/api/candidatures', auth.isStudent, CandidatureControl.delete);

  /**
   * @api {GET} /api/candidatures Searches candidatures
   * @apiName Search
   * @apiGroup Candidature
   * @apiPermission Teaching Office, Student
   * @apiParam {string} student The email of the student
   * @apiParam {string} protocol The notice protocol
   * @apiSuccess {Candidature[]} candidatures The list of the candidatures, which respect the search criteria
   */
  app.get('/api/candidatures', CandidatureControl.search);

  /**
   * @api {POST} /api/candidatures Gets a document
   * @apiName DowloadDocument
   * @apiGroup Candidature
   * @apiPermission Teaching Office
   * @apiParam {Candidature} candidature A candidature
   * @apiParam {string} fileName The fileName of a document of the given candidature
   * @apiSuccess {Blob} Stream of byte of the document
   */
  app.post('/api/candidatures', auth.isTeachingOffice, CandidatureControl.dowloadDocumentFile);
};
