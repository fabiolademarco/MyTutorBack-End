const pool = require('../db');
const table = 'candidature';
/**
 * Enum for all possible states of a notice
 * @readonly
 * @enum {string}
 */
const States = {
  EDITABLE: 'Editable',
  IN_EVALUATION: 'In Evaluation',
  REJECTED: 'Rejected',
  IN_GRADED_LIST: 'In Granded List',
};

/**
 * Candidature
 *
 * This class represents a Candidature
 *
 * @author Roberto Bruno
 *
 * @copyright 2019 - Copyright by Gang Of Four Eyes
 */
class Candidature {
  /**
   * Candidature object constructor
   * @param {Candidature} candidature
   */
  constructor(candidature) {
    this.student = candidature.student;
    this.notice_protocol = candidature.notice_protocol;
    this.state = Object.values(States).includes(candidature.state) ? candidature.state : null;
    this.last_edit = candidature.last_edit;
  }

  /**
   * Creates a new Candidature.
   * @param {Candidature} candidature The candidature to save.
   * @return {Promise<Candidature>} Promise object representing the created Candidature.
   */
  static create(candidature) {
    if (candidature == null) {
      throw new Error('Parameter can not be null or undefined');
    }
    return pool.query(`INSERT INTO ${table} SET ?`, candidature)
        .then(([resultSetHeader]) => {
          return new Candidature(candidature);
        })
        .catch((err) => {
          throw err.message;
        });
  }

  /**
   * Updates a Candidature.
   * @param {Candidature} candidature The candidature to update.
   * @return {Promise<Candidature>} Promise object representing the updated Candidature.
   */
  static update(candidature) {
    if (candidature == null) {
      throw new Error('Parameter can not be null or undefined');
    }
    return pool.query(`UPDATE ${table} SET ? WHERE student = ? AND notice_protocol = ?`, [candidature.student, candidature.notice_protocol])
        .then(([resultSetHeader]) => new Candidature(candidature))
        .catch((err) => {
          throw err.message;
        });
  }

  /**
   * Removes a candidature.
   * @param {Candidature} candidature The candidature to remove.
   * @return {Promise<Candidature>} Promise object representing the boolean result of operation.
   */
  static remove(candidature) {
    if (candidature == null) {
      throw new Error('Parameter can not be null or undefined');
    }
    return pool.query(`DELETE FROM ${table} WHERE student = ? AND notice_protocol = ?`, [candidature.student, candidature.notice_protocol])
        .then(([resultSetHeader]) => resultSetHeader.affectedRows > 0)
        .catch((err) => {
          throw err.message;
        });
  }

  /**
   * Checks if an candidature exists.
   * @param {Candidature} candidature The candidature to check.
   * @return {Promise<boolean>} Promise object that it's true if the candidature exists in the db, or else it's false.
   */
  static exists(candidature) {
    if (candidature == null) {
      throw new Error('Parameter can not be null or undefined');
    }
    return pool.query(`SELECT * FROM ${table} WHERE student = ? AND notice_protocol = ?`, [candidature.student, candidature.notice_protocol])
        .then(([rows]) => rows.length > 0)
        .catch((err) => {
          throw err.message;
        });
  }

  /**
   * Finds a candidature.
   * @param {string} email The email of the student.
   * @param {string} protocol The notice protocol.
   * @return {Promise<Candidature>} Promise object representing the candidature with the given email and protocol.
   */
  static findById(email, protocol) {
    if (email == null || protocol == null) {
      throw new Error('Parameters can not be null or undefined');
    }
    return pool.query(`SELECT * FROM ${table} WHERE student = ? AND notice_protocol = ?`, [email, protocol])
        .then(([rows]) => {
          if (rows.length < 1) {
            throw new Error(`No result found: ${email} and ${protocol}`);
          }
          return new Candidature(rows[0]);
        })
        .catch((err) => {
          throw err.message;
        });
  }

  /**
   * Finds the candidature of the given student.
   * @param {string} email The email of the student.
   * @return {Promise<Candidature[]>} Promise object representing the list of candidature of the given student.
   */
  static findByStudent(email) {
    if (email == null) {
      throw new Error('Parameter can not be null or undefined');
    }
    return pool.query(`SELECT * FROM ${table} WHERE student = ?`, email)
        .then(([rows]) => rows.map((c) => new Candidature(c)))
        .catch((err) => {
          throw err.message;
        });
  }

  /**
   * Finds the candidature of a notice.
   * @param {string} protocol The notice protocol.
   * @return {Promise<Candidature[]>} Promise object representing the list of candidature of the given notice.
   */
  static findByNotice(protocol) {
    if (protocol == null) {
      throw new Error('Parameter can not be null or undefined');
    }
    return pool.query(`SELECT * FROM ${table} WHERE notice_protocol = ?`, protocol)
        .then(([rows]) => rows.map((c) => new Candidature(c)))
        .catch((err) => {
          throw err.message;
        });
  }

  /**
   * Finds the list of all the candidatures.
   * @return {Promise<Candidature[]>} Promise object representing all the candidatures.
   */
  static findAll() {
    return pool.query(`SELECT * FROM ${table}`)
        .then(([rows]) => rows.map((c) => new Candidature(c)))
        .catch((err) => {
          throw err.message;
        });
  }
}

module.exports = Candidature;
