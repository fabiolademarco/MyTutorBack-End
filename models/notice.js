const pool = require('../db');
const ApplicationSheet = require('./applicationSheet');
const EvaluationCriterion = require('./evalutationCriterion');
const Article = require('./article');
const Assignment = require('./assignment');
const Comment = require('./comment');

const table = 'notice';

/**
 * Notice
 *
 * This class represents a Notice
 *
 * @author Francesco Migliaro
 * @version
 * @since
 *
 * @copyright 2019 - Copyright by Gang Of Four Eyes
 */
class Notice {
  /**
   * Notice object constructor
   * @param {Notice} notice The JS object that contains fields for setting new Notice object
   */
  constructor(notice) {
    this.protocol = notice.protocol;
    this.referent_professor = notice.referent_professor;
    this.description = notice.description;
    this.notice_subject = notice.notice_subject;
    this.admission_requirements = notice.admission_requirements;
    this.assessable_titles = notice.assessable_titles;
    this.how_to_submit_applications = notice.how_to_submit_applications;
    this.selection_board = notice.selection_board;
    this.acceptance = notice.acceptance;
    this.incompatibility = notice.incompatibility;
    this.termination_of_the_assignment = notice.termination_of_the_assignment;
    this.nature_of_the_assignment = notice.nature_of_the_assignment;
    this.unused_funds = notice.unused_funds;
    this.state = Object.values(States).includes(notice.state) ?
      notice.state : null;
    this.type = notice.type;
    this.deadline = notice.deadline;
    this.notice_file = notice.notice_file;
    this.graded_list_file = notice.graded_list_file;
    this.articles = notice.articles;
    this.evaluation_criterions = notice.evaluation_criterions;
    this.application_sheet = notice.application_sheet;
    this.assignments = notice.assignments;
    this.comment = notice.comment;
  }

  /**
   * Creates a new notice in database.
   * @param {Notice} notice The notice to save.
   * @return {Promise<Notice>} Promise that represents the created Notice
   */
  static create(notice) {
    return pool.query(`INSERT INTO ${table} SET ?`, notice)
        .then(([resultSetHeader]) => article.id = resultSetHeader.insertId)
        .then(() => ApplicationSheet.create(notice.application_sheet))
        .then(() => notice.evaluation_criterions.forEach((ec) => EvaluationCriterion.create(ec)))
        .then(() => notice.articles.forEach((art) => Article.create(art)))
        .then(() => notice.assignments.forEach((assign) => Assignment.create(assign)))
        .then(() => notice)
        .catch((err) => {
          throw err.message;
        });
  }

  /**
   * Update a notice in database.
   * @param {Notice} notice The notice to update.
   * @return {Promise<Notice>} Promise that represents the updated notice
   */
  static update(notice) {
    return pool.query(`UPDATE ${table} SET ? WHERE protocol = ?`, [notice, notice.protocol])
        .then(() => {
          if (notice.application_sheet) {
            return ApplicationSheet.update(notice.application_sheet);
          }
        })
        .then(() => {
          if (notice.evaluation_criterions) {
            return notice.evaluation_criterions.forEach(((ec) => EvaluationCriterion.update(ec)));
          }
        })
        .then(() => {
          if (notice.articles) {
            return notice.articles.forEach((art) => Article.update(art));
          }
        })
        .then(() => {
          if (notice.assignments) {
            return notice.assignments.forEach((assign) => Assignment.update(assign));
          }
        })
        .then(() => notice)
        .catch((err) => {
          throw err.message;
        });
  }

  /**
   * Removes a notice from database.
   * @param {Notice} notice The notice to remove.
   * @return {Promise<boolean>} Promise that is true if the removal went right else it's false
   */
  static remove(notice) {
    return pool.query(`DELETE FROM ${table} WHERE protocol = ?`, notice.protocol)
        .then(([resultSetHeader]) => {
          return resultSetHeader.affectedRows > 0;
        })
        .catch((err) => {
          throw err.message;
        });
  }

  /**
   * Finds the notice with the specific protocol.
   * @param {string} noticeProtocol The protocol of the notice.
   * @return {Promise<Notice>} Promise that represents the Notice having the passed id.
   */
  static findByProtocol(noticeProtocol) {
    return pool.query(`SELECT * FROM ${table} WHERE protocol = ?`, noticeProtocol)
        .then(([rows]) => {
          const tempNotice = rows[0];
          return getOtherFields(protocol)
              .then(({assignments, applicationSheet, evaluationCriterions, articles, comment}) => {
                tempNotice.assignments = assignments;
                tempNotice.application_sheet = applicationSheet;
                tempNotice.evaluation_criterions = evaluationCriterions;
                tempNotice.articles = articles;
                tempNotice.comment = comment;
                return new Notice(tempNotice);
              });
        })
        .catch((err) => {
          throw err.message;
        });
  }

