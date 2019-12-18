const NoticeControl = require('../controllers/noticeControl');

module.exports = (app) => {
  app.get('/notice/:protocol', NoticeControl.find);
};
