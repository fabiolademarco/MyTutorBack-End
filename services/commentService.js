const CommentControl = require('../controllers/commentControl');

module.exports = (app, auth) => {
  app.use('/api/comment', auth.authenticate());

  /**
   * @api {OBJECT} Comment Comment
   * @apiGroup Comment
   * @apiParam {string} notice The notice protocol
   * @apiParam {string} author The email of the author
   * @apiParam {string} text The body of the comment
   */

  /**
   * @api {PUT} /api/comment Creates a comment
   * @apiName Create
   * @apiGroup Comment
   * @apiPermission DDI, Professor
   * @apiParam {[Comment](#api-Comment-ObjectComment)} comment The comment to create
   * @apiSuccess {[Comment](#api-Comment-ObjectComment)} comment The created comment
   */
  app.put('/api/comment', CommentControl.set);

  /**
   * @api {DELETE} /api/comment/:id Removes a comment
   * @apiName Delete
   * @apiGroup Comment
   * @apiPermission Teaching Office
   * @apiParam {string} id The notice protocol of the comment to remove
   * @apiSuccess {[Comment](#api-Comment-ObjectComment)} comment The removed comment
   */
  app.delete('/api/comment/:id', auth.isTeachingOffice, CommentControl.delete);

  /**
   * @api {POST} /api/comment Finds a comment
   * @apiName Get
   * @apiGroup Comment
   * @apiPermission Teaching Office
   * @apiParam {string} noticeProtocol The notice protocol of the comment to find
   * @apiSuccess {[Comment](#api-Comment-ObjectComment)} comment The comment with the given noticeProtocol
   */
  app.post('/api/comment', auth.isTeachingOffice, CommentControl.get);
};
