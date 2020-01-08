/**
 * Checks if a name respects the format.
 * @param {string} name The name to check.
 * @return {boolean} True if the name respects the format.
 */
function checkName(name) {
  const nameExp = /^[A-Za-z ‘]+$/;

  if (name.length < 1 || name.length > 20) {
    throw new Error('Il nome ha meno di 1 carattere di lunghezza oppure supera i 20 caratteri di lunghezza.');
  }

  if (!nameExp.test(name)) {
    throw new Error('Il nome non rispetta il formato.');
  }

  return true;
}

/**
 * Checks if a surname respects the format.
 * @param {string} surname The surname to check.
 * @return {boolean} True if the surname respects the format.
 */
function checkSurname(surname) {
  const surnameExp = /^[A-Za-z ‘]+$/;

  if (surname.length < 1 || surname.length > 20) {
    throw new Error('Il cognome ha meno di 1 carattere di lunghezza oppure supera i 20 caratteri di lunghezza.');
  }

  if (!surnameExp.test(surname)) {
    throw new Error('Il cognome non rispetta il formato.');
  }

  return true;
}

/**
 * Checks if an email has the right length.
 * @param {string} email The email to check.
 * @return {boolean} True if the email has the right length.
 */
function checkEmailLength(email) {
  if (email.length < 1 || email.length > 50) {
    throw new Error('L\'email ha meno di 1 carattere di lunghezza oppure supera i 50 caratteri di lunghezza.');
  }

  return true;
}

/**
 * Checks the student params.
 * @param {Student} student The student to check.
 * @return {boolean} True if the student attributes respect the format.
 */
exports.checkStudent = (student) => {
  const registrationNumberExp = /^[0-9A-Za-z ‘]*$/;
  const birthDateExp = /[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])/;

  checkName(student.name);

  checkSurname(student.surname);

  if (!birthDateExp.test(student.birth_date)) {
    throw new Error('La data non rispetta il formato.');
  }

  if (student.registration_number.length < 1 || student.registration_number.length > 20) {
    throw new Error('La matricola ha meno di 1 carattere di lunghezza oppure supera i 20 caratteri di lunghezza.');
  }

  if (!registrationNumberExp.test(student.registration_number)) {
    throw new Error('La matricola non rispetta il formato.');
  }

  this.checkStudentEmail(student.email);

  this.checkPassword(student.password);

  return true;
};

/**
 * Checks the User params.
 * @param {User} professor The User to check.
 * @return {boolean} True if the user attributes respect the format.
 */
exports.checkProfessor = (professor) => {
  this.checkProfessorEmail(professor.email);

  checkName(professor.name);

  checkSurname(professor.surname);

  this.checkPassword(professor.password);

  return true;
};

/**
 * Checks if the email respects the standard of ProfessorEmail.
 * @param {string} email The email to check.
 * @return {boolean} True if the email respects the format.
 */
exports.checkVerifiedEmail = (email) => {
  const emailProfessorExp = /^[a-z]*(\.[a-z]*)?\@unisa\.it$/;

  checkEmailLength(email);

  if (!emailProfessorExp.test(email)) {
    throw new Error('L\'email non rispetta il formato.');
  }

  return true;
};

/**
 * Checks if the email respects the standards for the students' email.
 * @param {string} email The email to check.
 * @return {boolean} True if the email respects the format.
 */
exports.checkStudentEmail = (email) => {
  const emailStudentExp = /^[a-z]\.[a-z]+[0-9]*\@(studenti\.)?unisa\.it$/;

  checkEmailLength(email);

  if (!emailStudentExp.test(email)) {
    throw new Error('L\'email non rispetta il formato.');
  }

  return true;
};

/**
 * Checks if the email respects the standards for the professors' email.
 * @param {string} email The email to check.
 * @return {boolean} True if the email respects the format.
 */
exports.checkProfessorEmail = (email) => {
  return this.checkVerifiedEmail(email);
};

/**
 * Checks if the email respects the standards.
 * @param {string} email The email to check.
 * @return {boolean} True if the email respects the format.
 */
exports.checkEmail = (email) => {
  let error;

  try {
    this.checkProfessorEmail(email);

    return true;
  } catch (err) {
    error = err;
  }

  try {
    this.checkStudentEmail(email);

    return true;
  } catch (err) {
    error = err;
  }

  throw error;
};

/**
 * Checks if the password respects the format.
 * @param {string} password The password to check.
 * @return {boolean} True if the password respects the format.
 */
