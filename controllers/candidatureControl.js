const Candidature = require('../models/candidature');
const User = require('../models/user');
const Check = require('../utils/check');
const Document = require('../models/document');
const JSZip = require('jszip');
const FileType = require('file-type');
const fs = require('fs');
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
  if (candidature == null || user == null) {
    res.status(ERR_CLIENT_STATUS);
    res.send({
      status: false,
      error: 'Non è stato specificata correttamente la candidatura',
    });

    return;
  }

  try {
    Check.checkNoticeProtocol(candidature.notice_protocol);
  } catch (error) {
    res.status(ERR_CLIENT_STATUS)
        .send({
          error: error.message,
          exception: error,
        });

    return;
  }

  // Decode Base64
  candidature.documents = candidature.documents.map((d) => {
    d.file = Buffer.from(d.file, 'base64');
    d.student = user.id;

    return d;
  });
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
          error: 'Creazione della candidatura fallita.',
          exception: err.message,
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
  if (candidature == null || candidature.student !== user.id) {
    res.status(ERR_CLIENT_STATUS);
    res.send({
      status: false,
      error: 'Non è stato specificata correttamente la candidatura',
    });

    return;
  }

  try {
    Check.checkNoticeProtocol(candidature.notice_protocol);
  } catch (error) {
    res.status(ERR_CLIENT_STATUS)
        .send({
          error: error.message,
          exception: error,
        });

    return;
  }

  // Decode Base64
  candidature.documents = candidature.documents.map((d) => {
    d.file = Buffer.from(d.file, 'base64');
    d.student = user.id;

    return d;
  });
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
          error: 'Modifica della candidatura fallita',
          exception: err.message,
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

  if (notice == null || user == null) {
    res.status(ERR_CLIENT_STATUS);
    res.send({
      status: false,
      error: 'Non è stato specificata correttamente la candidatura',
    });

    return;
  }

  try {
    Check.checkNoticeProtocol(candidature.notice_protocol);
  } catch (error) {
    res.status(ERR_CLIENT_STATUS)
        .send({
          error: error.message,
          exception: error,
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
          error: 'Cancellazione della candidatura fallita',
          exception: err.message,
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
    res.status(403);
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
        candidatures.forEach((c) => {
          c.documents = c.documents.map((d) => {
            d.file = null;

            return d;
          });
        });
        res.status(OK_STATUS).send({
          candidatures: candidatures,
        });
      })
      .catch((err) => {
        res.status(ERR_SERVER_STATUS);
        res.send({
          error: 'Ricerca fallita',
          candidatures: [],
          exception: err.message,
        });
      });
};

exports.dowloadDocumentFile = (req, res) => {
  const candidature = req.body.candidature;
  const fileName = req.body.fileName;

  if (!candidature || !fileName) {
    res.status(ERR_CLIENT_STATUS);
    res.send({
      error: 'Inviare una candidatura e un filename.',
    });

    return;
  }

  try {
    Check.checkNoticeProtocol(candidature.notice_protocol);
    Check.checkEmail(candidature.student);
  } catch (error) {
    res.status(ERR_CLIENT_STATUS)
        .send({
          error: error.message,
          exception: error,
        });

    return;
  }

  Document.findById(fileName, candidature.student, candidature.notice_protocol)
      .then(async (doc) => {
        res
            .type((await FileType.fromBuffer(doc.file)).mime)
            .set('Content-Disposition', 'attachment; filename=' + doc.file_name)
            .send(doc.file);
      })
      .catch((err) => {
        res.status(ERR_SERVER_STATUS);
        res.send({
          error: 'Download fallito',
          exception: err.message,
        });
      });
};

exports.dowloadDocuments = async (req, res) => {
  const candidature = req.body.candidature;

  if (!candidature) {
    res.status(ERR_CLIENT_STATUS);
    res.send({
      error: 'Inviare una candidatura.',
    });

    return;
  }

  try {
    Check.checkNoticeProtocol(candidature.notice_protocol);
    Check.checkEmail(candidature.student);
  } catch (error) {
    res.status(ERR_CLIENT_STATUS)
        .send({
          error: error.message,
          exception: error,
        });

    return;
  }

  const student = await User.findByEmail(candidature.student);

  Document.findByCandidature(candidature)
      .then((docs) => {
        const zip = new JSZip();

        const fileName = `Candidatura ${student.name} ${student.surname} - ${candidature.notice_protocol}.zip`;

        docs.forEach((doc) => zip.file(doc.file_name, doc.file));
        zip
            .generateNodeStream({streamFiles: true})
            .pipe(fs.createWriteStream(fileName))
            .on('finish', function() {
              res
                  .type('application/zip')
                  .download(fileName, (err) => {
                    if (err) {
                      console.log(err);
                    }
                    fs.unlink(fileName, () => {
                      console.log(`Deleted temp file ${fileName}`);
                    });
                  });
            });
      })
      .catch((err) => {
        console.log(err);
        res.status(ERR_SERVER_STATUS);
        res.send({
          error: 'Download fallito',
          exception: err.message,
        });
      });
};
