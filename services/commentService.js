const CommentControl = require('../controllers/commentControl');

module.exports = (app, auth) => {
  app.use('/api/comment', auth.authenticate());

  /**
   * @api {PUT} /api/comment Creates a comment
   * @apiName Create
   * @apiGroup Comment
   * @apiPermission DDI, Professor
   * @apiParam {Comment} comment The comment to create
   * @apiSuccess {Comment} comment The created comment
   */
  app.put('/api/comment', CommentControl.set);

  /**
   * @api {DELETE} /api/comment Removes a comment
   * @apiName Delete
   * @apiGroup Comment
   * @apiPermission Teaching Office
   * @apiParam {Comment} comment The comment to remove
   * @apiSuccess {Comment} comment The removed comment
   */
  app.delete('/api/comment/:id', auth.isTeachingOffice, CommentControl.delete);

  /**
   * @api {POST} /api/comment Finds a comment
   * @apiName Get
   * @apiGroup Comment
   * @apiPermission Teaching Office
   * @apiParam {string} noticeProtocol The notice protocol of the comment to find
   * @apiSuccess {Comment} comment The comment with the given noticeProtocol
   */
  app.post('/api/comment', auth.isTeachingOffice, CommentControl.get);
};
