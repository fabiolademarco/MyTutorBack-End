const NoticeControl = require('../controllers/noticeControl');
const cors = require('cors');

module.exports = (app, auth) => {
  /**
   * @api {OBJECT} Notice Notice
   * @apiGroup Notice
   * @apiParam {string} protocol The notice key
   * @apiParam {string} referent_professor The email of the referent professor
   * @apiParam {string} description A short description of notice
   * @apiParam {string} notice_subject The subject of the notice
   * @apiParam {string} admission_requirements A text containing the admission requirements
   * @apiParam {string} assessable_titles A text containing the assessable titles
   * @apiParam {string} how_to_submit_applications A text describing how to submit the application
   * @apiParam {string} selection_board A text containing information about selection board
   * @apiParam {string} acceptance A text describing how to accept the assignments
   * @apiParam {string} incompatibility A text describing the incompatibility about the current notice
   * @apiParam {string} termination_of_the_assignment A text describing the ways of an assignment termination
   * @apiParam {string} nature_of_the_assignment A text containing the nature of the assignment
   * @apiParam {string} unused_funds A text describing how the unsed_funds will be use
   * @apiParam {string} responsible_for_the_procedure A text describing the responsible for the notice procedure
   * @apiParam {number} notice_funds Represents the notice funds
   * @apiParam {string="Draft","In Acceptance","Accepted","In Approval","Approved","Published","Expired","Waiting for Graded List","Closed"} state The state of the notice
   * @apiParam {string="Help Teaching", "Tutoring"} type Represents the type of the notice
   * @apiParam {date} deadline Represents the deadline to present the applications
   * @apiParam {string} notice_file The name of the notice pdf
   * @apiParam {string} graded_list_file The name of the notice graded list
   * @apiParam {[Article](#api-Notice-ObjectArticle)[]} articles The list of notice articles
   * @apiParam {[EvaluationCriterion](#api-Notice-ObjectEvaluationcriterion)[]} evaluation_criteria The list of notice evaluation criteria
   * @apiParam {[ApplicationSheet](#api-ApplicationSheet-ObjectApplicationsheet)} application_sheet The application sheet of the notice
   * @apiParam {[Assignment](#api-Assignment-ObjectAssignment)[]} The list of assignments
   * @apiParam {[Comment](#api-Comment-ObjectComment)} comment A comment about the notice
   */

  /**
   * @api {OBJECT} Article Article
   * @apiGroup Notice
   * @apiParam {number} id The key of the article
   * @apiParam {string} notice_protocol The protocol of the notice which article belongs
   * @apiParam {string} text A text describing the article
   * @apiParam {string} initial A short text containing the initial of the article
   */

  /**
   * @api {OBJECT} EvaluationCriterion EvaluationCriterion
   * @apiGroup Notice
   * @apiParam {string} notice_protocol The protocol of the notice which the evaluation criterion belongs
   * @apiParam {string} name The key of the evaluation criterion
   * @apiParam {number} max_score The max score of the criterion
   */


  /**
   * @api {GET} /api/notices/:protocol Request Specified Notices
   * @apiName GetNotice
   * @apiGroup Notice
   * @apiPermission everyone
   *
   * @apiParam {String} protocol Notice unique protocol, can be part of a protocol
   *
   * @apiSuccess {[Notice](#api-Notice-ObjectNotice)[]} notice Notices having the specified protocol as a substring
   */
  app.get('/api/notices/:protocol', auth.setUser, NoticeControl.find);

  /**
   * @api {DELETE} /api/notices/:protocol Deletes Notice
   * @apiName DeleteNotice
   * @apiGroup Notice
   * @apiPermission Teaching Office
   *
   * @apiParam {String} protocol Notice unique protocol
   *
   * @apiSuccess {boolean} success Boolean which is true if the Notice was deleted, false otherwise
   * @apiSuccess {String} message Message describing what happened
   */
  app.delete('/api/notices/:id', auth.authenticate(), auth.isTeachingOffice, NoticeControl.delete);

  app.put(/\/api\/notices\.*/, auth.authenticate());
  app.patch(/\/api\/notices\.*/, auth.authenticate());

  /**
   * @api {GET} /api/notices Request Authorized Notices
   * @apiName GetAuthorizedNotices
   * @apiGroup Notice
   * @apiPermission everyone
   *
   * @apiSuccess {[Notice](#api-Notice-ObjectNotice)[]} notices All Notices the user is authorized to access
   */
  app.get('/api/notices', auth.setUser, NoticeControl.findAll);

  /**
   * @api {PUT} /api/notices Creates Notice
   * @apiName PutNotice
   * @apiGroup Notice
   * @apiPermission Teaching Office
   *
   * @apiParam {[Notice](#api-Notice-ObjectNotice)} notice Notice to be created
   *
   * @apiSuccess {[Notice](#api-Notice-ObjectNotice)} notices The created Notice
   */
  app.put('/api/notices', auth.isTeachingOffice, NoticeControl.create);

  /**
   * @api {PATCH} /api/notices Updates Notice
   * @apiName PatchNotice
   * @apiGroup Notice
   * @apiPermission Teaching Office
   *
   * @apiParam {[Notice](#api-Notice-ObjectNotice)} notice Notice to be updated
   *
   * @apiSuccess {[Notice](#api-Notice-ObjectNotice)} notices The updated Notice
   */
  app.patch('/api/notices', auth.isTeachingOffice, NoticeControl.update);

  /**
   * @api {PATCH} /api/notices/state Updates Notice State
   * @apiName PatchState
   * @apiGroup Notice
   * @apiPermission Teaching Office, Professor, DDI
   *
   * @apiParam {[Notice](#api-Notice-ObjectNotice)} notice Notice which state must be changed
   */
  app.patch('/api/notices/state', auth.setUser, NoticeControl.setState);

  /**
   * @api {POST} /api/notices/search Searches Notice
   * @apiName PostSearch
   * @apiGroup Notice
   * @apiPermission everyone
   *
   * @apiParam {String} [protocol] Part or all notice protocol
   * @apiParam {String} [state] One state that should be searched
   * @apiParam {String} [professor] Professor email
   * @apiParam {String} [type] Type of notice
   */
  app.post('/api/notices/search', auth.setUser, NoticeControl.search);

  /**
   * @api {GET} /api/notices/pdf/:protocol Downloads Notice pdf
   * @apiName GetNoticePdf
   * @apiGroup Notice
   * @apiPermission everyone
   *
   * @apiParam {String} protocol A notice protocol
   */
  app.get('/api/notices/pdf/:protocol', cors({exposedHeaders: ['Content-Disposition']}), auth.setUser, NoticeControl.downloadNotice);

  /**
   * @api {PUT} /api/notices/pdf/:protocol Upload Signed Notice pdf
   * @apiName PutNoticePdf
   * @apiGroup Notice
   * @apiPermission everyone
   *
   * @apiParam {String} protocol A notice protocol
   * @apiParam {String} notice A base64 encoded string representing the signed notice pdf
   */
  app.put('/api/notices/pdf/:protocol', auth.isDDI, NoticeControl.uploadNotice);

  /**
   * @api {GET} /api/notices/grades/pdf/:protocol Downloads Graded List pdf
   * @apiName GetGradedListPdf
   * @apiGroup Notice
   * @apiPermission everyone
   *
   * @apiParam {String} protocol A notice protocol
   */
  app.get('/api/notices/grades/pdf/:protocol', cors({exposedHeaders: ['Content-Disposition']}), auth.setUser, NoticeControl.downloadGradedList);

  /**
   * @api {PUT} /api/notices/grades/pdf/:protocol Upload Signed Graded List pdf
   * @apiName PutGradedListPdf
   * @apiGroup Notice
   * @apiPermission everyone
   *
   * @apiParam {String} protocol A notice protocol
   * @apiParam {String} gradedList A base64 encoded string representing the signed graded list pdf
   */
  app.put('/api/notices/grades/pdf/:protocol', auth.isDDI, NoticeControl.uploadGradedList);
};
