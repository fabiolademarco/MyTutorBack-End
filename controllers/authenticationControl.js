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
const Check = require('../utils/check');
const jwt = require('jsonwebtoken');
const Mail = require('../utils/mail');

const OK_STATUS = 200;
const ERR_CLIENT_STATUS = 412;
const ERR_SERVER_STATUS = 500;
const ERR_NOT_AUTHORIZED = 401;

/**
 * Allows to login
 * @param {Request} req
 * @param {Response} res
 * @return {Promise}
 */
exports.login = (req, res) => {
  user = (req.body.user != null) ? new User(req.body.user) : null;
  if (user == null || !Check.checkEmail(user.email) || !Check.checkPassword(user.password)) {
    res.status(ERR_CLIENT_STATUS);
    res.send({
      status: false,
      error: 'Non è stato specificato correttamente l\'User',
    });

    return;
  }

  return User.matchUser(user.email, user.password)
      .then(async (user) => {
        if (user == null) {
          res.status(ERR_NOT_AUTHORIZED);
          res.send({
            status: false,
            error: 'Le credenziali di accesso risultano errate',
          });
        } else {
          if (user.role === User.Role.STUDENT) {
            user = await Student.findByEmail(user.email);
          }
          payload = {
            id: user.email,
            role: user.role,
          };
          token = createToken(payload);
          res.set('Authorization', token);
          delete user.password;
          res.status(OK_STATUS);
          res.send({
            status: true,
            token: token,
            user: user,
          });
        }
      })
      .catch((err) => {
        res.status(ERR_SERVER_STATUS);
        res.send({
          status: false,
          error: 'Login fallito',
          exception: err.message,
        });
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
exports.registerStudent = async (req, res) => {
  student = (req.body.student != null) ? new Student(req.body.student) : null;
  if (student == null || !Check.checkStudent(student)) {
    res.status(ERR_CLIENT_STATUS);
    res.send({
      status: false,
      error: 'Non è stato specificato correttamente lo Studente',
    });

    return;
  }
  if (await Student.exists(student)) {
    res.status(ERR_CLIENT_STATUS);
    res.send({
      status: false,
      error: 'L\'email è già utilizzata',
    });

    return;
  }

  student.role = Student.Role.STUDENT;
  student.verified = 1;

  return Student.create(student) // Return added for testing
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
          error: 'Creazione dello studente fallita.',
          exception: err.message,
        });
      });
};

/**
 * Allows to register a new Professor.
 * @param {Request} req
 * @param {Response} res
 */
exports.registerProfessor = async (req, res) => {
  const confirmationToken = req.query.token;

  if (confirmationToken) {
    try {
      const payload = jwt.verify(token.substring(4), process.env.PRIVATE_KEY);

      await VerifiedEmail.update({email: payload.id, signed_up: 1});
      const professor = await User.findByEmail(payload.id);

      professor.verified = 1;
      await User.update(professor);
      res.set('Authorization', confirmationToken);
      res.status(200);
      res.send({
        status: true,
        professor: professor,
        token: confirmationToken,
      });
    } catch (err) {
      res.status(401);
      res.send({
        status: false,
        error: 'Creazione del professore fallita.',
        exception: err.message,
      });
    }

    return;
  }
  professor = (req.body.professor != null) ? new User(req.body.professor) : null;
  if (professor == null || !Check.checkProfessor(professor) || !await VerifiedEmail.isVerified(professor.email)) {
    res.status(ERR_CLIENT_STATUS);
    res.send({
      status: false,
      error: 'Non è stato specificato correttamente il Professore',
    });

    return;
  }
  if (await User.exists(professor)) {
    res.status(ERR_CLIENT_STATUS);
    res.send({
      status: false,
      error: 'L\'email risulta già in uso',
    });

    return;
  }
  professor.role = User.Role.PROFESSOR;
  professor.verified = 0;

  return User.create(professor)
      .then(async (professor) => {
        const payload = {
          id: professor.email,
          role: professor.role,
        };
        const token = createToken(payload);

        console.log('token: ' + token);
        await Mail.sendEmailToProfessor(professor.email, token);
        res.status(200);
        res.send({
          status: true,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(ERR_SERVER_STATUS);
        res.send({
          status: false,
          error: 'Creazione del professore fallita.',
          exception: err.message,
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
exports.insertVerifiedEmail = async (req, res) => {
  email = req.body.email;
  if (email == null || !Check.checkVerifiedEmail(email)) {
    res.status(ERR_CLIENT_STATUS);
    res.send({
      status: false,
      error: 'Non è stata specificata l\'email oppure non rispetta il formato corretto.',
    });

    return;
  }
  if (await VerifiedEmail.exists({email: email})) {
    res.status(ERR_CLIENT_STATUS);
    res.send({
      status: false,
      error: 'L\'email già esiste',
    });

    return;
  }

  const verifiedEmail = new VerifiedEmail({email: email, signed_up: 0});

  return VerifiedEmail.create(verifiedEmail)
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
          exception: err.message,
        });
      });
};

/**
 * Allows to check if the user token is still valid
 * @param {Request} req
 * @param {Response} res
 */
exports.checkUserSession = (req, res) => {
  const token = req.get('Authorization');

  if (token == null) {
    res.status(401);
    res.send({
      status: false,
      error: 'Token non valido',
    });

    return;
  }
  try {
    jwt.verify(token.substring(4), process.env.PRIVATE_KEY);
    res.status(OK_STATUS).send({
      status: true,
    });
  } catch (err) {
    res.status(401).send({
      status: false,
      error: 'Token non valido',
      exception: err.message,
    });
  }
};

/**
 * Creates a new jwt token
 * @param {Object} payload The payload of the token
 * @return {String} The encrypted token
 */
createToken = (payload) => {
  token = jwt.sign(payload, process.env.PRIVATE_KEY, {expiresIn: '1h'});

  return 'JWT ' + token;
};
