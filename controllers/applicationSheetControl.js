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
 * @return {Promise}
 */
exports.create = (req, res) => {
  const applicationSheet = req.body.applicationSheet;

  if (applicationSheet == null) {
    res.status(ERR_CLIENT_STATUS)
        .send({error: 'Deve essere inserita una domanda.'});

    return;
  }

  try {
    Check.checkApplicationSheet(applicationSheet);
  } catch (error) {
    res.status(ERR_CLIENT_STATUS)
        .send({
          error: error.message,
          exception: error,
        });

    return;
  }

  return ApplicationSheet.create(applicationSheet)
      .then((data) => {
        res.status(OK_STATUS)
            .send({status: true});
      })
      .catch((err) => {
        res.status(ERR_SERVER_STATUS)
            .send({
              error: 'Creazione della domanda fallita.',
              exception: err.message,
            });
      });
};


/**
 * Handles the request for the update of an application
 * @param {Request} req
 * @param {Response} res
 * @return {Promise}
 */
exports.update = (req, res) => {
  const applicationSheet = req.body.applicationSheet;

  if (applicationSheet == null) {
    res.status(ERR_CLIENT_STATUS)
        .send({error: 'Deve essere inserita una domanda valida.'});

    return;
  }

  try {
    Check.checkApplicationSheet(applicationSheet);
  } catch (error) {
    res.status(ERR_CLIENT_STATUS)
        .send({
          error: error.message,
          exception: error,
        });

    return;
  }

  return ApplicationSheet.update(applicationSheet)
      .then((data) => {
        res.status(OK_STATUS)
            .send({applicationSheet: data});
      })
      .catch((err) => {
        res.status(ERR_SERVER_STATUS)
            .send({
              error: 'Aggiornamento della domanda fallito.',
              exception: err.message,
            });
      });
};


/**
 * Handles the request for the deletion of an application
 * @param {Request} req
 * @param {Response} res
 * @return {Promise}
 */
exports.delete = (req, res) => {
  const noticeProtocol = req.params.id;

  if (applicationSheet == null) {
    res.status(ERR_CLIENT_STATUS)
        .send({error: 'Deve essere inserito un protocollo valido.'});

    return;
  }

  try {
    Check.checkNoticeProtocol(noticeProtocol);
  } catch (error) {
    res.status(ERR_CLIENT_STATUS)
        .send({
          error: error.message,
          exception: error,
        });

    return;
  }

  const applicationObject = new ApplicationSheet();

  applicationObject.notice_protocol = noticeProtocol;

  return ApplicationSheet.remove(applicationObject)
      .then((data) => {
        res.status(OK_STATUS)
            .send({status: data});
      })
      .catch((err) => {
        res.status(ERR_SERVER_STATUS)
            .send({
              error: 'Rimozione della domanda fallita.',
              exception: err.message,
            });
      });
};
