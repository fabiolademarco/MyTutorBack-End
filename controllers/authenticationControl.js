/**
 * AuthenticationControl
 *
 * This class represents the Authentication Controller
 *
 * @author Roberto Bruno
 * @version
 * @since
 *
 * @todo Controllare i formati di email e password
 * 2019 - Copyright by Gang Of Four Eyes
 */
const User = require('../models/user');
const Student = require('../models/student');
const jwt = require('jsonwebtoken');

const OK_STATUS = 200;
const ERR_CLIENT_STATUS = 412;
const ERR_SERVER_STATUS = 500;
const ERR_NOT_AUTHORIZED = 401;

/**
 * Allows to login
 * @param {Request} req
 * @param {Response} res
 */
exports.login = (req, res) => {
  res.set('Content-Type', 'application/json');
  user = new User(req.body);
  if (user === null || user === undefined || !checkEmail(user.email) || !checkPassword(user.password)) {
    res.status(ERR_CLIENT_STATUS);
    res.send({
      status: false,
      error: 'Non è stato specificato correttamente l\'User',
    });
    return;
  }

  User.matchUser(user.email, user.password)
      .then((user) => {
        if (user === null) {
          res.status(ERR_NOT_AUTHORIZED);
          res.send({
            status: false,
            error: 'Le credenziali di accesso risultano errate',
          });
        } else {
          payload = {
            id: user.email,
            role: user.role,
          };
          token = createToken(payload);
          res.set('Authorization', token);
          res.status(OK_STATUS);
          res.send({
            status: true,
            token: token,
          });
        }
      });
};

/**
 * Allows to logout
 * @param {Request} req
 * @param {Response} res
 */
exports.logout = (req, res) => {
  res.set('Content-Type', 'application/json');
  res.set('Authorization', '');
  res.status(OK_STATUS);
  res.send({
    status: true,
    message: 'Logged out',
  });
};

/**
 * Allows to register a new Student
 * @param {Request} req
 * @param {Response} res
 * @todo Controlliamo anche che non esista ?
 */
exports.registerStudent = (req, res) => {
  res.set('Content-Type', 'application/json');
  student = new Student(req.body);
  if (student === null || student === undefined || !checkStudent(student)) {
    res.status(ERR_CLIENT_STATUS);
    res.send({
      status: false,
      error: 'Non è stato specificato correttamente lo Studente',
    });
    return;
  }
  student.role = Student.Role.STUDENT;
  student.verified = 1;
  Student.create(student)
      .then((student) => {
        const payload = {
          id: student.email,
          role: student.role,
        };
        token = createToken(payload);
        res.set('Authorization', token);
        res.status(OK_STATUS);
        res.send({
          token: token,
          student: student,
        });
      })
      .catch((err) => {
        res.status(ERR_SERVER_STATUS);
        res.send({
          error: err.message,
        });
      });
};

/**
 * Allows to register a new Professor.
 * @param {Request} req
 * @param {Response} res
 * @todo Implementare il meccanismo di iscrizione
 */
exports.registerProfessor = (req, res) => {
  res.set('Content-Type', 'application/json');
  professor = new User(req.body);
  // Bisogna controllare che la sua email sia verificata
  if (professor === null || professor === undefined || !checkProfessor(professor)) {
    res.status(ERR_CLIENT_STATUS);
    res.send({
      status: false,
      error: 'Non è stato specificato correttamente il Professore',
    });
    return;
  }
  professor.role = User.Role.PROFESSOR;
  professor.verified = 0;
  User.create(professor)
      .then((professor) => {
        // Bisogna inviare la mail per effettuare il controllo del professore
        // Cosa facciamo se non viene più convalidato ?
        // Permettiamo un operazione per cancellare tutti i non verificati, una sorta di batch ?
      })
      .catch((err) => {
        res.status(ERR_SERVER_STATUS);
        res.send({
          status: false,
          error: err.message,
        });
      });
};
/**
 * Allows the recovery of the password.
 * @param {Request} req
 * @param {Response} res
 * @todo Implementare il meccanismo di recovery della password
 */
