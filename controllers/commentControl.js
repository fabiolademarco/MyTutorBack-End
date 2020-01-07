const Comment = require('../models/comment');
const Check = require('../utils/check');
const User = require('../models/user');
const OK_STATUS = 200;
const ERR_CLIENT_STATUS = 412;
const ERR_SERVER_STATUS = 500;

/**
 * CommentControl
 *
 * This module represents the Comment Controller
 *
 * @module
 * @author Francesco Migliaro
 *
 * @copyright 2019 - Copyright by Gang Of Four Eyes
 */

/**
  * Handles the request for create and update a comment.
  * @param {Request} req
  * @param {Response} res
  * @return {Promise}
  */
exports.set = (req, res) => {
  const comment = req.body.comment;
  const user = req.user;

  if (!comment) {
    res.status(ERR_CLIENT_STATUS)
        .send({error: 'Deve essere inserito un commento valido.'});

    return;
  }

  try {
    Check.checkComment(comment);
  } catch (error) {
    res.status(ERR_CLIENT_STATUS)
        .send({
          error: error.message,
          exception: error,
        });

    return;
  }

  if (user.role !== User.Role.DDI && user.role !== User.Role.PROFESSOR) {
    res.status(403);
    res.send({
      error: 'Non sei autorizzato.',
    });

    return;
  }
  comment.author = user.id;

  return Comment.exists(comment)
      .then((exist) => {
        if (exist) {
          Comment.update(comment)
              .then((comment) => {
                res.status(OK_STATUS)
                    .send({comment: comment});
              })
              .catch((err) => {
                res.status(ERR_SERVER_STATUS)
                    .send({
                      error: 'Aggiornamento del commento fallito.',
                      exception: err.message,
                    });
              });
        } else {
          Comment.create(comment)
              .then((comment) => {
                res.status(OK_STATUS)
                    .send({comment: comment});
              })
              .catch((err) => {
                res.status(ERR_SERVER_STATUS)
                    .send({
                      error: 'Creazione del commento fallita.',
                      exception: err.message,
                    });
              });
        }
      })
      .catch((err) => {
        res.status(ERR_SERVER_STATUS)
            .send({
              error: 'Controllo sull\'esistenza del commento fallito.',
              exception: err.message,
            });
      });
};

/**
 * Handles the request for remove a comment.
 * @param {Request} req
 * @param {Reponse} res
 * @return {Promise}
 */
exports.delete = (req, res) => {
  const notice = req.params.id;

  if (!notice) {
    res.status(ERR_CLIENT_STATUS)
        .send({error: 'Deve essere inserito un commento valido'});

    return;
  }

  try {
    Check.checkNoticeProtocol(notice);
  } catch (error) {
    res.status(ERR_CLIENT_STATUS)
        .send({
          error: error.message,
          exception: error,
        });

    return;
  }

  const comment = new Comment({notice: notice});

  return Comment.remove(comment)
      .then((comment) => {
        res.status(OK_STATUS)
            .send({comment: comment});
      })
      .catch((err) => {
        res.status(ERR_SERVER_STATUS)
            .send({
              error: 'Rimozione del commento fallita.',
              exception: err.message,
            });
      });
};

/**
 * Handles the request for search a comment by notice's protocol.
 * @param {Request} req
 * @param {Response} res
 * @return {Promise}
 */
exports.get = (req, res) => {
  const noticeProtocol = req.body.noticeProtocol;

  if (!noticeProtocol) {
    res.status(ERR_CLIENT_STATUS)
        .send({error: 'Deve essere inserito un protocollo valido'});

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

  return Comment.findByProtocol(noticeProtocol)
      .then((comment) => {
        res.status(OK_STATUS)
            .send({comment: comment});
      })
      .catch((err) => {
        res.status(ERR_SERVER_STATUS)
            .send({
              error: 'Fetch del commento fallito.',
              exception: err.message,
            });
      });
};
