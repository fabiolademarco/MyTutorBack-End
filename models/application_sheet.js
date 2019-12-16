const pool = require('../db');
const table = 'application_sheet';

/**
 * ApplicationSheet object constructor
 * @param {ApplicationSheet} applicationSheet
 */
const ApplicationSheet = function(applicationSheet) {
  this.noticeProtocol = applicationSheet.noticeProtocol;
  this.penalInformation = applicationSheet.penalInformation;
  this.privacyPolicy = applicationSheet.privacyPolicy;
};

/** Creates an application sheet
 * @param {ApplicationSheet} applicationSheet The application sheet to create
 * @param {callback} result The callback that handle the response.
 * @return {void}
 */
ApplicationSheet.create = (applicationSheet, result) => {
  if (applicationSheet == null) {
    return result(new Error('Il parametro passato è nullo'), null);
  }

  pool.query(`INSERT INTO ${table} SET`,
      applicationSheet,
      (err, data)=>{
        if (err) {
          return result(err, null);
        }
        result(null, applicationSheet);
      },
  );
};

/** Updates an applicatin sheet
 * @param {ApplicationSheet} applicationSheet The application sheet to update
 * @param {callback} result The callback that handle the response.
 * @return {void}
 */
ApplicationSheet.update = (applicationSheet, result) => {
  if (applicationSheet == null) {
    return result(new Error('Il parametro passato è nullo'), null);
  }
  pool.query(`UPDATE ${table} SET ? where notice_protocol = 
  ${applicationSheet.noticeProtocol}`,
  applicationSheet,
  (err, data)=>{
    if (err) {
      return result(err, null);
    }
    result(null, applicationSheet);
  },
  );
};

/** Removes an application sheet
 * @param {ApplicationSheet} applicationSheet The application sheet to remove
 * @param {callback} result The callback that handle the response.
 * @return {void}
 */
ApplicationSheet.remove = (applicationSheet, result) => {
  if (applicationSheet == null) {
    return result(new Error('Il parametro passato è nullo'), null);
  }
  pool.query(`DELETE FROM ${table} WHERE notice_protocol = 
  ${applicationSheet.noticeProtocol}`,
  (err, res)=>{
    if (err) {
      return result(err, null);
    }
    result(null, applicationSheet);
  },

  );
};

/** Finds an application sheet based on the protocol
 * @param {NoticeProtocol} noticeProtocol The notice protocol on which to filter
 * @param {callback} result The callback that handle the response.
 * @return {void}
 */
ApplicationSheet.findByNotice = (noticeProtocol, result) => {
  if (noticeProtocol == null) {
    return result(new Error('Il parametro passato è nullo'), null);
  }
  pool.query(`SELECT * FROM ${table} WHERE notice_protocol = ?`,
      noticeProtocol,
      (err, data) => {
        if (err) {
          return result(err, null);
        }
        result(null, data);
      });
};

module.exports = ApplicationSheet;
