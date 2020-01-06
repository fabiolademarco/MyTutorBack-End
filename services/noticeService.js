const NoticeControl = require('../controllers/noticeControl');

module.exports = (app, auth) => {
  /**
   * @api {GET} /api/notices/:protocol Request Specified Notices
   * @apiName GetNotice
   * @apiGroup Notice
   * @apiPermission everyone
   *
   * @apiParam {String} protocol Notice unique protocol, can be part of a protocol
   *
   * @apiSuccess {Object[]} notice Notices having the specified protocol as a substring
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
   * @apiSuccess {Object[]} notices All Notices the user is authorized to access
   */
  app.get('/api/notices', auth.setUser, NoticeControl.findAll);

  /**
   * @api {PUT} /api/notices Creates Notice
   * @apiName PutNotice
   * @apiGroup Notice
   * @apiPermission Teaching Office
   *
   * @apiParam {Object} notice Notice to be created
   *
   * @apiSuccess {Object} notices The created Notice
   */
  app.put('/api/notices', auth.isTeachingOffice, NoticeControl.create);

  /**
   * @api {PATCH} /api/notices Updates Notice
   * @apiName PatchNotice
   * @apiGroup Notice
   * @apiPermission Teaching Office
   *
   * @apiParam {Object} notice Notice to be updated
   *
   * @apiSuccess {Object} notices The updated Notice
   */
  app.patch('/api/notices', auth.isTeachingOffice, NoticeControl.update);

  /**
   * @api {PATCH} /api/notices/state Updates Notice State
   * @apiName PatchState
   * @apiGroup Notice
   * @apiPermission Teaching Office, Professor, DDI
   *
   * @apiParam {Object} notice Notice which state must be changed
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
  app.get('/api/notices/pdf/:protocol', auth.setUser, NoticeControl.downloadNotice);

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
  app.get('/api/notices/grades/pdf/:protocol', NoticeControl.downloadGradedList);

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
