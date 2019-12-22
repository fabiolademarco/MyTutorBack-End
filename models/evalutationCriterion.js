
const pool = require('../db');

const table = 'evaluation_criterion';

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
class EvalutationCriterion {
  /**
 * EvaluationCriterion object constructor
 * @param {EvaluationCriterion} evaluationCriterion The JS object that contains
 *                                                   fields for setting new
 *                                                   EvaluationCriterion object
 */
  constructor(evaluationCriterion) {
    this.notice_protocol = evaluationCriterion.notice_protocol;
    this.name = evaluationCriterion.name;
    this.maxScore = evaluationCriterion.max_score;
  }

  /**
   * Creates a new evaluation criterion in the database.
   * @param {EvaluationCriterion} evaluationCriterion The evaluation criterion
   *                                                  to save.
   * @return {Promise} Promise representing the future fulfillment of the evaluation criterion creation
   */
  static create(evaluationCriterion) {
    return pool.query(`INSERT INTO ${table}
              SET ?`, evaluationCriterion)
        .then((data) => {
          return data;
        })
        .catch((err) => {
          throw err;
        });
  }
  /**
   * Update an evaluation criterion in database.
   * @param {EvaluationCriterion} evaluationCriterion The evaluation criterion
   *                                                  to save.
   * @return {Promise} Promise representing the future fulfillment of the evaluation criterion update
   */
  static update(evaluationCriterion) {
    return pool.query(`UPDATE ${table}
              SET ?
              WHERE name = ? AND notice_protocol = ?`, [evaluationCriterion,
      evaluationCriterion.name,
      evaluationCriterion.notice_protocol])
        .then((data) => {
          return data;
        })
        .catch((err) => {
          throw err;
        });
  }
  /**
   * Remove an evaluation criterion from database.
   * @param {EvaluationCriterion} evaluationCriterion The evaluation criterion
   *                                                  to remove.
   * @return {Promise} Promise representing the future fulfillment of the evaluation criterion removal
   */
  static remove(evaluationCriterion) {
    return pool.query(`DELETE
              FROM ${table}
              WHERE name = ? 
                AND notice_protocol = ?`, [evaluationCriterion.name,
      evaluationCriterion.notice_protocol])
        .then((data) => {
          return data;
        })
        .catch((err) => {
          throw err;
        });
  }
  /**
   * Find the evaluation criterion with the specific id.
   * @param {string} name The name of the evaluation criterion.
   * @param {string} noticeProtocol The protocol of the notice
   *                                to which the evaluation criterion
   *                                is related.
   * @return {Promise} Promise representing the future fulfillment of the evaluation criterion retrieval
   */
  static findById(name, noticeProtocol) {
    return pool.query(`SELECT *
              FROM ${table}
              WHERE notice_protocol = ?
                AND name = ?`, [noticeProtocol,
      name])
        .then(([rows]) => {
          return (rows[0] === undefined)?rows:new EvalutationCriterion(rows[0]);
        })
        .catch((err) => {
          throw err;
        });
  }
  /**
   * Finds the evaluation criterions correlate to the specified notice.
   * @param {string} noticeProtocol The protocol of the notice.
   * @return {Promise} Promise representing the future fulfillment of the evaluation criterion retrieval
   */
  static findByNotice(noticeProtocol) {
    return pool.query(`SELECT *
              FROM ${table}
              WHERE notice_protocol = ?`, noticeProtocol)
        .then(([rows]) => {
          return rows.map((criterion)=>new EvalutationCriterion(criterion));
        })
        .catch((err) => {
          throw err;
        });
  }
  /**
   * Finds allthe evaluation criterions in the database.
   *
   * @return {Promise} Promise representing the future fulfillment of the evaluation criterions retrieval
   */
  static findAll() {
    return pool.query(`SELECT *
              FROM ${table}`)
        .then(([rows]) => {
          return rows.map((criterion)=> new EvalutationCriterion(criterion));
        })
        .catch((err) => {
          throw err;
        });
  }
  /**
   * Check if an evaluation criterion exists.
   * @param {EvaluationCriterion} evaluationCriterion The evaluation criterion
   *                                                  to check.
   * @return {Promise} Promise representing the future fulfillment of the request checking whether or not a criterion exists
   */
  static exists(evaluationCriterion) {
    return pool.query(`SELECT *
              FROM ${table}
              WHERE notice_protocol = ?
                AND name = ?`, [evaluationCriterion.notice_protocol,
      evaluationCriterion.name])
        .then((data) => {
          return data;
        })
        .catch((err) => {
          throw err;
        });
  }
}

module.exports = EvalutationCriterion;