exports.checkPassword = (password) => {
  const passwordExp = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])[A-Za-z0-9!@#$%]{8,20}$/;

  if (password.length < 8 || password.length > 20) {
    throw new Error('La password ha meno di 8 caratteri di lunghezza oppure supera i 20 caratteri di lunghezza.');
  }

  if (!passwordExp.test(password)) {
    throw new Error('La password non rispetta il formato.');
  }

  return true;
};

/**
 * Checks if the assignment respects the format.
 * @param {Assignment} assignment Assignment to check.
 * @return {boolean} True if the assignment respects the format.
 */
exports.checkAssignment = (assignment) => {
  const codeExp = /[A-Z]+\/[0-9]+/;
  const idExp = /[1-9]+/;
  const totalNumberHoursExp = /[0-9]+/;
  const title = /PhD|Master/;
  const hourlyCostExp = /[0-9]+(.[0-9]{2})?/;
  const stateExp = /Unassigned|Waiting|Booked|Assigned|Over/;

  this.checkNoticeProtocol(assignment.notice_protocol);

  if (assignment.student) {
    this.checkStudentEmail(assignment.student);
  }

  if (assignment.code.length < 1 || assignment.code.length > 30) {
    throw new Error('Il codice dell\'assegno ha meno di 1 carattere di lunghezza oppure supera i 30 caratteri di lunghezza.');
  }

  if (!codeExp.test(assignment.code)) {
    throw new Error('Il codice dell\'assegno non rispetta il formato.');
  }

  if (!assignment.id) {
    throw new Error('Il campo id è nullo.');
  }

  if (!idExp.test(assignment.id)) {
    throw new Error('L\'id non rispetta il formato.');
  }

  if (assignment.total_number_hours < 1 || assignment.total_number_hours > 50) {
    throw new Error('Le ore totali sono meno di 1 o maggiori di 50');
  }

  if (!totalNumberHoursExp.test(assignment.total_number_hours)) {
    throw new Error('Il campo total_number_hours non rispetta il formato');
  }

  if (!title.test(assignment.title)) {
    throw new Error('Il campo title non rispetta il formato.');
  }

  if (assignment.hourly_cost < 1 || assignment.hourly_cost > 150) {
    throw new Error('Il costo orario è minore di 1 o maggiore di 150');
  }

  if (!hourlyCostExp.test(assignment.hourly_cost)) {
    throw new Error('Il costo orario non rispetta il formato.');
  }

  if (!stateExp.test(assignment.state)) {
    throw new Error('Lo stato non rispetta il formato.');
  }

  if (assignment.ht_fund && assignment.ht_fund.length > 50) {
    throw new Error('Il campo ht_fund supera i 50 caratteri di lunghezza.');
  }

  if (assignment.activity_description == null) {
    throw new Error('Il campo activity_description è nullo.');
  }

  if (assignment.activity_description.length < 1 || assignment.activity_description.length > 200) {
    throw new Error('Il campo activity_description ha meno di 1 carattere di lunghezza ooppure supera i 50 caratteri di lunghezza.');
  }

  if (assignment.note != null && (assignment.note.length < 1 || assignment.note.length > 500)) {
    throw new Error('Il campo note ha meno di 1 carattere di lunghezza ooppure supera i 50 caratteri di lunghezza.');
  }

  return true;
};

/**
 * Checks if a notice protocol respects the format.
 * @param {string} noticeProtocol Protocol to check.
 * @return {boolean} True if it respects the format.
 */
exports.checkNoticeProtocol = (noticeProtocol) => {
  const noticeProtocolExp = /Prot. n. [0-9]+/;

  if (noticeProtocol.length > 125) {
    throw new Error('La lunghezza del protocollo supera i 125 caratteri.');
  }

  if (!noticeProtocolExp.test(noticeProtocol)) {
    throw new Error('Il protocollo non rispetta il formato.');
  }

  return true;
};

/**
 * Checks if a comment respects the format.
 * @param {Comment} comment Comment to check.
 * @return {boolean} True if it respects the format.
 */
exports.checkComment = (comment) => {
  if (comment.text.length < 1 || comment.text.length > 500) {
    throw new Error('Il testo ha meno di 1 carattere di lunghezza oppure supera i 500 caratteri di lunghezza.');
  }

  return true;
};

/**
 * Checks if an application sheet respects the format.
 * @param {ApplicationSheet} applicationSheet Application sheet to check.
 * @return {boolean} True if it resepcts the format.
 */
