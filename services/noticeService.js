const NoticeControl = require('../controllers/noticeControl');

module.exports = (app, auth) => {
  /**
   * @api {GET} /api/notices/:id Request Specified Notices
   * @apiName GetNotice
   * @apiGroup Notice
   * @apiPermission everyone
   *
   * @apiParam {String} protocol Notice unique protocol, can be part of a protocol
   *
   * @apiSuccess {Object[]} notice Notices having the specified protocol as a substring
   */
  app.get('/api/notices/:id', auth.setUser, NoticeControl.find);

  /**
   * @api {DELETE} /api/notices/:id Deletes Notice
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
  app.patch('/api/notices/state', NoticeControl.setStatus);

  /**
   * @api {POST} /api/notices/search Searches Notice
   * @apiName PostSearch
   * @apiGroup Notice
   * @apiPermission everyone
   *
   * @apiParam {String} protocol [protocol] Part or all notice protocol
   * @apiParam {String} state [state] One state that should be searched
   * @apiParam {String} professor [professor] Professor email
   * @apiParam {String} type [type] Type of notice
   */
  app.post('/api/notices/search', auth.setUser, NoticeControl.search);


  app.get('/api/notices/:id/pdf', NoticeControl.downloadNotice); // Probabilmente anche questo è in conflitto

  app.put('/api/notices/:id/pdf', auth.isDDI, NoticeControl.uploadNotice);


  app.get('/api/notices/:id/grades', NoticeControl.downloadGradedList); // Probabilmente anche questo è in conflitto

  app.put('/api/notices/:id/grades', auth.isDDI, NoticeControl.uploadGradedList);
};
