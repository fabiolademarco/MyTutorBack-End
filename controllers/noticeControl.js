const Notice = require('../models/notice');
const User = require('../models/user');
const Check = require('../utils/check');
const pdf = require('../utils/pdf');
const OK_STATUS = 200;
const ERR_CLIENT_STATUS = 412;
const ERR_SERVER_STATUS = 500;

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
 *  must be a Teaching Office to perform this action
 *
 * @param {Request} req
 * @param {Response} res
 */
exports.create = (req, res) => {
  const notice = req.body.notice;

  if (notice == null || !Check.checkNotice(notice)) {
    res.status(ERR_CLIENT_STATUS)
        .send({error: 'Deve essere inserito un bando valido.'});

    return;
  }

  Notice.create(notice)
      .then((notice) => {
        res.status(OK_STATUS).
            send({notice: notice});
      })
      .catch((err) => {
        res.status(ERR_SERVER_STATUS).
            send({
              error: 'Creazione del bando fallita.',
              exception: err,
            });
      });
};

/**
 *  Handles the request for the modification of a notice
 *  must be a Teaching Office to perform this action
 *
 * @param {Request} req
 * @param {Response} res
 */
exports.update = (req, res) => {
  const notice = req.body.notice;

  if (notice == null || !Check.checkNotice(notice)) {
    res.status(ERR_CLIENT_STATUS)
        .send({error: 'Deve essere inserito un bando valido'});

    return;
  }

  Notice.update(notice)
      .then((notice) => {
        res.status(OK_STATUS)
            .send({notice: notice});
      })
      .catch((err) => {
        res.status(ERR_SERVER_STATUS)
            .send({
              error: 'Aggiornamento del bando fallito.',
              exception: err,
            });
      });
};

/**
 *  Handles the request to change the Status of a notice
 *  must be a Teaching Office/Professor/DDI to perform some of these actions
 *
 * @param {Request} req
 * @param {Response} res
 */
exports.setState = (req, res) => {
  const userRole = req.user == null ? User.Role.STUDENT : req.user.role;
  const notice = req.body.notice;

  const statusAccessList = new Map();

  statusAccessList.set(User.Role.PROFESSOR, [Notice.States.DRAFT, Notice.States.ACCEPTED]);
  statusAccessList.set(User.Role.DDI, [Notice.States.DRAFT, Notice.States.APPROVED, Notice.States.CLOSED]);
  statusAccessList.set(User.Role.TEACHING_OFFICE, [Notice.States.IN_ACCEPTANCE, Notice.States.IN_APPROVAL, Notice.States.PUBLISHED, Notice.States.WAITING_FOR_GRADED_LIST]);

  if (!statusAccessList.get(userRole).includes(notice.state)) {
    res.status(403).send();

    return;
  }

  // if (notice == null || !Check.checkNotice(notice)) {
  //   res.status(ERR_CLIENT_STATUS)
  //       .send({error: 'Deve essere inserito un bando valido.'});

  //   return;
  // }


  notice = new Notice();

  if (updatedNotice.state === Notice.States.IN_APPROVAL) {
    const path = pdf.generateNotice(notice);

    notice.notice_file = path;
  }

  Notice.update(notice)
      .then((notice) => {
        res.status()
            .send({notice: notice});
      })
      .catch((err) => {
        res.status(500)
            .send({
              error: 'Aggiornamento del bando fallito.',
              exception: err,
            });
      });
};

/**
 *  Handles the request for the cancellation of a notice
 *  must be a Teaching Office to perform this action
 *
 * @param {Request} req
 * @param {Response} res
 */
exports.delete = (req, res) => {
  const notice = req.body.notice;

  if (notice == null || !Check.checkNotice(notice)) {
    res.status(ERR_CLIENT_STATUS)
        .send({error: 'Deve essere inserito un bando valido.'});

    return;
  }

  Notice.remove(notice)
      .then((value) => {
        res.status(OK_STATUS)
            .send({result: value});
      })
      .catch((err) => {
        res.status(ERR_SERVER_STATUS)
            .send({
              error: 'Rimozione del bando fallita.',
              exception: err,
            });
      });
};

/**
 *  Handles the request for searching the notices
 *  different roles may perform this action, if Unauthorized, will return 403
 *
 * @param {Request} req
 * @param {Response} res
 */
exports.search = async (req, res) => {
  const userRole = req.user == null ? User.Role.STUDENT : req.user.role;

  const protocol = req.body.protocol;
  const state = req.body.state;
  const professor = req.body.professor;
  const type = req.body.type;

  if (!protocol && !state && !professor && !type) {
    return this.findAll(req, res);
  }

  if (protocol && !state && !professor && !type) {
    req.params.id = protocol;

    return this.find(req, res);
  }

  if (professor && (userRole !== User.Role.PROFESSOR || userRole !== User.Role.TEACHING_OFFICE)) {
    res.status(403).send();

    return;
  }

  const userAccessList = accessList.get(userRole);

  let notices = [];

  if (protocol) {
    notices = await Notice.findByProtocol(protocol);
    notices = notices.filter((notice) => userAccessList.includes(notice.state));
  }

  if (state) {
    if (!userAccessList.includes(state)) {
      res.status(403).send();

      return;
    }

    if (!protocol) {
      notices = await Notice.findByState([state]);
    } else {
      notices = notices.filter((notice) => notice.state === state);
    }
  } else if (!protocol) {
    notices = await Notice.findByState(userAccessList);
  }


  if (professor) {
    professor = professor.toLowerCase();
    notices = notices.filter((notice) => notice.referent_professor.toLowerCase().includes(professor));
  }

  if (type) {
    notices = notices.filter((notice) => notice.type === type);
  }

  res.status(OK_STATUS).
      send({notices: notices});
};

/**
 *  Handles the request for the cancellation of a notice
 *  different roles may perform this action, if Unauthorized, will return 403
 *
 * @param {Request} req
 * @param {Response} res
 */
exports.find = (req, res) => {
  const id = req.params.id;

  if (id == null || !Check.checkNoticeProtocol(id)) {
    res.status(ERR_CLIENT_STATUS)
        .send({error: 'Deve essere inserito un protocollo valido.'});

    return;
  }

  Notice.findByProtocol(id)
      .then((notices) => {
        const userRole = req.user == null ? User.Role.STUDENT : req.user.role;

        const userAccessList = accessList.get(userRole);
        const authorizedNotices = notices.filter((notice) => userAccessList.includes(notice.state));

        res.send({notices: authorizedNotices});
      })
      .catch((err) => {
        res.status(ERR_SERVER_STATUS)
            .send({
              error: 'Fetch del bando fallito.',
              exception: err,
            });
      });
};

/**
 *  Handles the request for the retrieval of all notices
 *  different roles may perform this action
 *
 * @param {Request} req
 * @param {Response} res
 */
exports.findAll = (req, res) => {
  const userRole = req.user == null ? User.Role.STUDENT : req.user.role;

  userAccessList = accessList.get(userRole);

  Notice.findByState(userAccessList)
      .then((notices) => {
        res.status(OK_STATUS)
            .send({notices: notices});
      })
      .catch((err) => {
        res.status(ERR_SERVER_STATUS)
            .send({
              error: 'Fetch del bando fallito.',
              exception: err,
            });
      });
};

exports.downloadNotice = (req, res) => {

};

exports.uploadNotice = (req, res) => {

};

exports.downloadGradedList = (req, res) => {

};

exports.uploadGradedList = (req, res) => {
  // ricordare di fare la update dello stato del bando
};
