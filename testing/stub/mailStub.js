
/**
 * Sends the mail to professor to confirm the registration
 * @param {string} receiver The email of the receiver
 * @param {string} token The token jwt
 * @return {Promise} Promise object which sends the mail
 */
exports.sendEmailToProfessor = (receiver, token) => {
  return new Promise((resolve) => resolve());
};

/**
 * Sends the mail to a student to inform about the request of an assignment
 * @param {string} receiver The email of the receiver
 * @return {Promise} Promise object which sends the mail
 */
exports.sendEmailToStudentRequest = (receiver) => {
  return new Promise((resolve) => resolve());
};

/**
 * Sends the mail to teachingOffice to inform about the booking of the assignment
 * @param {string} receiver The email of the receiver
 * @param {Assignment} assignment The assignment which is been booked
 * @return {Promise} Promise object which sends the mail
 */
exports.sendEmailToTeachingOfficeBook = (receiver, assignment) => {
  return new Promise((resolve) => resolve());
};

/**
 * Sends the mail to an student to inform about the assigned assignment
 * @param {string} receiver The email of the receiver
 * @param {string} assignmentCode The code of the assigned assignment
 * @return {Promise} Promise object which sends the mail
 */
exports.sendEmailToStudentAssign = (receiver, assignmentCode) => {
  return new Promise((resolve) => resolve());
};

/**
 * Sends a mail to Teaching office to inform about the decline of an assignment
 * @param {string} receiver The email of the receiver
 * @param {string} student The email fo the student, who declined the assignment
 * @param {string} assignmentCode The code of the declined assignment
 * @return {Promise} Promise object which sends the mail
 */
exports.sendEmailToTeachingOfficeDecline = (receiver, student, assignmentCode) => {
  return new Promise((resolve) => resolve());
};
