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

/**
 *
 */
const pool = require('../db');
const applicationSheet = require('./application_sheet');
const evaluationCriterion = require('./evalutation_criterion');
const article = require('./article');
const assignment = require('./assignment');
const comment = require('./comment');

const table = 'notice';

/**
 * Notice object constructor
 * @param {Notice} notice The JS object that contains fields
 *                            for setting new Notice object
 */
const Notice = function(notice) {
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
};

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
 * Creates a new notice in database.
 * @param {Notice} notice The notice to save.
 * @param {callback} result Tha callback that handle the response.
 */
Notice.create = (notice, result) => {
  pool.query(`INSERT INTO ${table}
              SET ?`,
  notice,
  (err, data) => {
    if (err) {
      return result(err, null);
    }

    // If the create of notice is successful then create the others
    // entities correlate to that

    // Create application sheet correlate to the notice
    applicationSheet.create(notice.application_sheet, (err, data) => {
      if (err) {
        return err;
      }
      return data;
    });


    // Create all evaluation criterions correlate to the notice
    for (const tempEvalCrit of notice.evaluation_criterions) {
      evaluationCriterion.create(tempEvalCrit, (err, data) => {
        if (err) {
          return err;
        }
        return data;
      });
    }


    // Create all articles correlate to the notice
    for (const tempArticle of notice.articles) {
      article.create(tempArticle, (err, data) => {
        if (err) {
          return err;
        }
        return data;
      });
    }

    // Create all articles correlate to the notice
    for (const tempAssignment of notice.assignments) {
      assignment.create(tempAssignment, (err, data) => {
        if (err) {
          return result(err, null);
        }

        result(null, data);
      },
      );
    }

    result(null, data);
  });
};

/**
 * Update a notice in database.
 * @param {Notice} notice The notice to update.
 * @param {callback} result The callback that handles the response.
 */
Notice.update = (notice, result) => {
  pool.query(`UPDATE ${table} 
              SET ? 
              WHERE protocol = ?`,
  [notice,
    notice.protocol],
  (err, data) => {
    if (err) {
      return result(err, null);
    }

    // If the update of notice is successful then update the others
    // entities correlate to that

    // Update application sheet correlate to the notice if it's necessary
    if (notice.application_sheet) {
      applicationSheet.update(notice.application_sheet, (err, data) => {
        if (err) {
          return err;
        }
        return data;
      });
    }

    // Update all evaluation criterions correlate to the notice if it's
    // necessary
    if (notice.evaluation_criterions) {
      for (const tempEvalCrit of notice.evaluation_criterions) {
        evaluationCriterion.update(tempEvalCrit,
            (err, data) => {
              if (err) {
                return err;
              }
              return data;
            });
      }
    }

    // Update all articles correlate to the notice if it's necessary
    if (notice.articles) {
      for (const tempArticle of notice.articles) {
        article.update(tempArticle, (err, data) => {
          if (err) {
            return err;
          }
          return data;
        });
      }
    }

    result(null, data);
  });
};

/**
 * Removes a notice from database.
 * @param {Notice} notice The notice to remove.
 * @param {callback} result The callback that handles the response.
 */
Notice.remove = (notice, result) => {
  pool.query(`DELETE 
              FROM ${table} 
              WHERE protocol = ?`,
  notice.protocol,
  (err, data) => {
    if (err) {
      result(err, null);
    }

    result(null, data);
  });
};

/**
 * Finds the notice with the specific protocol.
 * @param {string} noticeProtocol The protocol of the notice.
 * @param {callback} result The callback that handles the response.
 */
Notice.findByProtocol = (noticeProtocol, result) => {
  pool.query(`SELECT * 
              FROM ${table}
              WHERE protocol = ?`,
  noticeProtocol,
  (err, data) => {
    if (err) {
      return result(err, null);
    }

    const tempNotice = data[0];
    const {
      applicationSheet,
      evaluationCriterions,
      articles,
      comment,
    } = getOtherFields(protocol);

    tempNotice.application_sheet = applicationSheet;
    tempNotice.evaluation_criterions = evaluationCriterions;
    tempNotice.articles = articles;
    tempNotice.comment = comment;

    result(null, tempNotice);
  });
};

