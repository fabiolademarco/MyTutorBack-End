const pool = require('../db');
const applicationSheet = require('./application_sheet');
const evaluationCriterion = require('./evalutation_criterion');
const article = require('./article');

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
  this.noticeSubject = notice.noticeSubject;
  this.admissionRequirements = notice.admissionRequirements;
  this.assessableTitles = notice.assessableTitles;
  this.howToSubmitApplications = notice.howToSubmitApplications;
  this.selectionBoard = notice.selectionBoard;
  this.acceptance = notice.acceptance;
  this.incompatibility = notice.incompatibility;
  this.terminationOfTheAssignment = notice.terminationOfTheAssignment;
  this.natureOfTheAssignment = notice.natureOfTheAssignment;
  this.unusedFunds = notice.unusedFunds;
  this.state = Object.values(States).includes(notice.state) ?
                      notice.state : null;
  this.type = notice.type;
  this.deadline = notice.deadline;
  this.noticeFile = notice.noticeFile;
  this.gradedListFile = notice.gradedListFile;
};

/**
 * All possible states of a notice
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
  pool.query(`INSERT INTO ${table} SET ? `,
      notice,
      (err, data) => {
        if (err) {
          return result(err, null);
        }

        applicationSheet.create(notice.applicationSheet, (err, data) => {
          if (err) {
            return err;
          }
          return data;
        });

        evaluationCriterion.create(notice.evaluationCriterion, (err, data) => {
          if (err) {
            return err;
          }
          return data;
        });

        article.create(notice.article, (err, data) => {
          if (err) {
            return err;
          }
          return data;
        });

        result(null, data);
      });
};

/**
 * Update a notice in database.
 * @param {Notice} notice The notice to update.
 * @param {callback} result The callback that handles the response.
 */
Notice.update = (notice, result) => {
  pool.query(`UPDATE ${table} WHERE protocol = ?`,
      notice.protocol,
      (err, data) => {
        if (err) {
          result(err, null);
        }

        if (notice.applicationSheet) {
          applicationSheet.update(notice.applicationSheet, (err, data) => {
            if (err) {
              return err;
            }
            return data;
          });
        }

        if (notice.evaluationCriterion) {
          evaluationCriterion.update(notice.evaluationCriterion,
              (err, data) => {
                if (err) {
                  return err;
                }
                return data;
              });
        }

        if (notice.article) {
          article.update(notice.article, (err, data) => {
            if (err) {
              return err;
            }
            return data;
          });
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
  pool.query(`DELETE FROM ${table} WHERE protocol = ?`,
      notice.prtocol,
      (err, data) => {
        if (err) {
          result(err, null);
        }
        result(null, data);
      });
};

/**
 * Finds the notice with the specific protocol.
 * @param {String} noticeProtocol The protocol of the notice.
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
      evaluationCriterion,
      article,
    } = getOtherFields(protocol);

    tempNotice.applicationSheet = applicationSheet;
    tempNotice.evaluationCriterion = evaluationCriterion;
    tempNotice.article = article;

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
        evaluationCriterion,
        article,
      } = getOtherFields(el.protocol);

      el.applicationSheet = applicationSheet;
      el.evaluationCriterion = evaluationCriterion;
      el.article = article;

      noticesArray.append(el);
    }

    result(null, noticesArray);
  });
};

/**
 * This function retrieve other fields of a notice.
 * @param {String} noticeProtocol The protocol of the notice.
 * @return {Object} The object with the other fields stored in.
 */
function getOtherFields(noticeProtocol) {
  otherFileds = {
    applicationSheet: [],
    evaluationCriterion: [],
    article: [],
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
      otherFileds.evaluationCriterion.append(l);
    }
  });

  article.findByNotice(noticeProtocol, (err, data) =>{
    if (err) {
      return err;
    }
    for (const l of data) {
      otherFileds.article.append(l);
    }
  });

  return otherFileds;
}

module.exports = Notice;
