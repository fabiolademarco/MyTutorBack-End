const Rating=require('../models/rating');
const Assignment=require('../models/assignment');
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
  allPromises=[];
  for (const rating of ratingList) {
    allPromises.push(Rating.create(rating));
  }
  Promise.all(allPromises)
      .then((values)=>{
        res.status(OK_STATUS).send({result: true});
      })
      .catch((err)=>{
        res.status(ERR_SERVER_STATUS).send({error: false});
      });
};


/**
 * @param {Request} req
 * @param {Response} res
 */
module.exports.getTable=async function(req, res) {
  const noticeProtocol=req.body.noticeProtocol;
  if (noticeProtocol==null) {
    res.status(ERR_CLIENT_STATUS).send({error: 'Il protocollo non può essere nullo'});
    return;
  }

  const assignments= await Assignment.findById(noticeProtocol);
  const ratings=[];
  for (const assignment of assignments) {
    ratings.push(Rating.findByAssignment(assignment));
  }
  Promise.all(ratings)
      .then((lists)=>{
        const assignments=lists.flatMap((ass)=>ass);
        res.status(OK_STATUS).send({result: assignments});
      })
      .catch((err)=>{
        res.status(ERR_SERVER_STATUS).send({error: undefined});
      });
};
