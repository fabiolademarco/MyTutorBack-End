const UserControl = require('../controllers/userControl');

module.exports = function(app, auth) {
/**
 * @todo Controllare bene chi è autorizzato a fare cosa
*/
  app.use(/\/api\/users.*/, auth.authenticate());

  /**
   * @api {OBJECT} UserFilter
   * @apiGroup User
   * @apiParam {string} email The user email
   * @apiParam {string} name The user name
   * @apiParam {string} surname The user surname
   * @apiParam {string="Student","Professor","DDI","TeachingOffice"} role User role
   * @apiParam {int="1","0"} verified
   */

  /**
   * @api {DELETE} /api/users/:id Removes User
   * @apiName DeleteUser
   * @apiGroup User
   * @apiPermission Teaching Office
   * @apiParam {string} id The user email
   * @apiSuccess {boolean} status The status of the operation.
   */
  app.delete('/api/users/:id', auth.isTeachingOffice, UserControl.delete);
  /**
   * @api {GET} /api/users/:id Find an user
   * @apiName FindUser
   * @apiGroup User
   * @apiPermission User
   * @apiParam {string} id The email of the user
   * @apiSuccess {[User](#api-Authentication-ObjectUser)} user The user with the given id
   */
  app.get('/api/users/:id', UserControl.find);
  /**
   * @api {PATCH} /api/users Updates an User
   * @apiName UpdateUser
   * @apiGroup User
   * @apiPermission User
   * @apiParam {[User](#api-Authentication-ObjectUser)} user The user to update
   * @apiSuccess {[User](#api-Authentication-ObjectUser)} user The updated User
   */
  app.patch('/api/users', UserControl.update);
  /**
   * @api {POST} /api/users/search Searches users
   * @apiName SearchUser
   * @apiGroup User
   * @apiPermission Teaching Office
   * @apiParam {[UserFilter](#api-User-ObjectUserFilter)} param The param of the search
   * @apiSuccess {[User](#api-Authentication-ObjectUser)[]} list List of the searched users
   */
  app.post('/api/users/search', auth.isTeachingOffice, UserControl.search);
  /**
   * @api {GET} /api/users Finds all users
   * @apiName FindAll
   * @apiGroup User
   * @apiPermission Teaching Office
   * @apiSuccess {[User](#api-Authentication-ObjectUser)[]} list List of all users
   */
  app.get('/api/users', auth.isTeachingOffice, UserControl.findAll);
};
