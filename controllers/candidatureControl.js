const Candidature = require('../models/candidature');
const OK_STATUS = 200;
const ERR_CLIENT_STATUS = 412;
const ERR_SERVER_STATUS = 500;

/**
 * CandidatureControl
 *
 * This class represents the Candidature Controller
 *
 * @module
 * @author Roberto Bruno
 *
 * @copyright 2019 - Copyright by Gang Of Four Eyes
 */

/**
 * Allows to create a new Candidature
 * @param {Request} req
 * @param {Response} res
 */
exports.create = (req, res) => {
  // Devo settare io lo studente o lo fa il front ?
  candidature = (req.body.candidature != null) ? new Candidature(req.body.candidature) : null;
  if (candidature == null) {
    res.status(ERR_CLIENT_STATUS);
    res.send({
      status: false,
      error: 'Non è stato specificata correttamente la candidatura',
    });
    return;
  }
  Candidature.create(candidature)
      .then((candidature) => {
        if (candidature == null) {
          res.status(ERR_SERVER_STATUS);
          return res.send({
            status: false,
            error: 'La transazione non è andata a buon fine.',
          });
        }
        res.status(OK_STATUS);
        res.send({
          status: true,
        });
      })
      .catch((err) => {
        res.status(ERR_SERVER_STATUS);
        res.send({
          status: false,
          error: err,
        });
      });
};

/**
 * Allows to update a Candidature
 * @param {Request} req
 * @param {Response} res
 */
exports.update = (req, res) => {
  candidature = (req.body.candidature != null) ? new Candidature(req.body.candidature) : null;
  if (candidature == null) {
    res.status(ERR_CLIENT_STATUS);
    res.send({
      status: false,
      error: 'Non è stato specificata correttamente la candidatura',
    });
    return;
  }
  Candidature.update(candidature)
      .then((data) => {
        if (data == null) {
          res.status(ERR_SERVER_STATUS);
          return res.send({
            status: false,
            error: 'La transazione non è andata a buon fine.',
          });
        }
        res.status(OK_STATUS).send({
          candidature: data,
          status: true,
        });
      })
      .catch((err) => {
        res.status(ERR_SERVER_STATUS);
        return res.send({
          status: false,
          error: err,
        });
      });
};

/**
 * Allows to delete a Candidature
 * @param {Request} req
 * @param {Response} res
 */
exports.delete = (req, res) => {
  user = req.user;
  candidature = (req.body.candidature != null) ? new Candidature(req.body.candidature) : null;
  if (candidature == null || user == null || user.id !== candidature.student) {
    res.status(ERR_CLIENT_STATUS);
    res.send({
      status: false,
      error: 'Non è stato specificata correttamente la candidatura',
    });
    return;
  }
  Candidature.remove(candidature)
      .then((result) => {
        res.status(OK_STATUS);
        res.send({
          status: result,
        });
      })
      .catch((err) => {
        res.status(ERR_SERVER_STATUS);
        res.send({
          status: false,
          error: err,
        });
      });
};

exports.search = (req, res) => {

};

exports.dowloadDocumentFile = (req, res) => {

};
