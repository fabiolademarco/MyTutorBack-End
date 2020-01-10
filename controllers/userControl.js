const User = require('../models/user');
const Student = require('../models/student');
const Check = require('../utils/check');
const OK_STATUS = 200;
const ERR_CLIENT_STATUS = 412;
const ERR_SERVER_STATUS = 500;

/**
 * UserControl
 *
 * This module represents the User Controller
 *
 * @module
 * @author Giannandrea Vicidomini
 *
 * @copyright 2019 - Copyright by Gang Of Four Eyes
*/


/**
 * @param {Request} req
 * @param {Response} res
 */
module.exports.delete = async function(req, res) {
  const email = req.params.id;

  if (email == null) {
    res.status(ERR_CLIENT_STATUS);
    res.send({error: 'L\'utente non puo essere nullo'});

    return;
  }

  try {
    Check.checkEmail(email);
  } catch (error) {
    res.status(ERR_CLIENT_STATUS)
        .send({
          error: error.message,
          exception: error,
        });

    return;
  }

  const user = new User({email: email});

  return User.delete(user)
      .then((data) => {
        res.status(OK_STATUS).send({status: data});
      })
      .catch((err) => {
        res.status(ERR_SERVER_STATUS).send({
          status: false,
          error: 'Cancellazione dell\'utente fallita.',
          exception: err.message,
        });

        return;
      });
};

/**
 * @param {Request} req
 * @param {Response} res
 * @return {Promise}
 */
module.exports.search = function(req, res) {
  const param = req.body.param;

  if (param == null) {
    res.status(ERR_CLIENT_STATUS);
    res.send({error: 'Non sono stati specificati parametri o non risultano validi'});

    return;
  }

  const filter = {
    email: param.email,
    name: param.name,
    surname: param.surname,
    role: param.role,
    verified: param.verified,
  };

  try {
    Check.checkUserFilter(filter);
  } catch (error) {
    res.status(ERR_CLIENT_STATUS)
        .send({
          error: error.message,
          exception: error,
        });

    return;
  }

  let promise;

  if (filter.role != null && filter.role === User.Role.STUDENT) {
    promise = Student.search(filter);
  } else {
    promise = User.search(filter);
  }

  return promise
      .then((users) => {
        res.status(OK_STATUS).send({list: users});
      })
      .catch((err) => {
        res.status(ERR_SERVER_STATUS).send({error: 'Ricerca degli utenti fallita.', exception: err.message});
      });
};

/**
 * @param {Request} req
 * @param {Response} res
 * @return {Promise}
 */
module.exports.update = async function(req, res) {
  const user = req.body.user;
  const loggedUser = req.user;

  if (user == null || user.email !== loggedUser.id) {
    res.status(ERR_CLIENT_STATUS);
    res.send({error: 'L\'utente è nullo o non valido'});

    return;
  }

  try {
    if (user.role === User.Role.STUDENT) {
      Check.checkStudent(user);
    } else {
      Check.checkProfessor(user);
    }
  } catch (error) {
    res.status(ERR_CLIENT_STATUS)
        .send({
          error: error.message,
          exception: error,
        });

    return;
  }

  let promise;

  if (loggedUser.role === User.Role.STUDENT) {
    promise = Student.update(user);
  } else {
    promise = User.update(user);
  }

  return promise
      .then((newUser) => {
        res.status(OK_STATUS).send({user: newUser});
      })
      .catch((err) => {
        res.status(ERR_SERVER_STATUS).send({error: 'Aggiornamento dell\'utente fallito', exception: err.message});
      });
};

/**
 * @param {Request} req
 * @param {Response} res
 */
module.exports.find = async function(req, res) {
  const email = req.params.id;
  const user = req.user;

  if (email == null) {
    res.status(ERR_CLIENT_STATUS);
    res.send({error: 'L\'email non può essere nulla'});

    return;
  }

  try {
    Check.checkEmail(email);
  } catch (error) {
    res.status(ERR_CLIENT_STATUS)
        .send({
          error: error.message,
          exception: error,
        });

    return;
  }

  // TODO: Il professore e il DDI possono farla?
  if (User.Role.STUDENT === user.role && user.id !== email) {
    res.status(403);
    res.send({error: 'Non sei autorizzato'});

    return;
  }

  return User.findByEmail(email)
      .then((user) => {
        res.status(OK_STATUS).send({user: user});
      })
      .catch((err) => {
        res.status(ERR_SERVER_STATUS).send({error: 'Ricerca dell\'utente fallita.', exception: err.message});
      });
};

/**
 * @param {Request} req
 * @param {Response} res
 */
module.exports.findAll = function(req, res) {
  User.findAll()
      .then((userList) => {
        res.status(OK_STATUS).send({list: userList});
      })
      .catch((err) => {
        res.status(ERR_SERVER_STATUS).send({error: 'Recupero degli utenti fallito.', exception: err.message});
      });
};
