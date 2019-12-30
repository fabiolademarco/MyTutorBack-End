const CommentControl = require('../controllers/commentControl');

module.exports = (app, auth) => {
  app.use('/api/comment', auth.authenticate());
  app.put('/api/comment', CommentControl.set);
  app.delete('/api/comment', auth.isTeachingOffice, CommentControl.delete);
  app.post('/api/comment', auth.isTeachingOffice, CommentControl.get);
};
