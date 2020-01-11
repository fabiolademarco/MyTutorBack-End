const applicationStub = [
  {
    notice_protocol: 'Prot. n. 0275137',
    documents_to_attach: 'dichiarazione sostitutiva di certificazione relativa all\'avvenuto conseguimento del diploma di laurea magistrale, alla votazione riportata ed alla data del suo conseguimento;   - dichiarazione sostitutiva di certificazione all\'iscrizione al corso di dottorato di ricerca con sede presso l\'Università degli Studi di Salerno;   - dichiarazione sostitutiva di certificazione, resa ai sensi del D.P.R. 445/2000, relativa a precedenti attività di tutorato, didattico-integrative, propedeutiche e di recupero in ambito universitario',
  },
  {
    notice_protocol: 'Prot. n. 0279008',
    documents_to_attach: 'dichiarazione sostitutiva di certificazione relativa all\'avvenuto conseguimento del diploma di laurea magistrale, alla votazione riportata ed alla data del suo conseguimento;   - dichiarazione sostitutiva di certificazione all\'iscrizione al corso di dottorato di ricerca con sede presso l\'Università degli Studi di Salerno;   - dichiarazione sostitutiva di certificazione, resa ai sensi del D.P.R. 445/2000, relativa a precedenti attività di tutorato, didattico-integrative, propedeutiche e di recupero in ambito universitario',
  },
];

/**
 * ApplicationSheetStub
 *
 * This class represents an Application Sheet stub
 *
 * @author Francesco Migliaro
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

  /**
   * Creates an application sheet.
   * @param {ApplicationSheet} applicationSheet The application sheet to create.
   * @return {Promise<ApplicationSheet>} Promise representing the fulfillment of an application sheet creation.
   */
  static create(applicationSheet) {
    if (!applicationSheet) {
      throw new Error('No Parameters');
    }
    applicationStub.push(applicationSheet);

    return new Promise((resolve) => resolve())
        .then(() => applicationSheet)
        .catch((err) => {
          throw err;
        });
  }

  /**
   * Updates an applicatin sheet.
   * @param {ApplicationSheet} applicationSheet The application sheet to update.
   * @return {Promise<ApplicationSheet>} Promise representing the fulfillment of the application sheet update.
   */
  static async update(applicationSheet) {
    if (!applicationSheet) {
      throw new Error('No Parameters');
    }
    const index = applicationStub.findIndex((app) => app.notice_protocol === applicationSheet.notice_protocol);

    if (index != -1) {
      applicationStub[index] = applicationSheet;
    } else {
      throw new Error('the application sheet doesn\'t exist');
    }

    return new Promise((resolve) => resolve())
        .then(() => new ApplicationSheet(applicationSheet))
        .catch((err) => {
          throw err;
        });
  }

  /**
   * Removes an application sheet.
   * @param {ApplicationSheet} applicationSheet The application sheet to remove.
   * @return {Promise<boolean>} Promise representing the fulfillment of the application sheet removal.
   */
  static remove(applicationSheet) {
    if (!applicationSheet) {
      throw new Error('No Parameters');
    }

    return new Promise((resolve) => resolve())
        .then(() => true)
        .catch((err) => {
          throw err;
        });
  }

  /**
   * Checks if an application sheet exists.
   * @param {ApplicationSheet} applicationSheet The application sheet to check.
   * @return {Promise<boolean>} Promise that resolves to true if the application sheet exists, false otherwise.
   */
  static exists(applicationSheet) {
    if (!applicationSheet) {
      throw new Error('No Parameters');
    }

    return new Promise((resolve) => resolve())
        .then(() => {
          const protocols = applicationStub.map((app) => app.notice_protocol);


          return protocols.includes(applicationSheet.notice_protocol);
        })
        .catch((err) => {
          throw err;
        });
  }

  /**
   * Finds an application sheet based on the protocol.
   * @param {NoticeProtocol} noticeProtocol The notice protocol on which to filter.
   * @return {Promise<ApplicationSheet>} Promise representing the fulfillment of the rapplication sheet search.
   */
  static findByNotice(noticeProtocol) {
    if (!noticeProtocol) {
      throw new Error('No Parameters');
    }

    return new Promise((resolve) => resolve())
        .then(() => {
          const filtered = applicationStub.filter((app) => app.notice_protocol == noticeProtocol);


          return (filtered.length < 0) ? null : new ApplicationSheet(filtered[0]);
        })
        .catch((err) => {
          throw err;
        });
  }

  /**
   * Returns application sheet table content.
   * @return {Promise<ApplicationSheet[]>} Promise representing the fulfillment of the application sheet search.
   */
  static findAll() {
    return new Promise((resolve) => resolve())
        .then(() => {
          return applicationStub.map((app) => new ApplicationSheet(app));
        })
        .catch((err) => {
          throw err;
        });
  }
}


module.exports = ApplicationSheet;
