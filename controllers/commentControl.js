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
  */
exports.set = (req, res) => {
  const comment = req.body.comment;
  const user = req.user;

  if (!comment || !Check.checkComment(comment)) {
    res.status(ERR_CLIENT_STATUS)
        .send({error: 'Deve essere inserito un commento valido.'});
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
  Comment.exists(comment)
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
                      exception: err,
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
                      exception: err,
                    });
              });
        }
      })
      .catch((err) => {
        res.status(ERR_SERVER_STATUS)
            .send({
              error: 'Controllo sull\'esistenza del commento fallito.',
              exception: err,
            });
      });
};

/**
 * Handles the request for remove a comment.
 * @param {Request} req
 * @param {Reponse} res
 */
exports.delete = (req, res) => {
  const notice = req.params.id;

  if (!notice || !Check.checkNoticeProtocol(notice)) {
    res.status(ERR_CLIENT_STATUS)
        .send({error: 'Deve essere inserito un commento valido'});

    return;
  }
  const comment = new Comment({notice: notice});
  Comment.remove(comment)
      .then((comment) => {
        res.status(OK_STATUS)
            .send({comment: comment});
      })
      .catch((err) => {
        res.status(ERR_SERVER_STATUS)
            .send({
              error: 'Rimozione del commento fallita.',
              exception: err,
            });
      });
};

/**
 * Handles the request for search a comment by notice's protocol.
 * @param {Request} req
 * @param {Response} res
 */
exports.get = (req, res) => {
  const noticeProtocol = req.body.noticeProtocol;

  if (!noticeProtocol || !Check.checkNoticeProtocol(noticeProtocol)) {
    res.status(ERR_CLIENT_STATUS)
        .send({error: 'Deve essere inserito un protocollo valido'});

    return;
  }

  Comment.findByProtocol(noticeProtocol)
      .then((comment) => {
        res.status(OK_STATUS)
            .send({comment: comment});
      })
      .catch((err) => {
        res.status(ERR_SERVER_STATUS)
            .send({
              error: 'Fetch del commento fallito.',
              exception: err,
            });
      });
};
