/**
 * EvaluationCriterion
 *
 * This class represents an evaluation criterion
 *
 * @author Francesco Migliaro
 * @version
 * @since
 *
 * 2019 - Copyright by Gang Of Four Eyes
 */

const pool = require('../db');

const table = 'evaulation_criterion';

/**
 * EvaluationCriterion object constructor
 * @param {EvaluationCriterion} evaluationCriterion The JS object that contains
 *                                                   fields for setting new
 *                                                   EvaluationCriterion object
 */
const EvalutationCriterion = function(evaluationCriterion) {
  this.noticeProtocol = evaluationCriterion.noticeProtocol;
  this.name = evaluationCriterion.name;
  this.maxScore = evaluationCriterion.maxScore;
};

/**
 * Creates a new evaluation criterion in database.
 * @param {EvaluationCriterion} evaluationCriterion The evaluation criterion
 *                                                  to save.
 * @param {callback} result The callback that handle the response.
 */
EvalutationCriterion.create = (evaluationCriterion, result) => {
  pool.query(`INSERT INTO ${table}
              SET ?`,
  evaluationCriterion,
  (err, data) => {
    if (err) {
      return result(err, null);
    }

    result(null, data);
  });
};

/**
 * Update an evaluation criterion in database.
 * @param {EvaluationCriterion} evaluationCriterion The evaluation criterion
 *                                                  to save.
 * @param {callback} result The callback that handles the response.
 */
EvalutationCriterion.update = (evaluationCriterion, result) => {
  pool.query(`UPDATE ${table}
              SET ?
              WHERE name = ? AND notice_protocol = ?`,
  [evaluationCriterion,
    evaluationCriterion.name,
    evaluationCriterion.noticeProtocol],
  (err, data) => {
    if (err) {
      return result(err, null);
    }

    result(null, data);
  });
};

/**
 * Remove an evaluation criterion from database.
 * @param {EvaluationCriterion} evaluationCriterion The evaluation criterion
 *                                                  to remove.
 * @param {callback} result The callback that handles the response.
 */
EvalutationCriterion.remove = (evaluationCriterion, result) => {
  pool.query(`DELETE
            FROM ${table}
            WHERE name = ? AND notice_protocol = ?`,
  [evaluationCriterion.name,
    evaluationCriterion.noticeProtocol],
  (err, data) => {
    if (err) {
      return result(err, null);
    }

    result(null, data);
  },
  );
};

/**
 * Find the evaluation criterion with the specific id.
 * @param {string} name The name of the evaluation criterion.
 * @param {string} noticeProtocol The protocol of the notice
 *                                to which the evaluation criterion
 *                                is related.
 * @param {callback} result The callback that handles the response.
 */
EvalutationCriterion.findById = (name, noticeProtocol, result) => {
  pool.query(`SELECT *
              FROM ${table}
              WHERE notice_protocol = ?
                AND name = ?`,
  [noticeProtocol,
    name],
  (err, data) => {
    if (err) {
      return result(err, null);
    }

    result(null, data);
  });
};

/**
 * Finds the evaluation criterions correlate to the specified notice.
 * @param {string} noticeProtocol The protocol of the notice.
 * @param {callback} result The callback that handles the response.
 */
EvalutationCriterion.findByNotice = (noticeProtocol, result) => {
  pool.query(`SELECT *
              FROM ${table}
              WHERE notice_protocol = ?`,
  noticeProtocol,
  (err, data) => {
    if (err) {
      return result(err. null);
    }

    result(null, data);
  });
};

EvalutationCriterion.findAll = (result) =>{
  pool.query(`SELECT *
              FROM ${table}`,
  (err, data) =>{
    if (err) {
      return result(err, null);
    }

    result(null, data);
  });
};

/**
 * Check if an evaluation criterion exists.
 * @param {EvaluationCriterion} evaluationCriterion The evaluation criterion
 *                                                  to check.
 * @param {callback} result The callback that handles the response.
 */
EvalutationCriterion.exists = (evaluationCriterion, result) =>{
  pool.query(`SELECT *
              FROM ${table}
              WHERE notice_protocol = ?
                AND name = ?`,
  [evaluationCriterion.noticeProtocol,
    evaluationCriterion.name],
  (err, data) => {
    if (err) {
      return result(err, null);
    }

    result(null, data.length > 0);
  });
};

module.exports = EvalutationCriterion;
