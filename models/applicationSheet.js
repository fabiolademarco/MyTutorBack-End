const pool = require('../db');
const table = 'application_sheet';

/**
 * Application Sheet
 *
 * This class represents an Application Sheet
 *
 * @author Giannandrea Vicidomini
 * @version
 * @since
 *
 * 2019 - Copyright by Gang Of Four Eyes
 */
class ApplicationSheet {
  /**
 * ApplicationSheet object constructor
 * @param {ApplicationSheet} applicationSheet
 */
  constructor(applicationSheet) {
    this.noticeProtocol = applicationSheet.noticeProtocol;
    this.documentsToAttach = applicationSheet.documentsToAttach;
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
        .then((data) => {
          return applicationSheet;
        })
        .catch((err) => {
          throw err;
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
    return pool.query(`UPDATE ${table} SET ? where notice_protocol = 
  ${applicationSheet.noticeProtocol}`, applicationSheet)
        .then((data) => {
          return applicationSheet;
        })
        .then((err) => {
          throw err;
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
    return pool.query(`DELETE FROM ${table} WHERE notice_protocol = 
  ${applicationSheet.noticeProtocol}`)
        .then(((data) => {
          return applicationSheet;
        }))
        .catch((err) => {
          throw err;
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
        .then((data) => {
          return data;
        })
        .catch((err) => {
          throw err;
        });
  }
  /** Returns application sheet table content
   * @return {Promise} Promise representing the fulfillment
   *                   of the application sheet search
   */
  static findAll() {
    return pool.query(`SELECT * FROM ${table}`)
        .then((data) => {
          return data;
        })
        .catch((err) => {
          throw err;
        });
  }
}


module.exports = ApplicationSheet;
