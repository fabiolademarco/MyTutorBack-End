/**
 * Checks the student params.
 * @param {Student} student The student to check.
 * @return {boolean} True if the student attributes respect the format, or else it's false.
 * @todo Implementare la regex per la data di nascita
 */
exports.checkStudent = (student) => {
  const nameExp = /^[A-Za-z ‘]+$/;
  const surnameExp = /^[A-Za-z ‘]+$/;
  const emailExp = /^[a-z]\.[a-z]+[0-9]*\@(studenti\.)?unisa\.it$/;
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
  if (!registrationNumberExp.test(student.registration_number) || student.registration_number.length > 20 || student.registration_number.length < 1) {
    return false;
  }
  if (!passwordExp.test(student.password) || student.password.length > 20 || student.password.length < 8) {
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
  const emailExp = /^[a-z]*(\.[a-z]*)?\@unisa\.it$/;
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
  if (!passwordExp.test(professor.password) || professor.password.length > 20 || professor.password.length < 8) {
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
  const emailExp = /^[a-z]*(\.[a-z]*)?\@unisa\.it$/;

  return emailExp.test(email) && email.length <= 50 && email.length >= 1;
};

/**
 * Checks if the email respects the standards.
 * @param {string} email The email to check.
 * @return {boolean} True if the email respects the format, else it's false.
 */
exports.checkEmail = (email) => {
  const emailExpStudent = /^[a-z]\.[a-z]+[0-9]*\@(studenti\.)?unisa\.it$/;
  const emailExpProfessor = /^[a-z]*(\.[a-z]*)?\@unisa\.it$/;

  return ((emailExpProfessor.test(email) || emailExpStudent.test(email))) && (email.length <= 50 && email.length >= 1);
};

/**
 * Checks if the password respects the format.
 * @param {string} password The password to check.
 * @return {boolean} True if the password respects the format, else it's false.
 */
exports.checkPassword = (password) => {
  const passwordExp = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])[A-Za-z0-9!@#$%]{8,20}$/;

  return passwordExp.test(password) && password.length <= 20 && password.length >= 8;
};

/**
 * Checks if the assignment respects the format.
 * @param {Assignment} assignment Assignment to check.
 * @return {boolean} True if it respects, or else it's false.
 */
exports.checkAssignment = (assignment) => {
  const noticeProtocolExp = /Prot. n. [0-9]+/;
  const studentExp = /^[a-z]\.[a-z]+[0-9]*\@(studenti\.)?unisa\.it$/;
  const codeExp = /[A-Z]+\/[0-9]+/;
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
  if (!codeExp.test(assignment.code) || assignment.code.length > 30 || assignment.code.length < 1) {
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
  if (assignment.note != null && (assignment.note.length > 500 || assignment.note.length < 1)) {
    return false;
  }

  return true;
};

/**
 * Checks if a notice protocol respects the format.
 * @param {string} noticeProtocol Protocol to check.
 * @return {boolean} True if it respects the format, false otherwirse.
 */
exports.checkNoticeProtocol = (noticeProtocol) => {
  const noticeProtocolExp = /Prot. n. [0-9]+/;

  return noticeProtocolExp.test(noticeProtocol) && noticeProtocol.length <= 125;
};

/**
 * Checks if a comment respects the format.
 * @param {Comment} comment Comment to check.
 * @return {boolean} True if it respects the format, false otherwise.
 */
exports.checkComment = (comment) => {
  return comment.text.length >= 1 && comment.text.length <= 500;
};

/**
 * Checks if an application sheet respects the format.
 * @param {ApplicationSheet} applicationSheet Application sheet to check.
 * @return {boolean} True if it resepcts the format, false otherwise.
 */
exports.checkApplicationSheet = (applicationSheet) => {
  return applicationSheet.documents_to_attach.length >= 1 && applicationSheet.documents_to_attach.length <= 5000;
};

/**
 * Checks if a comment respect the format.
 * @param {Rating} rating Comment to check.
 * @return {boolean} True if it respects the format, False otherwise.
 */
exports.checkRating = (rating) => {
  const assignmentIdExp = /[1-9]+/;
  const studentExp = /^[a-z]\.[a-z]+[0-9]*\@(studenti\.)?unisa\.it$/;
  const titleScoreExp = /^[0-9]+$/;
  const interviewScoreExp = /^[0-9]+$/;

  if (!assignmentIdExp.test(rating.assignment_id)) {
    return false;
  }
  if (!studentExp.test(rating.student)) {
    return false;
  }

  if (!titleScoreExp.test(rating.titles_score)) {
    return false;
  }

  if (!interviewScoreExp.test(rating.interview_score)) {
    return false;
  }

  return true;
};

/**
 * Checks if a comment respect the format.
 * @param {Rating[]} ratingList Comment to check.
 * @return {boolean} True if it respects the format, False otherwise.
 */
exports.checkRatingList = (ratingList) => {
  return ratingList.every(this.checkRating);
};

/**
 * Checks if an evaluation criterion respects the format.
 * @param {EvaluationCriterion} evaluationCriterion Evaluation criterion to check.
 * @return {boolean} True if it respects the format, false otherwise.
 */
exports.checkEvaluationCriterion = (evaluationCriterion) => {
  const maxScoreExp = /^[0-9]+$/;

  if (evaluationCriterion.name.length < 1 || evaluationCriterion.name.length > 125) {
    return false;
  }
  // TODO controllare se c'è già nel bando
  if (!maxScoreExp.test(evaluationCriterion.max_score) || evaluationCriterion.max_score < 1 || evaluationCriterion.max_score > 27) {
    return false;
  }

  return true;
};

/**
 * Checks if an article respects the format.
 * @param {Article} article Article to check.
 * @return {boolean} True if it respects the format, false otherwise.
 */
exports.checkArticle = (article) => {
  const articleInitialExp = /^[A-Z a-z]+$/;

  if (article.initial.length < 1 || article.initial.length > 20 || !articleInitialExp.test(article.initial)) {
    return false;
  }

  if (article.text.length < 1 || article.text.length > 5000) {
    return false;
  }

  return true;
};

/**
 * Checks if a notice respects the format.
 * @param {Notice} notice Notice to check.
 * @return {boolean} True if it respects the format, false otherwise.
 */
exports.checkNotice = (notice) => {
  const noticeFundsExp = /^[0-9]+(.[0-9]{2})?$/;
  const noticeDeadlineExp = /[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])/;

  if (!this.checkNoticeProtocol(notice.protocol)) {
    return false;
  }

  if (notice.description.length < 1 || notice.description.length > 300) {
    return false;
  }

  if (notice.notice_subject.length < 1 || notice.notice_subject.length > 2000) {
    return false;
  }

  if (notice.assignments.length < 1 || notice.assignments.length > 15) {
    return false;
  }

  if (!notice.assignments.every(this.checkAssignment)) {
    return false;
  }

  if (notice.admission_requirements.length < 1 || notice.admission_requirements.length > 5000) {
    return false;
  }

  if (notice.evaluation_criteria.length < 1 || notice.evaluation_criteria.length > 6) {
    return false;
  }

  if (!notice.evaluation_criteria.every(this.checkEvaluationCriterion)) {
    return false;
  }

  if (notice.assessable_titles != null && (notice.assessable_titles.length < 1 || notice.assessable_titles.length > 5000)) {
    return false;
  }

  if (notice.how_to_submit_applications.length < 1 || notice.how_to_submit_applications.length > 5000) {
    return false;
  }

  if (notice.selection_board.length < 1 || notice.selection_board.length > 5000) {
    return false;
  }

  if (notice.acceptance.length < 1 || notice.acceptance.length > 5000) {
    return false;
  }

  if (notice.incompatibility.length < 1 || notice.incompatibility.length > 5000) {
    return false;
  }

  if (notice.termination_of_the_assignment.length < 1 || notice.termination_of_the_assignment.length > 5000) {
    return false;
  }

  if (notice.nature_of_the_assignment.length < 1 || notice.nature_of_the_assignment.length > 5000) {
    return false;
  }

  if (notice.unused_funds.length < 1 || notice.unused_funds.length > 5000) {
    return false;
  }

  if (notice.responsible_for_the_procedure.length < 1 || notice.responsible_for_the_procedure.length > 5000) {
    return false;
  }

  if (notice.notice_funds < 1 || !noticeFundsExp.test(notice.notice_funds)) {
    return false;
  }

  if (notice.type.length < 1 || notice.type.length > 50) {
    return false;
  }

  if (!noticeDeadlineExp.test(notice.deadline)) {
    return false;
  }

  if (notice.articles.length < 1 || notice.articles.length > 20) {
    return false;
  }

  if (!notice.articles.every(this.checkArticle)) {
    return false;
  }

  return true;
};

/** const filter = {
    email: param.email,
    name: param.name,
    surname: param.surname,
    role: param.role,
    verified: param.verified,
  };
 * Check if user filter respects the format
 * @param {Object} filter Filter to check.
 * @return {boolean} True if it respects the format, false otherwise.
 */
exports.checkUserFilter = (filter) => {
  const nameExp = /^[A-Za-z ‘]+$/;
  const surnameExp = /^[A-Za-z ‘]+$/;
  const roleExp = /Student|Teaching Office|Professor|DDI/;

  if (filter.email != null && !this.checkEmail(filter.email)) {
    return false;
  }
  if (filter.name != null && (!nameExp.test(filter.name) || filter.name.length > 20)) {
    return false;
  }
  if (filter.surname != null && (!surnameExp.test(filter.surname) || filter.surname.length > 20)) {
    return false;
  }
  if (filter.role != null && !roleExp.test(filter.role)) {
    return false;
  }
  if (filter.verified != null && (filter.verified == 0 || filter.verified == 1)) {
    return false;
  }

  return true;
};
