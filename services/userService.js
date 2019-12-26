const UserControl=require('../controllers/userControl');

module.exports=function(app, auth) {
/**
 * @todo Controllare bene chi è autorizzato a fare cosa
*/
  app.use('/api/users', auth.authenticate());

  app.delete('/api/users/:id', auth.isTeachingOffice, UserControl.delete);
  app.get('/api/users/:id', UserControl.find);
  app.patch('/api/users', UserControl.update);
  app.post('/api/users/search', auth.isTeachingOffice, UserControl.search);
  app.get('/api/users', auth.isTeachingOffice, UserControl.findAll);
};
