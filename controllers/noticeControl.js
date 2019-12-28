const Notice = require('../models/notice');
const Comment = require('../models/comment');
const User = require('../models/user');

const accessList = new Map();
accessList.set(User.Role.STUDENT, [Notice.States.PUBLISHED, Notice.States.EXPIRED, Notice.States.WAITING_FOR_GRADED_LIST, Notice.States.CLOSED]);
accessList.set(User.Role.PROFESSOR, accessList.get(User.Role.STUDENT).concat([Notice.States.IN_ACCEPTANCE, Notice.States.ACCEPTED]));
accessList.set(User.Role.DDI, accessList.get(User.Role.STUDENT).concat([Notice.States.IN_APPROVAL, Notice.States.APPROVED]));
accessList.set(User.Role.TEACHING_OFFICE, Object.values(Notice.States));

/**
 * NoticeControl
 *
 * This module represents the Notice Controller
 *
 * @module
 * @author Marco D'Antonio, Francesco Migliaro
 *
 * @copyright 2019 - Copyright by Gang Of Four Eyes
 */

/**
 *  Handles the request for the creation of a notice
 *
 * @param {Request} req
 * @param {Response} res
 */
exports.create = (req, res) => {
  const notice = req.body.notice;

  if (notice == null) {
    res.status(412).send({error: 'Request body must be defined'});
    return;
  }

  Notice.create(notice)
      .then((notice) => {
        res.send({notice: notice});
      })
      .catch((err) => {
        res.status(500).send({error: err});
      });
};


exports.update = (req, res) => {
  const notice = req.body.notice;

  if (notice == null) {
    res.status(412).send({error: 'Request body must be defined'});
    return;
  }

  Notice.update(notice)
      .then((notice) => {
        res.send({notice: notice});
      })
      .catch((err) => {
        res.status(500).send({error: err});
      });
};

exports.setStatus = (req, res) => {
  const notice = req.body.notice;
  notice = new Notice();

  switch (notice.status) {
    case Notice.States.DRAFT: // solo professore o ddi (quando rifiutano o disapprovano il bando)
      Comment.create(notice.comment);
      Notice.update(notice);
      break;

    case Notice.States.IN_ACCEPTANCE: // solo ufficio didattica (quando inoltra il bando al professore referente)
      Notice.update(notice);
      break;

    case Notice.States.ACCEPTED: // solo professore (quando accetta il bando)
      Notice.update(notice);
      break;

    case Notice.States.IN_APPROVAL: // solo ufficio didattica (quando inoltra il bando al ddi)
      break;

    case Notice.States.APPROVED: // solo ddi (quando approva il bando)
      break;

    case Notice.States.PUBLISHED: // solo ufficio didattica (quando pubblica il bando)
      break;

    case Notice.States.EXPIRED: // trigger nel db? (quando scade il termine)
      break;

    case Notice.States.WAITING_FOR_GRADED_LIST: // solo ufficio didattica (quando inoltra la graduatoria a ddi)
      break;

    case Notice.States.CLOSED: // solo ddi (quando carica la graduatoria)
      break;
  }
};

exports.delete = (req, res) => {

};

exports.search = (req, res) => {

};

exports.find = (req, res) => {
  const id = req.params.id;
  if (id == null || Number.parseInt(id) === NaN) {
    return res.status(412).send({error: 'Invalid protocol number'});
  }

  Notice.findByProtocol(id)
      .then((notice) => {
        /* Non penso serva qui
         const userRole = req.user == null ? User.Role.STUDENT : req.user.role;

         if (!accessList.get(userRole).includes(notice.state)) {
          return res.status(403);
        } */
        return res.send({notice: notice});
      })
      .catch((err) => {
        return res.status(500).send({error: err});
      });
};

exports.findAll = (req, res) => {
  Notice.findAll()
      .then((notices) => {
        return res.send({notices: notices});
      })
      .catch((err) => {
        return res.status(500).send({error: err});
      });
};

exports.downloadNotice = (req, res) => {

};

exports.uploadNotice = (req, res) => {

};

exports.downloadGradedList = (req, res) => {

};

exports.uploadGradedList = (req, res) => {

};
