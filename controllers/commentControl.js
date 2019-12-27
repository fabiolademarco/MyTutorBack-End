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
exports.create = (req, res) => {
  if (!req.body.comment) {
    res.status(ERR_CLIENT_STATUS).send({error: 'Request body must be defined'});
  }

  const comment = req.body.comment;

  Comment.create(comment)
      .then((comment) => {
        return res.send({comment: comment});
      })
      .catch((err) => {
        return res.status(ERR_SERVER_STATUS).send({error: err});
      });
};

/**
 * Handles the request for update a comment.
 * @param {Request} req
 * @param {Response} res
 */
exports.update = (req, res) => {
  if (!req.body.comment) {
    res.status(ERR_CLIENT_STATUS).send({error: 'Request body must be defined'});
  }

  const comment = req.body.comment;

  Comment.update(comment)
      .then((comment) => {
        return res.send({comment: comment});
      })
      .catch((err) => {
        return res.status(ERR_SERVER_STATUS).send({error: err});
      });
};

/**
 * Handles the request for remove a comment.
 * @param {Request} req
 * @param {Reponse} res
 */
exports.remove = (req, res) => {
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
 * Handles the request for check if a comment exists.
 * @param {Request} req
 * @param {Response} res
 */
exports.exists = (req, res) => {
  if (!req.body.comment) {
    res.status(ERR_CLIENT_STATUS).send({error: 'Request body must be defined'});
  }

  const comment = req.body.comment;

  Comment.exists(comment)
      .then((exists) => {
        return res.send({exists: exists});
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
exports.findByProtocol = (req, res) => {
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

/**
 * Handles the request for get all comment.
 * @param {Request} req
 * @param {Response} res
 */
exports.findAll = (req, res) => {
  Comment.findAll()
      .then((comments) => {
        return res.send({comments: comments});
      })
      .catch((err) => {
        return res.status(ERR_SERVER_STATUS).send({error: err});
      });
};
