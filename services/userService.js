const UserControl=require('../controllers/userControl');

module.exports=function(app, auth) {
/**
 * @todo Controllare bene chi è autorizzato a fare cosa
*/
  app.use(/\/api\/users.*/, auth.authenticate());

  /**
   * @api {DELETE} /api/users/:id Delete User
   * @apiName Delete user
   * @apiGroup User
   * @apiPermission Teaching Office
   * @apiParam {User} user User, with email and password,who wants to do the login in the system.
   * @apiSuccess {User} user The user who logged in the system.
   * @apiSuccess {boolean} status The status of the operation.
   * @apiSuccess {string} token The jwt token for authorization.
   */
  app.delete('/api/users/:id', auth.isTeachingOffice, UserControl.delete);
  app.get('/api/users/:id', UserControl.find);
  app.patch('/api/users', UserControl.update);
  app.post('/api/users/search', auth.isTeachingOffice, UserControl.search);
  app.get('/api/users', auth.isTeachingOffice, UserControl.findAll);
};
