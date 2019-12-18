const NoticeControl = require('../controllers/noticeControl');

module.exports = (app) => {
  app.put('/api/notice/create', NoticeControl.create);
  app.put('/api/notice/update', NoticeControl.update);
  app.put('/api/notice/set_status', NoticeControl.setStatus);
  app.get('/api/notice/delete', NoticeControl.delete);
  app.get('/api/notice/search', NoticeControl.search);
  app.get('/api/notice/all', NoticeControl.findAll);
  app.get('/api/notice/protocol', NoticeControl.find);
  app.get('/api/notice/download_notice', NoticeControl.downloadNotice);
  app.put('/api/notice/upload_notice', NoticeControl.uploadNotice);
  app.get('/api/notice/download_graded_list', NoticeControl.downloadGradedList);
  app.put('/api/notice/upload_graded_list', NoticeControl.uploadGradedList);
};
