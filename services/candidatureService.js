const CandidatureControl = require('../controllers/candidatureControl');
const cors = require('cors');

module.exports = (app, auth) => {
  app.use('/api/candidatures', auth.authenticate());

  /**
   * @api {OBJECT} Candidature Candidature
   * @apiGroup Candidature
   * @apiParam {[Student](#-api-Authentication-ObjectStudent)} student The student of the candidature
   * @apiParam {string} notice_protocol The protocol of the notice
   * @apiParam {string="Editable","In Evaluation","Rejected","In Graded List"} state The state of the notice
   * @apiParam {date} last_edit The date of the last edit
   * @apiParam {[Document](#api-Candidature-ObjectDocument)[]} documents The list of the documents
   */

  /**
   * @api {OBJECT} Document Document
   * @apiGroup Candidature
   * @apiParam {string} student The email of the student
   * @apiParam {string} notice_protocol The protocol of the notice
   * @apiParam {string} file_name The name of the file
   * @apiParam {Blob} file The uploaded file
  */

  /**
   * @api {PUT} /api/candidatures Creates a new candidature
   * @apiName Create
   * @apiGroup Candidature
   * @apiPermission Student
   * @apiParam {[Candidature](#api-Candidature-ObjectCandidature)} candidature The candidature to create
   * @apiSuccess {boolean} status Boolean which expresses the result of the operation
   */
  app.put('/api/candidatures', auth.isStudent, CandidatureControl.create);

  /**
   * @api {PATCH} /api/candidatures Updates a candidature
   * @apiName Update
   * @apiGroup Candidature
   * @apiPermission Student, Teaching Office
   * @apiParam {[Candidature](#api-Candidature-ObjectCandidature)} candidature The candidature to update [The Teaching office can only update the state of a candidature]
   * @apiSuccess {boolean} status Boolean which expresses the result of the operation
   * @apiSuccess {[Candidature](#api-Candidature-ObjectCandidature)} candidature The updated candidature
   */
  app.patch('/api/candidatures', CandidatureControl.update);

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
   * @apiPermission Teaching Office, Student, Professor
   * @apiParam {string} student The email of the student
   * @apiParam {string} protocol The notice protocol
   * @apiSuccess {[Candidature](#api-Candidature-ObjectCandidature)[]} candidatures The list of the candidatures, which respect the search criteria
   */
  app.get('/api/candidatures', CandidatureControl.search);

  /**
   * @api {POST} /api/candidatures Gets a document
   * @apiName DownloadDocument
   * @apiGroup Candidature
   * @apiPermission Teaching Office
   * @apiParam {[Candidature](#api-Candidature-ObjectCandidature)} candidature A candidature
   * @apiParam {string} fileName The fileName of a document of the given candidature
   * @apiSuccess {Blob} Stream of byte of the document
   */
  app.post('/api/candidatures', cors({exposedHeaders: ['Content-Disposition']}), auth.isTeachingOffice, CandidatureControl.dowloadDocumentFile);

  /**
   * @api {POST} /api/candidatures/all Gets all documents for a candidature
   * @apiName DownloadDocuments
   * @apiGroup Candidature
   * @apiPermission Teaching Office
   * @apiParam {[Candidature](#api-Candidature-ObjectCandidature)} candidature A candidature
   * @apiSuccess {Blob} Stream of byte of the documents
   */
  app.post('/api/candidatures/all', cors({exposedHeaders: ['Content-Disposition']}), auth.isTeachingOffice, CandidatureControl.dowloadDocuments);
};
