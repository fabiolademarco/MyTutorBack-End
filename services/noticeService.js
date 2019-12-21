const NoticeControl = require('../controllers/noticeControl');

module.exports = (app) => {
  app.get('/api/notices/:id', NoticeControl.find);
  app.delete('/api/notices/:id', NoticeControl.delete);
  app.get('/api/notices', NoticeControl.findAll);
  app.put('/api/notices', NoticeControl.create);
  app.patch('/api/notices', NoticeControl.update);
  app.patch('/api/notices/state', NoticeControl.setStatus);
  app.post('/api/notices/search', NoticeControl.search);
  app.get('/api/notices/:id/pdf', NoticeControl.downloadNotice);
  app.put('/api/notices/:id/pdf', NoticeControl.uploadNotice);
  app.get('/api/notices/:id/grades', NoticeControl.downloadGradedList);
  app.put('/api/notices/:id/grades', NoticeControl.uploadGradedList);
};
