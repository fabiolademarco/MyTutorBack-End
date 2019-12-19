const NoticeControl = require('../controllers/noticeControl');

module.exports = (app) => {
  app.put('/api/notices/create', NoticeControl.create);
  app.patch('/api/notices/update', NoticeControl.update);
  app.patch('/api/notices/state', NoticeControl.setStatus);
  app.delete('/api/notices/:id', NoticeControl.delete);
  app.post('/api/notices/search', NoticeControl.search);
  app.get('/api/notices/search', NoticeControl.findAll);
  app.get('/api/notices/:id', NoticeControl.find);
  app.get('/api/notices/:id/pdf', NoticeControl.downloadNotice);
  app.put('/api/notices/:id/pdf', NoticeControl.uploadNotice);
  app.get('/api/notices/:id/grades', NoticeControl.downloadGradedList);
  app.put('/api/notices/:id/grades', NoticeControl.uploadGradedList);
};
