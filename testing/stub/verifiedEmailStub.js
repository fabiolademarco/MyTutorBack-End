const emailsVerified = [
  {
    email: 'r.zizza@unisa.it',
    signed_up: 0,
  },
  {
    email: 'alberto@unisa.it',
    signed_up: 1,
  },
  {
    email: 'cattaneo@unisa.it',
    signed_up: 1,
  },
  {
    email: 'fferrucci@unisa.it',
    signed_up: 0,
  },
  {
    email: 'u.vaccaro@unisa.it',
    signed_up: 0,
  },
];

/**
 * VerifiedEmail
 *
 * This class represents a VerifiedEmail
 *
 * @author Roberto Bruno
 *
 * @copyright 2019 - Copyright by Gang Of Four Eyes
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

    return new Promise((resolve) => resolve())
        .then(async () => {
          if (await this.exists(verifiedEmail)) {
            throw new Error('Email already exists');
          }
          emailsVerified.push(verifiedEmail);

          return verifiedEmail;
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
  static async update(verifiedEmail) {
    if (verifiedEmail == null) {
      throw new Error('Parameter can not be null or undefined');
    }

    return new Promise((resolve) => resolve())
        .then(() => {
          if (!this.exists(verifiedEmail)) {
            throw new Error('Email doesn\'t exist');
          }
          emailsVerified[emailsVerified.indexOf(verifiedEmail)] = verifiedEmail;

          return verifiedEmail;
        })
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

    return new Promise((resolve) => resolve())
        .then(() => {
          return emailsVerified.pop(verifiedEmail) != null;
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

    return new Promise((resolve) => resolve())
        .then(() => {
          return emailsVerified.filter((el) => el.email === verifiedEmail.email).length > 0;
        })
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

    return new Promise((resolve) => resolve())
        .then(() => {
          const list = emailsVerified.filter((el) => el.email === email);

          return (list.length > 0) ? list[0] : null;
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
    return new Promise((resolve) => resolve())
        .then(() => emailsVerified)
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

    return new Promise((resolve) => resolve())
        .then(() => {
          return emailsVerified.filter((el) => el.email === email && el.signed_up === 0).length > 0;
        })
        .catch((err) => {
          throw err;
        });
  }
}

module.exports = VerifiedEmail;
