/**
 * Checks the student params.
 * @param {Student} student The student to check.
 * @return {boolean} True if the student attributes respect the format, or else it's false.
 * @todo Implementare la regex per la data di nascita
 */
exports.checkStudent = (student) => {
  const nameExp = /^[A-Za-z ‘]+$/;
  const surnameExp = /^[A-Za-z ‘]+$/;
  const emailExp = /^[a-z]\.[a-z]+[1-9]*\@(studenti\.)?unisa\.it$/;
  const registrationNumberExp = /^[0-9A-Za-z ‘]*$/;
  const passwordExp = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])[A-Za-z0-9!@#$%]{8,20}$/;
  const birthDateExp = /[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])/; // Non so se deve essere cosi
  if (!emailExp.test(student.email) || student.email.length > 50) {
    return false;
  }
  if (!nameExp.test(student.name) || student.name.length > 20) {
    return false;
  }
  if (!surnameExp.test(student.surname) || student.surname.length > 20) {
    return false;
  }
  if (!registrationNumberExp.test(student.registration_number) || student.registration_number.length > 20) {
    return false;
  }
  if (!passwordExp.test(student.password) || student.password.length > 20) {
    return false;
  }
  if (!birthDateExp.test(student.birth_date)) {
    return false;
  }
  return true;
};

/**
 * Checks the User params.
 * @param {User} professor The User to check.
 * @return {boolean} True if the user attributes respect the format, or else it's false.
 */
exports.checkProfessor = (professor) => {
  const nameExp = /^[A-Za-z ‘]+$/;
  const surnameExp = /^[A-Za-z ‘]+$/;
  const emailExp = /^[a-z]\.[a-z]*\@unisa\.it$/;
  const passwordExp = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])[A-Za-z0-9!@#$%]{8,20}$/;

  if (!emailExp.test(professor.email) || professor.email.length > 50) {
    return false;
  }
  if (!nameExp.test(professor.name) || professor.name.length > 20) {
    return false;
  }
  if (!surnameExp.test(professor.surname) || professor.surname.length > 20) {
    return false;
  }
  if (!passwordExp.test(professor.password) || professor.password.length > 20) {
    return false;
  }
  return true;
};

/**
 * Checks if the email respects the standard of ProfessorEmail
 * @param {string} email The email to check
 * @return {boolean} True if the email respects the format, else it's false.
 */
exports.checkVerifiedEmail = (email) => {
  const emailExp = /^[a-z]*\@unisa\.it$/;
  return emailExp.test(email) && email.length <= 50 && email.length >= 1;
};

/**
 * Checks if the email respects the standards.
 * @param {string} email The email to check.
 * @return {boolean} True if the email respects the format, else it's false.
 */
exports.checkEmail = (email) => {
  const emailExpStudent = /^[a-z]\.[a-z]+[1-9]*\@(studenti\.)?unisa\.it$/;
  const emailExpProfessor = /^[a-z]*\@unisa\.it$/;
  return (emailExpProfessor.test(email) || emailExpStudent.test(email)) && email.length <= 50 && email.length >= 1;
};

/**
 * Checks if the password respects the format.
 * @param {string} password The password to check.
 * @return {boolean} True if the password respects the format, else it's false.
 */
exports.checkPassword = (password) => {
  const passwordExp = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])[A-Za-z0-9!@#$%]{8,20}$/;
  return passwordExp.test(password) && password.length <= 20 && password.length >= 1;
};

/**
 * Checks if the assignment respects the format.
 * @param {Assignment} assignment Assignment to check.
 * @return {boolean} True if it respects, or else it's false.
 */
exports.checkAssignment = (assignment) => {
  const noticeProtocolExp = /Prot. n. [0-9]+/;
  const studentExp = /^[a-z]\.[a-z]+[1-9]*\@(studenti\.)?unisa\.it$/;
  const codeExp = /[A-Z]+\/[1-9]+/;
  const idExp = /[1-9]+/;
  const totalNumberHoursExp = /[0-9]+/;
  const title = /PhD|Master/;
  const hourlyCostExp = /[0-9]+(.[0-9]{2})?/;
  const stateExp = /Unassigned|Waiting|Booked|Assigned|Over/;
  if (!noticeProtocolExp.test(assignment.notice_protocol)) {
    return false;
  }
  if (assignment.student != null && !studentExp.test(assignment.student)) {
    return false;
  }
  if (!codeExp.test(assignment.code)) {
    return false;
  }
  if (assignment.id != null && !idExp.test(assignment.id)) {
    return false;
  }
  if (!totalNumberHoursExp.test(assignment.total_number_hours) || assignment.total_number_hours > 50 || assignment.total_number_hours < 1) {
    return false;
  }
  if (!title.test(assignment.title)) {
    return false;
  }
  if (!hourlyCostExp.test(assignment.hourly_cost) || assignment.hourly_cost > 150 || assignment.hourly_cost < 1) {
    return false;
  }
  if (!stateExp.test(assignment.state)) {
    return false;
  }
  if (assignment.ht_fund != null && assignment.ht_fund.length > 50) {
    return false;
  }
  if (assignment.activity_description == null || assignment.activity_description.length > 200 || assignment.activity_description.length < 1) {
    return false;
  }

  return true;
};

exports.checkNoticeProtocol = (noticeProtocol) => {
  const noticeProtocolExp = /Prot. n. [0-9]+/;
  return noticeProtocolExp.test(noticeProtocol) && noticeProtocol.length <= 125;
};
