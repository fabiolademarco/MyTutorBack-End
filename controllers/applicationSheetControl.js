const ApplicationSheet = require('../models/applicationSheet');
const Check = require('../utils/check');
const OK_STATUS = 200;
const ERR_CLIENT_STATUS = 412;
const ERR_SERVER_STATUS = 500;

/**
 * ApplicationSheet
 *
 * This module represents the Application Sheet controller
 *
 * @module
 * @author Giannandrea Vicidomini, Francesco Migliaro
 *
 * @copyright 2019 - Copyright by Gang Of Four Eyes
 */

/**
 * Handles the request for the creation of an application
 * @param {Request} req
 * @param {Response} res
 */
exports.create = (req, res) => {
  const applicationSheet = req.body.applicationSheet;

  if (applicationSheet == null || !Check.checkApplicationSheet(applicationSheet)) {
    res.status(ERR_CLIENT_STATUS)
        .send({error: 'Deve essere inserita una domanda valida.'});

    return;
  }

  ApplicationSheet.create(applicationSheet)
      .then((data) => {
        res.status(OK_STATUS)
            .send({status: true});
      })
      .catch((err) => {
        res.status(ERR_SERVER_STATUS)
            .send({
              error: 'Creazione della domanda fallita.',
              exception: err,
            });
      });
};


/**
 * Handles the request for the update of an application
 * @param {Request} req
 * @param {Response} res
 */
exports.update = (req, res) => {
  const applicationSheet = req.body.applicationSheet;

  if (applicationSheet == null || !Check.checkApplicationSheet(applicationSheet)) {
    res.status(ERR_CLIENT_STATUS)
        .send({error: 'Deve essere inserita una domanda valida.'});

    return;
  }

  ApplicationSheet.update(applicationSheet)
      .then((data) => {
        res.status(OK_STATUS)
            .send(data);
      })
      .catch((err) => {
        res.status(ERR_SERVER_STATUS)
            .send({
              error: 'Aggiornamento della domanda fallito.',
              exception: err,
            });
      });
};


/**
 * Handles the request for the deletion of an application
 * @param {Request} req
 * @param {Response} res
 */
exports.delete = (req, res) => {
  const noticeProtocol = req.body.noticeProtocol;

  if (applicationSheet == null || !Check.checkNoticeProtocol(noticeProtocol)) {
    res.status(ERR_CLIENT_STATUS)
        .send({error: 'Deve essere inserita una domanda valida.'});

    return;
  }

  const applicationObject = new ApplicationSheet();

  applicationObject.noticeProtocol = noticeProtocol;

  ApplicationSheet.remove(applicationObject)
      .then((data) => {
        res.status(OK_STATUS)
            .send({status: data});
      })
      .catch((err) => {
        res.status(ERR_SERVER_STATUS)
            .send({
              error: 'Rimozione della domanda fallita.',
              exception: err,
            });
      });
};
