const NoticeControl = require('../controllers/noticeControl');

module.exports = (app, auth) => {
  app.get('/api/notices/:id', auth.setUser, NoticeControl.find);

  app.delete('/api/notices/:id', auth.authenticate(), auth.isTeachingOffice, NoticeControl.delete);


  app.get('/api/notices', auth.authenticate());
  app.get('/api/notices', auth.isTeachingOffice, NoticeControl.findAll);

  app.put('/api/notices', auth.isTeachingOffice, NoticeControl.create);

  app.patch('/api/notices', auth.isTeachingOffice, NoticeControl.update);


  app.patch('/api/notices/state', auth.authenticate(), NoticeControl.setStatus);


  app.post('/api/notices/search', NoticeControl.search);


  app.get('/api/notices/:id/pdf', NoticeControl.downloadNotice);

  app.put('/api/notices/:id/pdf', auth.authenticate(), auth.isDDI, NoticeControl.uploadNotice);


  app.get('/api/notices/:id/grades', NoticeControl.downloadGradedList);

  app.put('/api/notices/:id/grades', auth.authenticate(), auth.isDDI, NoticeControl.uploadGradedList);
};