exports.passwordRecovery = (req, res) => {

};

/**
 * Allows to insert a new VerifiedEmail
 * @param {Request} req
 * @param {Response} res
 * @todo Completare con l'aggiunta del model VerifiedEmail e controllare che l'email non esista già
 */
exports.insertVerifiedEmail = (req, res) => {
  res.set('Content-Type', 'application/json');
  email = req.params.email;
  if (email === undefined || email === null || !checkVerifiedEmail(email)) {
    res.status(ERR_CLIENT_STATUS);
    res.send({
      status: false,
      error: 'Non è stata specificata l\'email oppure non rispetta il formato corretto.',
    });
    return;
  }
  // TODO
};

/**
 * Creates a new jwt token
 * @param {Object} payload The payload of the token
 * @return {String} The encrypted token
 */
createToken = (payload) => {
  token = jwt.sign(payload, process.env.PRIVATE_KEY);
  return 'JWT ' + token;
};

/**
 * Check the student params.
 * @param {Student} student The student to check.
 * @return {boolean} True if the student attributes respect the format, or else it's false.
 * @todo Implementare la regex per la data di nascita
 */
checkStudent = (student) => {
  const nameExp = /^[A-Za-z ‘]+$/;
  const surnameExp = /^[A-Za-z ‘]+$/;
  const emailExp = /^[a-z]\.[a-z]+[1-9]*\@studenti\.unisa\.it$/;
  const registrationNumberExp = /^[0-9A-Za-z ‘]*$/;
  const passwordExp = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])[A-Za-z0-9!@#$%]{8,20}$/;
  const birthDateExp = '';
  if (!emailExp.test(student.email)) {
    return false;
  }
  if (!nameExp.test(student.name)) {
    return false;
  }
  if (!surnameExp.test(student.surname)) {
    return false;
  }
  if (!registrationNumberExp.test(student.registration_number)) {
    return false;
  }
  if (!passwordExp.test(student.password)) {
    return false;
  }
  return true;
};

/**
 * Check the User params.
 * @param {User} professor The User to check.
 * @return {boolean} True if the user attributes respect the format, or else it's false.
 */
checkProfessor = (professor) => {
  const nameExp = /^[A-Za-z ‘]+$/;
  const surnameExp = /^[A-Za-z ‘]+$/;
  const emailExp = /^[a-z]\.[a-z]*\@unisa\.it$/;
  const passwordExp = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])[A-Za-z0-9!@#$%]{8,20}$/;

  if (!emailExp.test(professor.email)) {
    return false;
  }
  if (!nameExp.test(professor.name)) {
    return false;
  }
  if (!surnameExp.test(professor.surname)) {
    return false;
  }
  if (!passwordExp.test(professor.password)) {
    return false;
  }
  return true;
};

/**
 * Check if the email respect the standard of ProfessorEmail
 * @param {string} email The email to check
 * @return {boolean} True if the email respects the format, else it's false.
 */
checkVerifiedEmail = (email) => {
  const emailExp = /^[a-z]\.[a-z]*\@unisa\.it$/;
  return emailExp.test(email);
};

/**
 * Check if the email respect the standards.
 * @param {string} email The email to check.
 * @return {boolean} True if the email respects the format, else it's false.
 */
checkEmail = (email) => {
  const emailExpStudent = /^[a-z]\.[a-z]+[1-9]*\@studenti\.unisa\.it$/;
  const emailExpProfessor = /^[a-z]\.[a-z]*\@unisa\.it$/;
  return emailExpProfessor.test(email) || emailExpStudent.test(email);
};

/**
 * Check if the password respect the format.
 * @param {string} password The password to check.
 * @return {boolean} True if the password respects the format, else it's false.
 */
checkPassword = (password) => {
  const passwordExp = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])[A-Za-z0-9!@#$%]{8,20}$/;
  return passwordExp.test(password);
};
