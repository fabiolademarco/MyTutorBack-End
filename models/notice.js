const pool = require('../db');
const applicationSheet = require('./application_sheet');
const evaluationCriterio = require('./evalutation_criterion');
const article = require('./article');


const states = ['Draft', 'In Acceptance', 'Accepted', 'In Approval', 'Approved',
  'Published', 'Expired', 'Waiting for Graded List', 'Closed'];
const table = 'notice';


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
  this.state = states.includes(notice.state) ? notice.state : null;
  this.type = notice.type;
  this.deadline = notice.deadline;
  this.noticeFile = notice.noticeFile;
  this.gradedListFile = notice.gradedListFile;
};

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

        evaluationCriterio.create(notice.evaluationCriterio, (err, data) => {
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

        if (notice.evaluationCriterio) {
          evaluationCriterio.update(notice.evaluationCriterio, (err, data) => {
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

Notice.remove = (notice, result) => {
  pool.query(`DELETE FROM ${table} WHERE protocol = ?`,
      notice.id,
      (err, data) => {
        if (err) {
          result(err, null);
        }
        result(null, data);
      });
};

Notice.findByProtocol = (protocol, result) => {
  pool.query(`SELECT * 
              FROM ${table} 
                INNER JOIN ${applicationSheet.table} 
                INNER JOIN ${evaluationCriterion.table} 
                INNER JOIN ${article.table} 
              WHERE protocol = ?`,
  protocol,
  (err, data) => {
    if (err) {
      result(err, null);
    }
    result(null, data);
  });
};

Notice.findByState = (state, result) => {
  pool.query(`SELECT * 
              FROM ${table} 
                INNER JOIN ${applicationSheet.table} 
                INNER JOIN ${evaluationCriterion.table} 
                INNER JOIN ${article.table} 
              WHERE state = ?`,
  state,
  (err, data) => {
    if (err) {
      result(err, null);
    }
    result(null, data);
  });
};

module.exports = Notice;
