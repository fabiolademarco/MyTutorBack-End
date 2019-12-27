const pool = require('../db');
// Utilities
const table = 'verified_email';

/**
 * VerifiedEmail
 *
 * This class represents a VerifiedEmail
 *
 * @author Roberto Bruno
 * @version
 * @since
 *
 * 2019 - Copyright by Gang Of Four Eyes
 */
class VerifiedEmail {
  /**
   * VerifiedEmail object constructor
   * @param {VerifiedEmail} verifiedEmail
   */
  constructor(verifiedEmail) {
    this.email = verifiedEmail.email;
    this.signed_up = verifiedEmail.signed_up;
  }

  /**
   * Creates a new VerifiedEmail
   * @param {VerifiedEmail} verifiedEmail The Verified email to insert.
   * @return {Promise<VerifiedEmail>} Promise Object representing the created VerifiedEmail.
   */
  static create(verifiedEmail) {
    if (verifiedEmail == null) {
      throw new Error('Parameter can not be null or undefined');
    }
    verifiedEmail.signed_up = 0;
    return pool.query(`INSERT INTO ${table} SET ?`, verifiedEmail)
        .then(([resultSetHeader]) => {
          return new VerifiedEmail(verifiedEmail);
        })
        .catch((err) => {
          throw err;
        });
  }

  /**
   * Updates a VerifiedEmail.
   * @param {VerifiedEmail} verifiedEmail The verifiedEmail to update.
   * @return {Promise<VerifiedEmail>} Promise object representing the updated VerifiedEmail.
   */
  static update(verifiedEmail) {
    if (verifiedEmail == null) {
      throw new Error('Parameter can not be null or undefined');
    }
    return pool.query(`UPDATE ${table} SET ? WHERE email=?`, [verifiedEmail, verifiedEmail.email])
        .then(([resultSetHeader]) => new VerifiedEmail(verifiedEmail))
        .catch((err) => {
          throw err;
        });
  }

  /**
   * Removes a VerifiedEmail.
   * @param {VerifiedEmail} verifiedEmail The verifiedEmail to remove.
   * @return {Promise<boolean>} Promise object that it's true if the verifiedEmail it's been removed or else it's false.
   */
  static remove(verifiedEmail) {
    if (verifiedEmail == null) {
      throw new Error('Parameter can not be null or undefined');
    }
    return pool.query(`DELETE FROM ${table} WHERE email = ?`, verifiedEmail.email)
        .then(([resultSetHeader]) => {
          return resultSetHeader.affectedRows > 0;
        })
        .catch((err) => {
          throw err;
        });
  }

  /**
   * Checks if a verifiedEmail exists.
   * @param {VerifiedEmail} verifiedEmail The verifiedEmail to check if exists.
   * @return {Promise<boolean>} Promise object that it's true if the verifiedEmail exists in the db, or else it's false.
   */
  static exists(verifiedEmail) {
    if (verifiedEmail == null) {
      throw new Error('Parameter can not be null or undefined');
    }
    return pool.query(`SELECT * FROM ${table} WHERE email = ?`, verifiedEmail.email)
        .then(([rows]) => rows.length > 0)
        .catch((err) => {
          throw err;
        });
  }

  /**
   * Finds the VerifiedEmail with the passed email.
   * @param {string} email String representing an email.
   * @return {Promise<VerifiedEmail>} Promise object representing the VerifiedEmail with the passed email.
   */
  static findByEmail(email) {
    if (email == null) {
      throw new Error('Parameter can not be null or undefined');
    }
    return pool.query(`SELECT * FROM ${table} WHERE email = ?`, email)
        .then(([rows]) => {
          if (rows.length < 1) {
            throw new Error(`No result found: ${email}`);
          }
          return new VerifiedEmail(rows[0]);
        })
        .catch((err) => {
          throw err;
        });
  }

  /**
   * Finds all VerifiedEmails.
   * @return {Promise<VerifiedEmail[]>} Promise object representing the list of all VerifiedEmails.
   */
  static findAll() {
    return pool.query(`SELECT * FROM ${table}`)
        .then(([rows]) => {
          return rows.map((v) => new VerifiedEmail(v));
        })
        .catch((err) => {
          throw err;
        });
  }

  /**
   * Checks if an email it's verified.
   * @param {string} email Email to check.
   * @return {Promise<boolean>} Promise object that it's true if the passed email it's verified, or else it's false.
   */
  static isVerified(email) {
    if (email == null) {
      throw new Error('Parameter can not be null or undefined');
    }
    return pool.query(`SELECT * FROM ${table} WHERE email = ? AND signed_up = 0`, email)
        .then(([rows]) => rows.length > 0)
        .catch((err) => {
          throw err;
        });
  }
}

module.exports = VerifiedEmail;
