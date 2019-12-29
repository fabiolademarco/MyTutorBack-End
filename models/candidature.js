const pool = require('../db');
const Document = require('./document');
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
 * @todo Controllare che la find funzioni...
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
    this.documents = candidature.documents.map((d) => new Document(d));
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
    return pool.query(`INSERT INTO ${table} VALUES(?, ?, ?, ?)`, [candidature.student, candidature.notice_protocol, candidature.state, candidature.last_edit])
        .then(() => candidature.documents.forEach((d) => Document.create(d, candidature)))
        .then(() => new Candidature(candidature))
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
    return pool.query(`UPDATE ${table} SET state = ?, last_edit = ? WHERE student = ? AND notice_protocol = ?`, [candidature.state, candidature.last_edit, candidature.student, candidature.notice_protocol])
        .then(() => Document.findByCandidature(candidature))
        .then((documents) => {
          const map = new Map();
          const toUpdate = [];
          const toCreate = [];
          documents.forEach((d) => map.set(d.file_name, d));
          candidature.forEach((doc) => {
            if (map.has(doc.file_name)) {
              map.delete(doc.file_name);
              toUpdate.push(doc);
            } else {
              toCreate.push(doc);
            }
          });
          return Promise.all(
              toUpdate.map((doc) => Document.update(doc, candidature)),
              toCreate.map((doc) => Document.create(doc, candidature)),
              map.map((doc) => Document.remove(doc, candidature)),
          );
        })
        .then(() => new Candidature(candidature))
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
    let candidature = '';
    return pool.query(`SELECT * FROM ${table} WHERE student = ? AND notice_protocol = ?`, [email, protocol])
        .then(([rows]) => {
          if (rows.length < 1) {
            throw new Error(`No result found: ${email} and ${protocol}`);
          }
          candidature = new Candidature(rows[0]);
          return Document.findByCandidature(candidature);
        })
        .then((documents) => {
          candidature.documents = documents;
          return candidature;
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
    let candidatures = [];
    return pool.query(`SELECT * FROM ${table} WHERE student = ?`, email)
        .then(([rows]) => {
          candidatures = rows.map((c) => new Candidature(c));
          return Promise.all(candidatures.map((c) => Document.findByCandidature(c)));
        })
        .then((documents) => {
          documents.forEach((doc, i) => candidatures[i].documents = doc);
          return candidatures;
        })
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
    let candidatures = [];
    return pool.query(`SELECT * FROM ${table} WHERE notice_protocol = ?`, protocol)
        .then(([rows]) => {
          candidatures = rows.map((c) => new Candidature(c));
          return Promise.all(candidatures.map((c) => Document.findByCandidature(c)));
        })
        .then((documents) => {
          documents.forEach((doc, i) => candidatures[i].documents = doc);
          return candidatures;
        })
        .catch((err) => {
          throw err.message;
        });
  }

  /**
   * Finds the list of all the candidatures.
   * @return {Promise<Candidature[]>} Promise object representing all the candidatures.
   */
  static findAll() {
    let candidatures;
    return pool.query(`SELECT * FROM ${table}`)
        .then(([rows]) => {
          candidatures = rows.map((c) => new Candidature(c));
          return Promise.all(candidatures.map((c) => Document.findByCandidature(c)));
        })
        .then((documents) => {
          documents.forEach((doc, i) => candidatures[i].documents = doc);
          return candidatures;
        })
        .catch((err) => {
          throw err.message;
        });
  }
}

Candidature.States = States;

module.exports = Candidature;