exports.checkApplicationSheet = (applicationSheet) => {
  if (applicationSheet.documents_to_attach.length < 1 || applicationSheet.documents_to_attach.length > 5000) {
    throw new Error('Il testo del campo documents_to_attach ha meno di 1 carattere di lunghezza oppure supera i 5000 caratteri di lunghezza.');
  }

  return true;
};

/**
 * Checks if a comment respect the format.
 * @param {Rating} rating Comment to check.
 * @return {boolean} True if it respects the format.
 */
exports.checkRating = (rating) => {
  const assignmentIdExp = /[1-9]+/;
  const titleScoreExp = /^[0-9]+$/;
  const interviewScoreExp = /^[0-9]+$/;

  if (ratingList.length == 0) {
    throw new Error('La lista è vuota');
  }

  if (!assignmentIdExp.test(rating.assignment_id)) {
    throw new Error('L\'id non rispetta il formato');
  }

  this.checkStudentWithoutPassword(rating.student);

  if (!titleScoreExp.test(rating.titles_score)) {
    throw new Error('Il campo titles_score non rispetta il formato.');
  }

  if (!interviewScoreExp.test(rating.interview_score)) {
    throw new Error('Il campo interview_score non rispetta il formato.');
  }

  return true;
};

/**
 * Checks if a comment respect the format.
 * @param {Rating[]} ratingList Comment to check.
 * @return {boolean} True if it respects the format.
 */
exports.checkRatingList = (ratingList) => {
  return ratingList.every(this.checkRating);
};

/**
 * Checks if an evaluation criterion respects the format.
 * @param {EvaluationCriterion} evaluationCriterion Evaluation criterion to check.
 * @return {boolean} True if it respects the format.
 */
exports.checkEvaluationCriterion = (evaluationCriterion) => {
  const maxScoreExp = /^[0-9]+$/;

  if (evaluationCriterion.name.length < 1 || evaluationCriterion.name.length > 125) {
    throw new Error('Il nome ha meno di 1 carattere di lunghezza oppure supera i 20 caratteri di lunghezza.');
  }

  // TODO controllare se c'è già nel bando

  if (evaluationCriterion.max_score < 1 || evaluationCriterion.max_score > 27) {
    throw new Error('Il max_score non è compreso tra 1 e 27.');
  }


  if (!maxScoreExp.test(evaluationCriterion.max_score)) {
    throw new Error('Il max score non rispetta il formato.');
  }

  return true;
};

/**
 * Checks if an article respects the format.
 * @param {Article} article Article to check.
 * @return {boolean} True if it respects the format.
 */
