const UserControl=require('../controllers/userControl');


module.exports=function(app) {
  app.delete('/api/users/:id', UserControl.delete);
  app.get('/api/users/:id', UserControl.find);
  app.patch('/api/users/', UserControl.update);
  app.post('/api/users/search', UserControl.search);
  app.get('/api/users', UserControl.findAll);
};
