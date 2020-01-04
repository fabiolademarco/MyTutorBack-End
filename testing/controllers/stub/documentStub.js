
const documentStubList = [
  {
    notice_protocol: 'Prot. n. 0279008',
    student: 'f.migliaro69@studenti.unisa.it',
    file_name: 'paperino',
    file: 123,
  },
  {
    notice_protocol: 'Prot. n. 0279008',
    student: 'f.migliaro69@studenti.unisa.it',
    file_name: 'pippo',
    file: 123,
  },
];

/**
 * Document
 *
 * This class represents a Document
 *
 * @author Francesco Migliaro
 *
 * @copyright 2019 - Copyright by Gang Of Four Eyes
 */
class Document {
  /**
   * Document object constructor
   * @param {Document} aDocument The JS object that contains fields for setting new Document object
   */
  constructor(aDocument) {
    this.student = aDocument.student;
    this.notice_protocol = aDocument.notice_protocol;
    this.file_name = aDocument.file_name;
    this.file = aDocument.file;
  }

  /**
   * Creates a new document in database.
   * @param {Document} aDocument The document to save.
   * @param {Candidature} candidature The candidature correlates to the document.
   * @return {Promise<Document>} Promise that represents the created document.
   */
  static create(aDocument, candidature) {
    if (aDocument == null || candidature == null) {
      throw new Error('The document/candidature must not be null.');
    }
    aDocument.notice_protocol = candidature.notice_protocol;
    aDocument.student = candidature.student;

    return new Promise((resolve) => resolve())
        .then(() => {
          return new Document(aDocument);
        })
        .catch((err) => {
          throw err;
        });
  }

  /**
   * Updates a document in database.
   * @param {Document} aDocument The document to update.
   * @param {Candidature} candidature The candidature correlates to the document.
   * @return {Promise<Document>} Promise that represents the updated document.
   */
  static async update(aDocument, candidature) {
    if (aDocument == null || candidature == null || !await this.exists(aDocument, candidature)) {
      throw new Error('The document/candidature is either null or the document is not in the database.');
    }

    aDocument.notice_protocol = candidature.notice_protocol;
    aDocument.student = candidature.student;

    return new Promise((resolve) => resolve())
        .then(() => {
          if (!this.exists(aDocument)) {
            throw new Error('The documentdoes not exist');
          }
          documentStubList[documentStubList.indexOf(aDocument)] = aDocument;
        });
  }

  /**
 * Removes a document in database.
 * @param {Document} aDocument The document to remove.
 * @param {Candidature} candidature The candidature correlates to the document.
 * @return {Promise<boolean>} Promise that represents the value of the action.
 */
  static remove(aDocument, candidature) {
    if (aDocument == null || candidature == null) {
      throw new Error('The document/candidature must not be null.');
    }
    aDocument.notice_protocol = candidature.notice_protocol;
    aDocument.student = candidature.student;

    return new Promise((resolve) => resolve())
        .then(() => {
          return documentStubList.pop(aDocument);
        })
        .catch((err) => {
          throw err;
        });
  }

  /**
   * Checks if a document exists.
   * @param {Document} aDocument The document to check.
   * @param {Candidature} candidature The candidature correlates to the document.
   * @return {Promise<boolean>} Promise that represents the value of the action.
   */
  static exists(aDocument, candidature) {
    if (aDocument == null || candidature == null) {
      throw new Error('The document/candidature must not be null.');
    }
    aDocument.notice_protocol = candidature.notice_protocol;
    aDocument.student = candidature.student;

    return new Promise((resolve) => resolve())
        .then(() => {
          const predicate = (doc) => {
            doc.student === aDocument.student;
            doc.file_name === aDocument.file_name;
            doc.notice_protocol === aDocument.notice_protocol;
          };

          return documentStubList.filter(predicate).length > 0;
        })
        .catch((err) => {
          throw err;
        });
  }

  /**
   * Finds the document with the specific id.
   * @param {string} name The filename of the document.
   * @param {string} studentEmail The email of the student correlate to the document.
   * @param {string} noticeProtocol The protocol of the notice correlate to the document.
   * @return {Promise<Document>} Promise that represents the document.
   */
  static findById(name, studentEmail, noticeProtocol) {
    if (name == null || studentEmail == null || noticeProtocol == null) {
      throw new Error('The name/student email/notice protocol must not be null.');
    }

    return new Promise((resolve) => resolve())
        .then(() => {
          const predicate = (doc) => {
            doc.student === studentEmail;
            doc.file_name === name;
            doc.notice_protocol === noticeProtocol;
          };
          const filtered = documentStubList.filter(predicate);

          return (filtered.length > 0) ? new Document(filtered[0]) : null;
        })
        .catch((err) => {
          throw err;
        });
  }

  /**
   * Finds the documents correlate to a specific notice.
   * @param {string} noticeProtocol The protocol of the notice.
   * @return {Promise<Document[]>} Promise that respresents the Documents correlated to the specific notice.
   */
  static findByNotice(noticeProtocol) {
    if (noticeProtocol == null) {
      throw new Error('The notice protocol must not be null.');
    }

    return new Promise((resolve) => resolve())
        .then(() => {
          return documentStubList.filter((el) => el.notice_protocol === noticeProtocol)
              .map((el) => new Document(el));
        })
        .catch((err) => {
          throw err;
        });
  }

  /**
   * Finds the documents correlate to a specific candidature.
   * @param {Candidature} candidature The candidature.
   * @return {Promise<Document[]>} Promise that respresents the Documents correlated to the specific candidature.
   */
  static findByCandidature(candidature) {
    if (candidature == null) {
      throw new Error('The candidature must not be null.');
    }

    return new Promise((resolve) => resolve())
        .then(() => {
          const predicate = (doc) => {
            doc.student === candidature.student;
            doc.notice_protocol === candidature.notice_protocol;
          };

          return documentStubList.filter(predicate).map((el) => new Document(el));
        })
        .catch((err) => {
          throw err;
        });
  }

  /**
   * Finds the documents correlate to a specific student.
   * @param {string} studentEmail The email of the student.
   * @return {Promise<Document[]>} Promise that respresents the Documents correlated to the specific student.
   */
  static findByStudent(studentEmail) {
    if (studentEmail == null) {
      throw new Error('The student email must not be null.');
    }

    return new Promise((resolve) => resolve())
        .then(() => {
          const predicate = (doc) => {
            doc.student === studentEmail;
          };

          return documentStubList.filter(predicate).map((el) => new Document(el));
        })
        .catch((err) => {
          throw err;
        });
  }

  /**
   * Finds all the documents.
   * @return {Promise<Document[]>} Promise that respresents all the Documents.
   */
  static findAll() {
    return new Promise((resolve) => resolve())
        .then(() => {
          return documentStubList.map((el) => new Document(el));
        })
        .catch((err) => {
          throw err;
        });
  }
}


module.exports = Document;
