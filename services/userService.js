const UserControl=require('../controllers/userControl');

module.exports=function(app, auth) {
/**
 * @todo Controllare bene chi è autorizzato a fare cosa
*/
  app.use(/\/api\/users.*/, auth.authenticate());

  /**
   * @api {DELETE} /api/users Removes User
   * @apiName DeleteUser
   * @apiGroup User
   * @apiPermission Teaching Office
   * @apiParam {User} user The user to delete
   * @apiSuccess {boolean} status The status of the operation.
   */
  app.delete('/api/users', auth.isTeachingOffice, UserControl.delete);
  /**
   * @api {GET} /api/users/:id Find an user
   * @apiName FindUser
   * @apiGroup User
   * @apiPermission User
   * @apiParam {string} id The email of the user
   * @apiSuccess {User} user The user with the given id
   */
  app.get('/api/users/:id', UserControl.find);
  /**
   * @api {PATCH} /api/users Updates an User
   * @apiName UpdateUser
   * @apiGroup User
   * @apiPermission User
   * @apiParam {User} user The user to update
   * @apiSuccess {User} user The updated User
   */
  app.patch('/api/users', UserControl.update);
  /**
   * @api {POST} /api/users/search Searches users
   * @apiName SearchUser
   * @apiGroup User
   * @apiPermission Teaching Office
   * @apiParam {Object} param Object with name, surname, role or verified to do the search
   * @apiSuccess {User[]} list List of the searched users
   */
  app.post('/api/users/search', auth.isTeachingOffice, UserControl.search);
  /**
   * @api {GET} /api/users Finds all users
   * @apiName FindAll
   * @apiGroup User
   * @apiPermission Teaching Office
   * @apiSuccess {User[]} list List of all users
   */
  app.get('/api/users', auth.isTeachingOffice, UserControl.findAll);
};
