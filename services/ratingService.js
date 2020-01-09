const RatingControl = require('../controllers/ratingControl');

module.exports = (app, auth) => {
  app.use(/\/api\/ratings\.*/, auth.authenticate());

  /**
   * @api {OBJECT} Rating Rating
   * @apiGroup Rating
   * @apiParam {[Student](#api-Authentication-ObjectStudent)} student The Student object
   * @apiParam {Number} assignment_id The id of its assignment
   * @apiParam {Number} titles_score The score of the rating
   * @apiParam {Number} interview_score The score of the interview
   */

  /**
   * @api {PUT} /api/ratings Creates Specified Rating Table
   * @apiName CreateTable
   * @apiGroup Rating
   * @apiPermission Professor
   *
   * @apiParam {[Rating](#api-Rating-ObjectRating)[]} ratingList The list of ratigs from which to create the table
   * @apiSuccess {boolean} result boolean representing the result of the operation
   */
  app.put('/api/ratings', RatingControl.createTable);

  /**
   * @api {POST} /api/ratings Retrieves Specified Rating Table
   * @apiName getTable
   * @apiGroup Rating
   * @apiPermission Teaching Office
   *
   * @apiParam {string} noticeProtocol The protocol to retrieve the related rating list
   * @apiSuccess {[Rating](#api-Rating-ObjectRating)[]} result The list of rating as per specified according to the protocol
   */
  app.post('/api/ratings', RatingControl.getTable);

  /**
   * @api {POST} /api/ratings/exists Check if Specified Rating Table exists
   * @apiName existsTable
   * @apiGroup Rating
   * @apiPermission Teaching Office
   *
   * @apiParam {string} noticeProtocol The protocol to check if the related rating table exists
   * @apiSuccess {boolean} exists True if the rating table exists
   */
  app.post('/api/ratings/exists', auth.isTeachingOffice, RatingControl.exists);
};
