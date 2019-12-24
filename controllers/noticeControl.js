/*
 * NoticeControl
 *
 * This module represents the Notice Controller
 *
 * @author Marco D'Antonio
 * @version
 * @since
 *
 * 2019 - Copyright by Gang Of Four Eyes
 */
const Notice = require('../models/notice');
const Comment = require('../models/comment');
const ERR_CLIENT_STATUS = 412;
const ERR_SERVER_STATUS = 500;

/**
 *  Handles the request for the creation of a notice
 *
 * @param {Request} req
 * @param {Response} res
 */
exports.create = (req, res) => {
  res.set('Content-Type', 'application/json');
  const notice = req.body;

  if (notice == null) {
    res.status(ERR_CLIENT_STATUS).send({error: 'Request body must be defined'});
  }

  Notice.create(notice)
      .then((notice) => {
        return res.send({notice: notice});
      })
      .catch((err) => {
        return res.status(ERR_SERVER_STATUS).send({error: err});
      });
};

exports.update = (req, res) => {
  res.set('Content-Type', 'application/json');
  const notice = req.body;

  if (notice == null) {
    return res.status(ERR_CLIENT_STATUS).send({error: 'Request body must be defined'});
  }

  Notice.update(notice)
      .then((notice) => {
        return res.send({notice: notice});
      })
      .catch((err) => {
        return res.status(ERR_SERVER_STATUS).send({error: err});
      });
};

exports.setStatus = (req, res) => {
  const notice = req.body;
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
  res.set('Content-Type', 'application/json');

  const id = req.params.id;
  if (id === null || Number.parseInt(id) === NaN) {
    return res.status(ERR_CLIENT_STATUS).send({error: 'Invalid protocol number'});
  }

  Notice.findByProtocol(id)
      .then((notice) => {
        return res.send({notice: notice});
      })
      .catch((err) => {
        return res.status(ERR_CLIENT_STATUS).send({error: err});
      });
};

exports.findAll = (req, res) => {
  res.set('Content-Type', 'application/json');

  Notice.findAll()
      .then((notices) => {
        return res.send({notices: notices});
      })
      .catch((err) => {
        return res.status(ERR_SERVER_STATUS).send({error: err});
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
