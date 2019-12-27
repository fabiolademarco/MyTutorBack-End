const Rating=require('../models/rating');
const OK_STATUS = 200;
const ERR_CLIENT_STATUS = 412;
const ERR_SERVER_STATUS = 500;

/**
 * Rating Control
 *
 * This class represents the Rating Controller
 *
 * @module
 * @author Giannandrea Vicidomini
 *
 *
 * @copyright 2019 - Copyright by Gang Of Four Eyes
 */


/**
 * @param {Request} req
 * @param {Response} res
 */
module.exports.createTable=function(req, res) {
  const ratingList=req.body.ratingList;
  if (ratingList==null) {
    res.status(ERR_CLIENT_STATUS).send({error: 'La rating list non può essere nulla'});
    return;
  }
};


/**
 * @param {Request} req
 * @param {Response} res
 */
module.exports.getTable=function(req, res) {

};