  /**
   * Finds the notices with the specific state.
   * @param {Notice.States} state The state of the notice.
   * @return {Promise<Notice[]>} Promise that represents the Notice array having the passed State.
   */
  static findByState(state) {
    return pool.query(`SELECT * FROM ${table} WHERE state = ?`, state)
        .then(([rows]) => {
          const notices = [];
          rows.forEach((notice) => {
            notices.push(getOtherFields(notice.protocol)
                .then(({assignments, applicationSheet, evaluationCriterions, articles, comment}) => {
                  notice.assignments = assignments;
                  notice.application_sheet = applicationSheet;
                  notice.evaluation_criterions = evaluationCriterions;
                  notice.articles = articles;
                  notice.comment = comment;
                  return new Notice(notice);
                }));
          });
        })
        .catch((err) => {
          throw err.message;
        });
  }

  /**
   * Finds the notices with the specific refernt.
   * @param {User} referent The referent professor of the notice.
   * @return {Promise<Notice[]>} Promise that represents the Notice array having the passed referent.
   */
  static findByReferent(referent) {
    return pool.query(`SELECT * FROM ${table} WHERE referent_professor = ?`, referent)
        .then(([rows]) => {
          const notices = [];
          rows.forEach((notice) => {
            notices.push(getOtherFields(notice.protocol)
                .then(({assignments, applicationSheet, evaluationCriterions, articles, comment}) => {
                  notice.assignments = assignments;
                  notice.application_sheet = applicationSheet;
                  notice.evaluation_criterions = evaluationCriterions;
                  notice.articles = articles;
                  notice.comment = comment;
                  return new Notice(notice);
                }));
          });
        })
        .catch((err) => {
          throw err.message;
        });
  }

  /**
   * Finds all the notices.
   * @return {Promise<Notice[]>} Promise that represents the Notice array.
   */
  static findAll() {
    return pool.query(`SELECT * FROM ${table}`)
        .then(([rows]) => {
          const notices = [];
          rows.forEach((notice) => {
            notices.push(getOtherFields(notice.protocol)
                .then(({assignments, applicationSheet, evaluationCriterions, articles, comment}) => {
                  notice.assignments = assignments;
                  notice.application_sheet = applicationSheet;
                  notice.evaluation_criterions = evaluationCriterions;
                  notice.articles = articles;
                  notice.comment = comment;
                  return new Notice(notice);
                }));
          });
        })
        .catch((err) => {
          throw err.message;
        });
  }

  /**
   * Check if a notice exists.
   * @param {Notice} notice The notice to check.
   * @param {callback} result The callback that handles the response.
   */
  static exists(notice, result) {
    pool.query(`SELECT * FROM ${table} WHERE protocol = ?`, notice.protocol)
        .then(([rows]) => {
          return rows.length > 0;
        })
        .catch((err) => {
          throw err.message;
        });
  }
}

/**
 * Enum for all possible states of a notice
 * @readonly
 * @enum {string}
 */
Notice.States = {
  DRAFT: 'Draft',
  IN_ACCEPTANCE: 'In Acceptance',
  ACCEPTED: 'Accepted',
  IN_APPROVAL: 'In Approval',
  APPROVED: 'Approved',
  PUBLISHED: 'Published',
  EXPIRED: 'Expired',
  WAITING_FOR_GRADED_LIST: 'Waiting for Graded List',
  CLOSED: 'Closed',
};


/**
 * This function retrieve other fields of a notice.
 * @param {string} noticeProtocol The protocol of the notice.
 * @return {Promise<Object>} Promise that resolves to the object with the other fields stored in.
 */
function getOtherFields(noticeProtocol) {
  const otherFields = {
    assignments: [],
    applicationSheet: '',
    evaluationCriterions: [],
    articles: [],
    comment: '',
  };

  return Promise.all([

    Assignment.findByNotice(noticeProtocol).then((assignments) => assignments.forEach((a) => otherFields.assignments.push(a))),
    ApplicationSheet.findByNotice(noticeProtocol).then((applicationSheet) => otherFields.applicationSheet = applicationSheet),
    EvaluationCriterion.findByNotice((criteria) => criteria.forEach((c) => otherFields.evaluationCriterions.push(c))),
    Article.findByNotice(noticeProtocol).then((articles) => articles.forEach((a) => otherFields.articles.push(a))),
    Comment.findByNotice(noticeProtocol).then((comment) => otherFields.comment = comment),

  ])
      .then(() => otherFields)
      .catch((err) => {
        throw err.message;
      });
}

module.exports = Notice;
