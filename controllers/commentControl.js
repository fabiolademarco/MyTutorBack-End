const Comment = require('../models/comment');
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
  * Handles the request for create a comment.
  * @param {Request} req
  * @param {Response} res
  */
exports.set = (req, res) => {
  if (!req.body.comment) {
    res.status(ERR_CLIENT_STATUS).send({error: 'Request body must be defined'});
  }

  const comment = req.body.comment;

  Comment.exists(comment)
      .then((exist) => {
        if (exist) {
          Comment.update(comment)
              .then((comment) => {
                return res.send({comment: comment});
              })
              .catch((err) => {
                return res.status(ERR_SERVER_STATUS).send({error: err});
              });
        } else {
          Comment.create(comment)
              .then((comment) => {
                return res.send({comment: comment});
              })
              .catch((err) => {
                return res.status(ERR_SERVER_STATUS).send({error: err});
              });
        }
      })
      .catch((err) => res.status(ERR_SERVER_STATUS).send({error: err}));
};

/**
 * Handles the request for remove a comment.
 * @param {Request} req
 * @param {Reponse} res
 */
exports.delete = (req, res) => {
  if (!req.body.comment) {
    res.status(ERR_CLIENT_STATUS).send({error: 'Request body must be defined'});
  }

  const comment = req.body.comment;

  Comment.remove(comment)
      .then((comment) => {
        return res.send({comment: comment});
      })
      .catch((err) => {
        return res.status(ERR_SERVER_STATUS).send({error: err});
      });
};

/**
 * Handles the request for search a comment by notice's protocol.
 * @param {Request} req
 * @param {Response} res
 */
exports.get = (req, res) => {
  if (!req.body.noticeProtocol) {
    res.status(ERR_CLIENT_STATUS).send({error: 'Request body must be defined'});
  }

  const noticeProtocol = req.body.noticeProtocol;

  Comment.findByProtocol(noticeProtocol)
      .then((comment) => {
        return res.send({comment: comment});
      })
      .catch((err) => {
        return res.status(ERR_SERVER_STATUS).send({error: err});
      });
};
