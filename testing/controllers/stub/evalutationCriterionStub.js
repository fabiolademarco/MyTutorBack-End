
const criterionStubList = [
  {
    notice_protocol: 'Prot. n. 0274751',
    name: 'Esperienze didattiche maturate nelle Università',
    max_score: 17,
  },
  {
    notice_protocol: 'Prot. n. 0274751',
    name: 'Titolo Studio',
    max_score: 16,
  },
  {
    notice_protocol: 'Prot. n. 0279008',
    name: 'Esperienze didattiche maturate nelle Università',
    max_score: 17,
  },
  {
    notice_protocol: 'Prot. n. 0275137',
    name: 'Esperienze didattiche maturate nelle Università',
    max_score: 10,
  },

];

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

    return new Promise((resolve) => resolve())
        .then(() => true)
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
    if (!this.exists(evaluationCriterion)) {
      throw new Error('The criterion doesn\'t exist');
    }
    criterionStubList[criterionStubList.indexOf(evaluationCriterion)] = evaluationCriterion;

    return new Promise((resolve) => resolve())
        .then(() => {
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

    return new Promise((resolve) => resolve())
        .then(() => {
          return criterionStubList.pop(evaluationCriterion) != null;
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

    return new Promise((resolve) => resolve())
        .then(() => {
          return criterionStubList.filter((el) => el.notice_protocol === evaluationCriterion.noticeProtocol && el.name === evaluationCriterion.name).length > 0;
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

    return new Promise((resolve) => resolve())
        .then(() => {
          const filtered = criterionStubList.filter((el) => el.notice_protocol === evaluationCriterion.noticeProtocol && el.name === evaluationCriterion.name).length > 0;

          return (filtered.length > 0) ? new EvalutationCriterion(filtered[0]) : null;
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

    return new Promise((resolve) => resolve())
        .then(() => {
          return criterionStubList.filter((el) => el.notice_protocol == noticeProtocol)
              .map((el) => new EvalutationCriterion(el));
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
    return new Promise((resolve) => resolve())
        .then(() => {
          return criterionStubList.map((el) => new EvalutationCriterion(el));
        })
        .catch((err) => {
          throw err;
        });
  }
}

module.exports = EvalutationCriterion;
