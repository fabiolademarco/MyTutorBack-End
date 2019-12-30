const ApplicationSheetControl = require('../controllers/applicationSheetControl');

module.exports = (app, auth) => {
  app.use('/api/applicationsheet', auth.authenticate(), auth.isTeachingOoffice);
  app.put('/api/applicationsheet', ApplicationSheetControl.create);
  app.patch('/api/applicationsheet', ApplicationSheetControl.update);
  app.delete('/api/applicationsheet', ApplicationSheetControl.delete);
};