exports.checkArticle = (article) => {
  const articleInitialExp = /^[A-Z a-z]+$/;

  if (article.initial.length < 1 || article.initial.length > 20) {
    throw new Error('Il campo initial ha meno di 1 carattere di lunghezza oppure supera i 20 caratteri di lunghezza.');
  }

  if (!articleInitialExp.test(article.initial)) {
    throw new Error('Il campo initial non rispetta il formato.');
  }

  if (article.text.length < 1 || article.text.length > 5000) {
    throw new Error('Il testo ha meno di 1 carattere di lunghezza oppure supera i 20 caratteri di lunghezza.');
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

  this.checkNoticeProtocol(notice.protocol);

  if (notice.description.length < 1 || notice.description.length > 300) {
    throw new Error('La descrizione ha meno di 1 carattere di lunghezza oppure supera i 300 caratteri di lunghezza.');
  }

  if (notice.notice_subject.length < 1 || notice.notice_subject.length > 2000) {
    throw new Error('Il campo notice_subject ha meno di 1 carattere di lunghezza oppure supera i 2000 caratteri di lunghezza.');
  }

  if (notice.assignments.length < 1 || notice.assignments.length > 15) {
    throw new Error('Il campo assignments ha lunghezza minore di 1 oppure supera 15.');
  }

  notice.assignments.every(this.checkAssignment);

  if (notice.admission_requirements.length < 1 || notice.admission_requirements.length > 5000) {
    throw new Error('Il campo admission_requirements ha meno di 1 carattere di lunghezza oppure supera i 5000 caratteri di lunghezza.');
  }

  if (notice.evaluation_criteria.length < 1 || notice.evaluation_criteria.length > 6) {
    throw new Error('Il campo evaluation_criteria ha lunghezza minore di 1 oppure supera 15.');
  }

  notice.evaluation_criteria.every(this.checkEvaluationCriterion);

  if (notice.assessable_titles && (notice.assessable_titles.length < 1 || notice.assessable_titles.length > 5000)) {
    throw new Error('Il campo assessable_titles ha meno di 1 carattere di lunghezza oppure supera i 5000 caratteri di lunghezza.');
  }

  if (notice.how_to_submit_applications.length < 1 || notice.how_to_submit_applications.length > 5000) {
    throw new Error('Il campo how_to_submit_applications ha meno di 1 carattere di lunghezza oppure supera i 5000 caratteri di lunghezza.');
  }

  if (notice.selection_board.length < 1 || notice.selection_board.length > 5000) {
    throw new Error('Il campo selection_board ha meno di 1 carattere di lunghezza oppure supera i 5000 caratteri di lunghezza.');
  }

  if (notice.acceptance.length < 1 || notice.acceptance.length > 5000) {
    throw new Error('Il campo acceptance ha meno di 1 carattere di lunghezza oppure supera i 5000 caratteri di lunghezza.');
  }

  if (notice.incompatibility.length < 1 || notice.incompatibility.length > 5000) {
    throw new Error('Il campo incompatibility ha meno di 1 carattere di lunghezza oppure supera i 5000 caratteri di lunghezza.');
  }

  if (notice.termination_of_the_assignment.length < 1 || notice.termination_of_the_assignment.length > 5000) {
    throw new Error('Il campo termination_of_the_assignment ha meno di 1 carattere di lunghezza oppure supera i 5000 caratteri di lunghezza.');
  }

  if (notice.nature_of_the_assignment.length < 1 || notice.nature_of_the_assignment.length > 5000) {
    throw new Error('Il campo nature_of_the_assignment ha meno di 1 carattere di lunghezza oppure supera i 5000 caratteri di lunghezza.');
  }

  if (notice.unused_funds.length < 1 || notice.unused_funds.length > 5000) {
    throw new Error('Il campo unused_funds ha meno di 1 carattere di lunghezza oppure supera i 5000 caratteri di lunghezza.');
  }

  if (notice.responsible_for_the_procedure.length < 1 || notice.responsible_for_the_procedure.length > 5000) {
    throw new Error('Il campo responsible_for_the_procedure ha meno di 1 carattere di lunghezza oppure supera i 5000 caratteri di lunghezza.');
  }

  if (notice.notice_funds < 1) {
    throw new Error('Il campo admission_requirements ha valore minore di 1.');
  }

  if (!noticeFundsExp.test(notice.notice_funds)) {
    throw new Error('Il fondo del bando non rispetta il formato.');
  }

  if (notice.type.length < 1 || notice.type.length > 50) {
    throw new Error('Il campo type ha meno di 1 carattere di lunghezza oppure supera i 50 caratteri di lunghezza.');
  }

  if (!noticeDeadlineExp.test(notice.deadline)) {
    throw new Error('Il campo deadline non rispetta il formato.');
  }

  if (notice.articles.length < 1 || notice.articles.length > 20) {
    throw new Error('Il campo articles ha lunghezza minore di 1 oppure maggiore di 20.');
  }

  notice.articles.every(this.checkArticle);

  return true;
};

/**
 * Checks the student params.
 * @param {Student} student The student to check.
 * @return {boolean} True if the student attributes respect the format.
 */
exports.checkStudentWithoutPassword = (student) => {
  const registrationNumberExp = /^[0-9A-Za-z ‘]*$/;
  const birthDateExp = /[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])/;

  checkName(student.name);

  checkSurname(student.surname);

  if (!birthDateExp.test(student.birth_date)) {
    throw new Error('La data non rispetta il formato.');
  }

  if (student.registration_number.length < 1 || student.registration_number.length > 20) {
    throw new Error('La matricola ha meno di 1 carattere di lunghezza oppure supera i 20 caratteri di lunghezza.');
  }

  if (!registrationNumberExp.test(student.registration_number)) {
    throw new Error('La matricola non rispetta il formato.');
  }

  this.checkStudentEmail(student.email);

  return true;
};

/**
 * Check if user filter respects the format
 * @param {Object} filter Filter to check.
 * @return {boolean} True if it respects the format, false otherwise.
 */
exports.checkUserFilter = (filter) => {
  const roleExp = /Student|Teaching Office|Professor|DDI/;

  if (filter.email != null) {
    this.checkEmail(filter.email);
  }

  if (filter.name != null) {
    checkName(filter.name);
  }

  if (filter.surname != null) {
    checkSurname(filter.surname);
  }

  if (filter.role != null && !roleExp.test(filter.role)) {
    throw new Error('Il ruolo non rispetta il formato.');
  }

  if (filter.verified != null && (filter.verified != 0 || filter.verified != 1)) {
    throw new Error('Il campo verified non è nè 0 nè 1.');
  }

  return true;
};
