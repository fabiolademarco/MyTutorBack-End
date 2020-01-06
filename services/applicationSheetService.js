const ApplicationSheetControl = require('../controllers/applicationSheetControl');

module.exports = (app, auth) => {
  app.use('/api/applicationsheet', auth.authenticate(), auth.isTeachingOffice);

  /**
   * @api {PUT} /api/applicationsheet Creates an applicationsheet
   * @apiName Create
   * @apiGroup ApplicationSheet
   * @apiPermission Teaching Office
   * @apiParam {ApplicationSheet} applicationSheet The applicationSheet to create
   * @apiSuccess {boolean} status Boolean representing the result of the operation
   */
  app.put('/api/applicationsheet', ApplicationSheetControl.create);

  /**
   * @api {PATCH} /api/applicationsheet Updates an applicationsheet
   * @apiName Update
   * @apiGroup ApplicationSheet
   * @apiPermission Teaching Office
   * @apiParam {ApplicationSheet} applicationSheet The applicationSheet to update
   * @apiSuccess {ApplicationSheet} applicationSheet The updated applicationSheet
   */
  app.patch('/api/applicationsheet', ApplicationSheetControl.update);

  /**
   * @api {DELETE} /api/applicationsheet/:id Removes an applicationsheet
   * @apiName Delete
   * @apiGroup ApplicationSheet
   * @apiPermission Teaching Office
   * @apiParam {string} id The notice of the applicationSheet to remove
   * @apiSuccess {boolean} status Boolean representing the result of the operation
   */
  app.delete('/api/applicationsheet/:id', ApplicationSheetControl.delete);
};
