/**
 * AuthenticationControl
 *
 * This class represents the Authentication Controller
 *
 * @author Roberto Bruno
 *
 * @todo Finire password recovery e registrazione del professore
 * @copyright 2019 - Copyright by Gang Of Four Eyes
 */
const User = require('../models/user');
const Student = require('../models/student');
const VerifiedEmail = require('../models/verifiedEmail');
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
  user = new User(req.body.user);
  if (user == null || !checkEmail(user.email) || !checkPassword(user.password)) {
    res.status(ERR_CLIENT_STATUS);
    res.send({
      status: false,
      error: 'Non è stato specificato correttamente l\'User',
    });
    return;
  }

  User.matchUser(user.email, user.password)
      .then((user) => {
        if (user == null) {
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
  student = new Student(req.body.student);
  if (student == null || !checkStudent(student)) {
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
  professor = new User(req.body.professor);
  // Bisogna controllare che la sua email sia verificata
  if (professor == null || !checkProfessor(professor)) {
    res.status(ERR_CLIENT_STATUS);
    res.send({
      status: false,
      error: 'Non è stato specificato correttamente il Professore',
    });
    return;
  }
  professor.role = User.Role.PROFESSOR;
  professor.verified = 0;
  VerifiedEmail.isVerified(professor.email)
      .then((exists) => {
        if (exists) {
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
        } else {
          res.send({
            status: false,
            error: 'Email non autorizzata',
          });
        }
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
  email = req.body.email;
  if (email == null || !checkVerifiedEmail(email)) {
    res.status(ERR_CLIENT_STATUS);
    res.send({
      status: false,
      error: 'Non è stata specificata l\'email oppure non rispetta il formato corretto.',
    });
    return;
  }
  const verifiedEmail = new VerifiedEmail({email: email, signed_up: 0});
  VerifiedEmail.create(verifiedEmail)
      .then((result) => {
        res.status(OK_STATUS).send({
          status: true,
          message: 'Email inserita correttamente',
        });
      })
      .catch((err) => {
        res.status(ERR_SERVER_STATUS);
        res.send({
          status: false,
          error: 'Email non inserita',
        });
      });
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
  const emailExp = /^[a-z]\.[a-z]+[1-9]*[\@studenti]?\.unisa\.it$/;
  const registrationNumberExp = /^[0-9A-Za-z ‘]*$/;
  const passwordExp = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])[A-Za-z0-9!@#$%]{8,20}$/;
  const birthDateExp = /[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])( (2[0-3]|[01][0-9]):[0-5][0-9])?/; // Non so se deve essere cosi
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
  if (!birthDateExp.test(student.birth_date)) {
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
