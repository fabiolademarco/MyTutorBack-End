const Rating = require('../models/rating');
const Candidature = require('../models/candidature');
const Assignment = require('../models/assignment');
const EvaluationCriterion = require('../models/evalutationCriterion');
const check = require('../utils/check');
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
module.exports.createTable = async function(req, res) {
  const ratingList = req.body.ratingList;

  if (ratingList == null) {
    res.status(ERR_CLIENT_STATUS).send({error: 'La lista di valutazioni non può essere nulla'});

    return;
  }
  if (!check.checkRatingList(ratingList)) {
    res.status(ERR_CLIENT_STATUS).send({error: 'Uno o più degli elementi della lista non rispettano il formato'});

    return;
  }
  if (!validateRatings()) {
    res.status(ERR_CLIENT_STATUS).send({error: 'Uno o piu valutazioni della lista non sono valide '});

    return;
  }

  if (!validateRatingsInterviewScore(ratingList)) {
    res.status(ERR_CLIENT_STATUS).send({error: 'Uno o piu valutazioni della lista hanno punteggi non validi'});

    return;
  }
  if (!validateRatingsScore(ratingList)) {
    res.status(ERR_CLIENT_STATUS).send({error: 'Uno o piu valutazioni della lista hanno punteggi non validi'});

    return;
  }

  allPromises = [];
  for (const rating of ratingList) {
    allPromises.push(Rating.create(rating));
  }
  Promise.all(allPromises)
      .then((values) => {
        res.status(OK_STATUS).send({status: true});
      })
      .catch((err) => {
        res.status(ERR_SERVER_STATUS).send({
          status: false,
          error: err,
        });
      });
};


/**
 * @param {Request} req
 * @param {Response} res
 */
module.exports.getTable = async function(req, res) {
  const noticeProtocol = req.body.noticeProtocol;

  if (noticeProtocol == null || check.checkNoticeProtocol(noticeProtocol) == false) {
    res.status(ERR_CLIENT_STATUS).send({error: 'Il protocollo non può essere nullo'});

    return;
  }

  const assignments = await Assignment.findById(noticeProtocol);
  const ratings = [];

  for (const assignment of assignments) {
    ratings.push(Rating.findByAssignment(assignment));
  }
  Promise.all(ratings)
      .then((lists) => {
        const assignments = lists.flatMap((ass) => ass);

        res.status(OK_STATUS).send({result: assignments});
      })
      .catch((err) => {
        res.status(ERR_SERVER_STATUS).send({error: undefined});
      });
};

// UTIL FUNCTIONS
const validateRatings = async function(ratingList) {
  const assignmentId = ratingList[0].assignment_id;
  const assignment = await Assignment.findById(assignmentId);
  const protocollo = assignment.notice_protocol;
  const candidatures = await Candidature.findByNotice(protocollo);

  for (const el of ratingList) {
    if (!candidatures.some((candidature) => candidature.student === el.student)) {
      return false;
    }

    return true;
  }
};

const validateRatingsInterviewScore = function(ratingList) {
  return ratingList.every((el) => el.interview_score >= 0 && el.interview_score <= 60);
};

const validateRatingsScore = async function(ratingList) {
  const assignmentId = ratingList[0].assignment_id;
  const assignment = await Assignment.findById(assignmentId);
  const protocollo = assignment.notice_protocol;
  const criterions = EvaluationCriterion.findByNotice(protocollo);
  const maxValue = criterions[0].maxScore;

  return ratingList.every(((rating) => rating.titles_score >= 0 && rating.titles_score <= maxValue));
};


