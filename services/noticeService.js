const NoticeControl = require('../controllers/noticeControl');

module.exports = (app, auth) => {
  app.get('/api/notices/:id', auth.setUser, NoticeControl.find);

  app.delete('/api/notices/:id', auth.authenticate(), auth.isTeachingOffice, NoticeControl.delete);

  app.put(/\/api\/notices\.*/, auth.authenticate());
  app.patch(/\/api\/notices\.*/, auth.authenticate());

  app.get('/api/notices', auth.setUser, NoticeControl.findAll);

  app.put('/api/notices', auth.isTeachingOffice, NoticeControl.create);

  app.patch('/api/notices', auth.isTeachingOffice, NoticeControl.update);


  app.patch('/api/notices/state', NoticeControl.setStatus);


  app.post('/api/notices/search', auth.setUser, NoticeControl.search);


  app.get('/api/notices/:id/pdf', NoticeControl.downloadNotice); // Probabilmente anche questo è in conflitto

  app.put('/api/notices/:id/pdf', auth.isDDI, NoticeControl.uploadNotice);


  app.get('/api/notices/:id/grades', NoticeControl.downloadGradedList); // Probabilmente anche questo è in conflitto

  app.put('/api/notices/:id/grades', auth.isDDI, NoticeControl.uploadGradedList);
};
