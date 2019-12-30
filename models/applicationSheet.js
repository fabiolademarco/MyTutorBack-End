const pool = require('../db');
const table = 'application_sheet';

/**
 * Application Sheet
 *
 * This class represents an Application Sheet
 *
 * @author Giannandrea Vicidomini
 *
 * @copyright 2019 - Copyright by Gang Of Four Eyes
 */
class ApplicationSheet {
  /**
 * ApplicationSheet object constructor
 * @param {ApplicationSheet} applicationSheet
 */
  constructor(applicationSheet) {
    this.notice_protocol = applicationSheet.notice_protocol;
    this.documents_to_attach = applicationSheet.documents_to_attach;
  }

  /** Creates an application sheet
   * @param {ApplicationSheet} applicationSheet The application sheet to create
   * @return {Promise} Promise representing the fulfillment
   *                   of an application sheet creation
   */
  static create(applicationSheet) {
    if (applicationSheet == null) {
      return 'Il parametro passato è nullo';
    }
    return pool.query(`INSERT INTO ${table} SET`, applicationSheet)
        .then(([resultSetHeader]) => {
          return applicationSheet;
        })
        .catch((err) => {
          throw err.message;
        });
  }

  /** Updates an applicatin sheet
   * @param {ApplicationSheet} applicationSheet The application sheet to update
   * @return {Promise} Promise representing the fulfillment
   *                   of the application sheet update
   */
  static update(applicationSheet) {
    if (applicationSheet == null) {
      return null;
    }
    return pool.query(`UPDATE ${table} SET ? WHERE notice_protocol = ${applicationSheet.notice_protocol}`, applicationSheet)
        .then(([resultSetHeader]) => {
          return applicationSheet;
        })
        .then((err) => {
          throw err.message;
        });
  }

  /** Removes an application sheet
   * @param {ApplicationSheet} applicationSheet The application sheet to remove
   * @return {Promise} Promise representing the fulfillment
   *                   of the application sheet removal
   */
  static remove(applicationSheet) {
    if (applicationSheet == null) {
      return null;
    }
    return pool.query(`DELETE FROM ${table} WHERE notice_protocol = ${applicationSheet.notice_protocol}`)
        .then((([resultSetHeader]) => {
          return resultSetHeader.affectedRows > 0;
        }))
        .catch((err) => {
          throw err.message;
        });
  }

  /** Finds an application sheet based on the protocol
   * @param {NoticeProtocol} noticeProtocol The notice protocol on which to filter
   * @return {Promise} Promise representing the fulfillment
   *                   of the rapplication sheet search
   */
  static findByNotice(noticeProtocol) {
    if (noticeProtocol == null) {
      return null;
    }
    return pool.query(`SELECT * FROM ${table} WHERE notice_protocol = ?`, noticeProtocol)
        .then(([rows]) => {
          if (rows.length < 1) {
            throw new Error(`No result found: ${noticeProtocol}`);
          }
          return new ApplicationSheet(rows[0]);
        })
        .catch((err) => {
          throw err.message;
        });
  }

  /** Returns application sheet table content
   * @return {Promise} Promise representing the fulfillment
   *                   of the application sheet search
   */
  static findAll() {
    return pool.query(`SELECT * FROM ${table}`)
        .then(([rows]) => {
          return rows.map((as) => new ApplicationSheet(as));
        })
        .catch((err) => {
          throw err.message;
        });
  }
}


module.exports = ApplicationSheet;
