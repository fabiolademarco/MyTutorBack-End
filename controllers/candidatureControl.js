const Candidature = require('../models/candidature');
const User = require('../models/user');
const Check = require('../utils/check');
const Document = require('../models/document');
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
  user = req.user;
  candidature = (req.body.candidature != null) ? new Candidature(req.body.candidature) : null;
  if (candidature == null || user == null || !Check.checkNoticeProtocol(candidature.notice_protocol)) {
    res.status(ERR_CLIENT_STATUS);
    res.send({
      status: false,
      error: 'Non è stato specificata correttamente la candidatura',
    });
    return;
  }
  candidature.student = user.id;
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
  user = req.user;
  candidature = (req.body.candidature != null) ? new Candidature(req.body.candidature) : null;
  if (candidature == null || !Check.checkNoticeProtocol(candidature.notice_protocol) || candidature.student !== user.id) {
    res.status(ERR_CLIENT_STATUS);
    res.send({
      status: false,
      error: 'Non è stato specificata correttamente la candidatura',
    });
    return;
  }
  candidature.student = user.id;
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
  const notice = req.params.notice;
  if (notice == null || user == null || !Check.checkNoticeProtocol(notice)) {
    res.status(ERR_CLIENT_STATUS);
    res.send({
      status: false,
      error: 'Non è stato specificata correttamente la candidatura',
    });
    return;
  }
  const candidature = new Candidature({student: user.id, notice_protocol: notice});
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
  user = req.user;
  let promise;
  if (user.role === User.Role.TEACHING_OFFICE) {
    const student = req.query.student;
    const noticeProtocol = req.query.protocol;
    if (student && noticeProtocol) {
      promise = Candidature.findById(student, noticeProtocol);
    } else if (student) {
      promise = Candidature.findByStudent(student);
    } else if (noticeProtocol) {
      promise = Candidature.findByNotice(noticeProtocol);
    } else {
      promise = Candidature.findAll();
    }
  } else if (user.role === User.Role.STUDENT) {
    promise = Candidature.findByStudent(user.id);
  } else {
    // Vedere cosa fare...
    res.status(401);
    res.send({
      error: 'Non autorizzato',
    });
    return;
  }
  promise
      .then((candidatures) => {
        if (!Array.isArray(candidatures)) {
          candidatures = [candidatures];
        }
        res.status(OK_STATUS).send({
          candidatures: candidatures,
        });
      })
      .catch((err) => {
        res.status(ERR_SERVER_STATUS);
        res.send({
          error: err,
          candidatures: [],
        });
      });
};

exports.dowloadDocumentFile = (req, res) => {
  const candidature = req.body.candidature;
  const fileName = req.body.fileName;
  if (!Check.checkNoticeProtocol(candidature.notice_protocol) || !Check.checkEmail(candidature.student)) {
    res.status(ERR_CLIENT_STATUS);
    res.send({
      error: 'I parametri non rispettano il formato',
    });
    return;
  }
  Document.findById(fileName, candidature.student, candidature.notice_protocol)
      .then((doc) => {
        res.send(doc.file);
      })
      .catch((err) => {
        res.status(ERR_SERVER_STATUS);
        res.send({
          error: err,
        });
      });
};

// Forse sarebbe utile un metodo per tornare tutti i pdf di una candidatura