/**
 * Finds the notices with the specific state.
 * @param {Notice.States} state The state of the notice.
 * @param {callback} result The callback that handles the response.
 */
Notice.findByState = (state, result) => {
  pool.query(`SELECT * 
              FROM ${table}
              WHERE state = ?`,
  state,
  (err, data) => {
    if (err) {
      return result(err, null);
    }

    noticesArray = [];

    for (const el of data) {
      const {
        applicationSheet,
        evaluationCriterions,
        articles,
        comment,
      } = getOtherFields(el.protocol);

      el.application_sheet = applicationSheet;
      el.evaluation_criterions = evaluationCriterions;
      el.articles = articles;
      el.comment = comment;

      noticesArray.append(el);
    }

    result(null, noticesArray);
  });
};

/**
 * Finds the notices with the specific refernt.
 *  @param {User} referent The referent professor of the notice.
 *  @param {callback} result The callback that handles the response.
 */
Notice.findByReferent = (referent, result) => {
  pool.query(`SELECT *
              FROM ${table}
              WHERE referent_professor = ?`,
  referent,
  (err, data) =>{
    if (err) {
      return result(err, null);
    }

    noticesArray = [];

    for (const el of data) {
      const {
        applicationSheet,
        evaluationCriterions,
        articles,
        comment,
      } = getOtherFields(el.protocol);

      el.application_sheet = applicationSheet;
      el.evaluation_criterions = evaluationCriterions;
      el.articles = articles;
      el.comment = comment;

      noticesArray.append(el);
    }

    result(null, noticesArray);
  });
};

/**
 * Finds all the notices.
 * @param {callback} result The callback that handles the response.
 */
Notice.findAll = (result) => {
  pool.query(`SELECT *
              FROM ${table}`,
  (err, data) =>{
    if (err) {
      return result(err, null);
    }

    noticesArray = [];

    for (const el of data) {
      const {
        applicationSheet,
        evaluationCriterions,
        articles,
        comment,
      } = getOtherFields(el.protocol);

      el.application_sheet = applicationSheet;
      el.evaluation_criterions = evaluationCriterions;
      el.articles = articles;
      el.comment = comment;

      noticesArray.append(el);
    }

    result(null, data);
  });
};

/**
 * Check if a notice exists.
 * @param {Notice} notice The notice to check.
 * @param {callback} result The callback that handles the response.
 */
Notice.exists = (notice, result) => {
  pool.query(`SELECT *
              FROM ${table}
              WHERE protocol = ?`,
  notice.protocol,
  (err, data) => {
    if (err) {
      return result(err, null);
    }

    result(null, data.length > 0);
  });
};

/**
 * This function retrieve other fields of a notice.
 * @param {string} noticeProtocol The protocol of the notice.
 * @return {Object} The object with the other fields stored in.
 */
function getOtherFields(noticeProtocol) {
  otherFileds = {
    applicationSheet: [],
    evaluationCriterions: [],
    articles: [],
    comment: '',
  };

  applicationSheet.findByNotice(noticeProtocol, (err, data) => {
    if (err) {
      return err;
    }
    for (const l of data) {
      otherFileds.applicationSheet.append(l);
    }
  });

  evaluationCriterion.findByNotice(noticeProtocol, (err, data) =>{
    if (err) {
      return err;
    }
    for (const l of data) {
      otherFileds.evaluationCriterions.append(l);
    }
  });

  article.findByNotice(noticeProtocol, (err, data) =>{
    if (err) {
      return err;
    }
    for (const l of data) {
      otherFileds.articles.append(l);
    }
  });

  comment.findByProtocol(noticeProtocol, (err, data) =>{
    if (err) {
      return err;
    }
    otherFileds.comment = data;
  });

  return otherFileds;
}

module.exports = Notice;
