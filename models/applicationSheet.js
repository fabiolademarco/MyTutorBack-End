const pool = require('../db');
const table = 'application_sheet';

/**
 * Application Sheet
 *
 * This class represents an Application Sheet
 *
 * @author Giannandrea Vicidomini, Francesco Migliaro
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

  /** Creates an application sheet.
   * @param {ApplicationSheet} applicationSheet The application sheet to create.
   * @return {Promise<ApplicationSheet>} Promise representing the fulfillment of an application sheet creation.
   */
  static create(applicationSheet) {
    if (!applicationSheet) {
      throw new Error('No Parameters');
    }

    return pool.query(`INSERT INTO ${table} SET`, applicationSheet)
        .then(([resultSetHeader]) => {
          return applicationSheet;
        })
        .catch((err) => {
          throw err.message;
        });
  }

  /** Updates an applicatin sheet.
   * @param {ApplicationSheet} applicationSheet The application sheet to update.
   * @return {Promise<ApplicationSheet>} Promise representing the fulfillment of the application sheet update.
   */
  static update(applicationSheet) {
    if (!applicationSheet) {
      throw new Error('No Parameters');
    }
    if (!this.exists(applicationSheet)) {
      throw new Error('The application sheet doesn\'t exists');
    }

    return pool.query(`UPDATE ${table} SET ? WHERE notice_protocol = ${applicationSheet.notice_protocol}`, applicationSheet)
        .then(([resultSetHeader]) => {
          return applicationSheet;
        })
        .then((err) => {
          throw err.message;
        });
  }

  /** Removes an application sheet.
   * @param {ApplicationSheet} applicationSheet The application sheet to remove.
   * @return {Promise<boolean>} Promise representing the fulfillment of the application sheet removal.
   */
  static remove(applicationSheet) {
    if (!applicationSheet) {
      throw new Error('No Parameters');
    }
    return pool.query(`DELETE FROM ${table} WHERE notice_protocol = ${applicationSheet.notice_protocol}`)
        .then((([resultSetHeader]) => {
          return resultSetHeader.affectedRows > 0;
        }))
        .catch((err) => {
          throw err.message;
        });
  }

  /**
   * Check if an application sheet exists.
   * @param {ApplicationSheet} applicationSheet The application sheet to check.
   * @return {Promise<boolean>} Promise that resolves to true if the application sheet exists, false otherwise.
   */
  static exists(applicationSheet) {
    if (!applicationSheet) {
      throw new Error('No Parameters');
    }

    return pool.query(`SELECT * FROM ${table} WHERE notice_protocol = ?`, applicationSheet.notice_protocol)
        .then(([rows]) => {
          return rows.length > 0;
        })
        .catch((err) => {
          throw err.message;
        });
  }

  /** Finds an application sheet based on the protocol.
   * @param {NoticeProtocol} noticeProtocol The notice protocol on which to filter.
   * @return {Promise<ApplicationSheet>} Promise representing the fulfillment of the rapplication sheet search.
   */
  static findByNotice(noticeProtocol) {
    if (!noticeProtocol) {
      throw new Error('No Parameters');
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

  /** Returns application sheet table content.
   * @return {Promise<ApplicationSheet[]>} Promise representing the fulfillment of the application sheet search.
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
