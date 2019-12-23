
/*
 * UserControl
 *
 * This module represents the User Controller
 *
 * @author Giannandrea Vicidomini
 * @version
 * @since
 *
 * 2019 - Copyright by Gang Of Four Eyes
*/

const User=require('../models/user');
const OK_STATUS = 200;
const ERR_CLIENT_STATUS = 412;
const ERR_SERVER_STATUS = 500;
/*
+delete(u : Utente): boolean
+search(param : string): List<Utente>
+update(u : Utente): Utente
+find(email : string): Utente
+findAll(): List<Utente>

*/

/**
 * @param {Request} req
 * @param {Response} res
 */
module.exports.delete=function(req, res) {
  res.set('Content-Type', 'application/json');
  const user=req.body;
};

/**
 * @param {Request} req
 * @param {Response} res
 */
module.exports.search=function(req, res) {
  res.set('Content-Type', 'application/json');
  const param=req.body;
};

/**
 * @param {Request} req
 * @param {Response} res
 */
module.exports.update=function(req, res) {
  res.set('Content-Type', 'application/json');
  const user=req.body;
};

/**
 * @param {Request} req
 * @param {Response} res
 */
module.exports.find=function(req, res) {
  res.set('Content-Type', 'application/json');
  const email=req.body;
};

/**
 * @param {Request} req
 * @param {Response} res
 */
module.exports.findAll=function(req, res) {
  res.set('Content-Type', 'application/json');
};
