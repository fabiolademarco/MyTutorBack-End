
const pool = require('../db');

const table = 'evaluation_criterion';

/**
 * EvaluationCriterion
 *
 * This class represents an evaluation criterion
 *
 * @author Francesco Migliaro
 *
 * @copyright 2019 - Copyright by Gang Of Four Eyes
 */
class EvalutationCriterion {
  /**
 * EvaluationCriterion object constructor
 * @param {EvaluationCriterion} evaluationCriterion The JS object that contains fields for setting new EvaluationCriterion object
 */
  constructor(evaluationCriterion) {
    this.notice_protocol = evaluationCriterion.notice_protocol;
    this.name = evaluationCriterion.name;
    this.maxScore = evaluationCriterion.max_score;
  }

  /**
   * Creates a new evaluation criterion in the database.
   * @param {EvaluationCriterion} evaluationCriterion The evaluation criterion to save.
   * @return {Promise} Promise that represents the created evaluation criterion.
   */
  static create(evaluationCriterion) {
    if (!evaluationCriterion) {
      throw new Error('No parameters');
    }

    return pool.query(`INSERT INTO ${table} SET ?`, evaluationCriterion)
        .then(([resultSetHeader]) => {
          return new EvalutationCriterion(evaluationCriterion);
        })
        .catch((err) => {
          throw err;
        });
  }

  /**
   * Updates an evaluation criterion in database.
   * @param {EvaluationCriterion} evaluationCriterion The evaluation criterion to update.
   * @return {Promise} Promise that represents the updated evaluation criterion.
   */
  static async update(evaluationCriterion) {
    if (!evaluationCriterion) {
      throw new Error('No parameters');
    }
    if (!await this.exists(evaluationCriterion)) {
      throw new Error('The evaluation criterion doesn\'t exists');
    }

    return pool.query(`UPDATE ${table} SET ? WHERE name = ? AND notice_protocol = ?`,
        [evaluationCriterion, evaluationCriterion.name, evaluationCriterion.notice_protocol])
        .then(([resultSetHeader]) => {
          return new EvalutationCriterion(evaluationCriterion);
        })
        .catch((err) => {
          throw err;
        });
  }

  /**
   * Removes an evaluation criterion from database.
   * @param {EvaluationCriterion} evaluationCriterion The evaluation criterion to remove.
   * @return {Promise}  Promise that represents the value of the action.
   */
  static remove(evaluationCriterion) {
    if (!evaluationCriterion) {
      throw new Error('No parameters');
    }

    return pool.query(`DELETE FROM ${table} WHERE name = ? AND notice_protocol = ?`,
        [evaluationCriterion.name, evaluationCriterion.notice_protocol])
        .then(([resultSetHeader]) => {
          return resultSetHeader.affectedRows > 0;
        })
        .catch((err) => {
          throw err;
        });
  }

  /**
   * Checks if an evaluation criterion exists.
   * @param {EvaluationCriterion} evaluationCriterion The evaluation criterion to check.
   * @return {Promise} Promise that represents the value of the action.
   */
  static exists(evaluationCriterion) {
    if (!evaluationCriterion) {
      throw new Error('No parameters');
    }

    return pool.query(`SELECT * FROM ${table} WHERE notice_protocol = ? AND name = ?`,
        [evaluationCriterion.notice_protocol, evaluationCriterion.name])
        .then(([rows]) => {
          return rows.length > 0;
        })
        .catch((err) => {
          throw err;
        });
  }

  /**
   * Find the evaluation criterion with the specific id.
   * @param {string} name The name of the evaluation criterion.
   * @param {string} noticeProtocol The protocol of the notice to which the evaluation criterion is related.
   * @return {Promise} Promise that represent the evaluation criterion.
   */
  static findById(name, noticeProtocol) {
    if (!name || !noticeProtocol) {
      throw new Error('No parameters');
    }

    return pool.query(`SELECT * FROM ${table} WHERE notice_protocol = ? AND name = ?`,
        [noticeProtocol, name])
        .then(([rows]) => {
          return (rows[0] == undefined) ? rows : new EvalutationCriterion(rows[0]);
        })
        .catch((err) => {
          throw err;
        });
  }

  /**
   * Finds the evaluation criterions correlate to the specified notice.
   * @param {string} noticeProtocol The protocol of the notice.
   * @return {Promise} Promise that represent the evaluation criterion.
   */
  static findByNotice(noticeProtocol) {
    if (!noticeProtocol) {
      throw new Error('No parameters');
    }

    return pool.query(`SELECT * FROM ${table} WHERE notice_protocol = ?`, noticeProtocol)
        .then(([rows]) => {
          return rows.map((criterion) => new EvalutationCriterion(criterion));
        })
        .catch((err) => {
          throw err;
        });
  }

  /**
   * Finds allthe evaluation criterions in the database.
   * @return {Promise} Promise that respresents all the Documents.
   */
  static findAll() {
    return pool.query(`SELECT * FROM ${table}`)
        .then(([rows]) => {
          return rows.map((criterion) => new EvalutationCriterion(criterion));
        })
        .catch((err) => {
          throw err;
        });
  }
}

module.exports = EvalutationCriterion;
