const DocumentStub = require('../stub/documentStub');

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

const candidatureStubList = [
  {
    student: {email: 'f.migliaro69@studenti.unisa.it'},
    notice_protocol: 'Prot. n. 0279008',
    state: States.EDITABLE,
    last_edit: new Date(),
  },
  {
    student: {email: 'm.dantonio69@studenti.unisa.it'},
    notice_protocol: 'Prot. n. 0279008',
    state: States.EDITABLE,
    last_edit: new Date(),
  },
];

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

    return new Promise((resolve) => resolve())
        .then(() => candidature.documents.forEach((d) => DocumentStub.create(d, candidature)))
        .then(() => new Candidature(candidature))
        .catch((err) => {
          throw err;
        });
  }
  // TO COMPLETE DON'T FORGET AAAAAAA
  /**
   * Updates a Candidature.
   * @param {Candidature} candidature The candidature to update.
   * @return {Promise<Candidature>} Promise object representing the updated Candidature.
   */
  static async update(candidature) {
    if (candidature == null) {
      throw new Error('Parameter can not be null or undefined');
    }
    if (!await this.exists(candidature)) {
      throw new Error('The candidature doesn\'t exist');
    }

    return new Promise((resolve) => resolve())
        .then(() => new Candidature(candidature))
        .catch((err) => {
          throw err;
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

    return new Promise((resolve) => resolve())
        .then(() => {
          delete candidature.documents;

          return candidatureStubList.pop(candidature) != null;
        })
        .catch((err) => {
          throw err;
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

    return new Promise((resolve) => resolve())
        .then(() => {
          const predicate = (c) => {
            c.student.email === candidature.student.email;
            c.notice_protocol === candidature.notice_protocol;
          };

          return candidatureStubList.filter(predicate).length > 0;
        })
        .catch((err) => {
          throw err;
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

    return new Promise((resolve) => resolve())
        .then(async () => {
          const predicate = (c) => {
            c.student.email === email;
            c.notice_protocol === protocol;
          };

          const filtered = candidatureStubList.filter(predicate);

          if (filtered.length < 1) {
            throw new Error('No element was found ');
          }

          const res = filtered[0];

          res.documents = await DocumentStub.findByCandidature(res);

          return new Candidature(res);
        })
        .catch((err) => {
          throw err;
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

    return new Promise((resolve) => resolve())
        .then(async () => {
          const predicate = (c) => {
            c.student.email === email;
          };

          const filtered = candidatureStubList.filter(predicate);

          const candidatures = await Promise.all(filtered.map(async (c) => {
            c.documents = await DocumentStub.findByCandidature(c);

            return new Candidature(c);
          }));

          return candidatures;
        })
        .catch((err) => {
          throw err;
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

    return new Promise((resolve) => resolve())
        .then(async () => {
          const predicate = (c) => {
            return c.notice_protocol === protocol;
          };

          const filtered = candidatureStubList.filter(predicate);

          const candidatures = await Promise.all(filtered.map(async (c) => {
            c.documents = await DocumentStub.findByCandidature(c);

            return new Candidature(c);
          }));

          return candidatures;
        })
        .catch((err) => {
          throw err;
        });
  }

  /**
   * Finds the list of all the candidatures.
   * @return {Promise<Candidature[]>} Promise object representing all the candidatures.
   */
  static findAll() {
    return new Promise((resolve) => resolve())
        .then(async () => {
          const candidatures = await Promise.all(candidatureStubList.map(async (c) => {
            c.documents = await DocumentStub.findByCandidature(c);

            return new Candidature(c);
          }));

          return candidatures;
        })
        .catch((err) => {
          throw err;
        });
  }
}

Candidature.States = States;

module.exports = Candidature;
