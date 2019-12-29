const Assignment = require('../models/assignment');
const User = require('../models/user');
const OK_STATUS = 200;
const ERR_CLIENT_STATUS = 412;
const ERR_SERVER_STATUS = 500;

/**
 * AssignmentControl
 *
 * This class represents the Assignment Controller
 *
 * @module
 * @author Roberto Bruno
 * @todo Bisogna definire l'autenticazione ed l'invio delle email
 *
 * @copyright 2019 - Copyright by Gang Of Four Eyes
 */

/**
 * Allows to send a request of an assignment
 * @param {Request} req
 * @param {Response} res
 */
exports.sendRequest = (req, res) => {
  const assignment = new Assignment(req.body.assignment);
  const emailStudent = req.body.emailStudent;
  // Bisogna  controllare che esista anche lo studente
  // e forse che sia in graduatoria
  if (emailStudent == null || assignment == null || assignment.state !== Assignment.states.UNASSIGNED || !checkAssignment(assignment) || !checkEmail(emailStudent)) {
    res.status(ERR_CLIENT_STATUS);
    res.send({error: 'Non è stato specificato lo studente o l\'incarico'});
    return;
  }
  assignment.student = emailStudent;
  assignment.state = Assignment.states.WAITING;
  Assignment.update(assignment)
      .then((data) => {
        res.status(OK_STATUS).send({
          assignment: data,
        });
        // Inviare email
      })
      .catch((err) => {
        res.status(ERR_SERVER_STATUS).send({error: 'Aggiornamento fallito'});
      });
};

/**
 * Allows to book the firm for an assignment
 * @param {Request} req
 * @param {Response} res
 */

exports.book = (req, res) => {
  const assignment = new Assignment(req.body.assignment);

  if (assignment == null || assignment.state !== Assignment.states.WAITING || !checkAssignment(assignment)) {
    res.status(ERR_CLIENT_STATUS);
    res.send({error: 'L\'incarico non può essere prenotato'});
    return;
  }
  assignment.state = Assignment.states.BOOKED;
  Assignment.update(assignment)
      .then((data) => {
        res.status(OK_STATUS).send({result: true});
        // Inviare email
      })
      .catch((err) => {
        res.status(ERR_SERVER_STATUS).send({error: false});
      });
};

/**
 * Allows to assign an assignment to a student
 * @param {Request} req
 * @param {Response} res
 */

exports.assign = (req, res) => {
  const assignment = new Assignment(req.body.assignment);

  if (assignment == null || assignment.state !== Assignment.states.BOOKED || !checkAssignment(assignment)) {
    res.status(ERR_CLIENT_STATUS)
        .send({error: 'L\'incarico non può essere assegnato'});
    return;
  }
  assignment.state = Assignment.states.ASSIGNED;
  Assignment.update(assignment)
      .then((data) => {
        res.status(OK_STATUS).send({result: true});
        // Inviare email
      })
      .catch((err) => {
        res.status(ERR_SERVER_STATUS).send({error: false});
      });
};

/**
 * Return a list of assignments, that respect the filter criteria
 * @param {Request} req
 * @param {Response} res
 */
exports.search = (req, res) => {
  const user = req.user;
  if (user == null || (user.role !== User.Role.STUDENT && user.role !== User.Role.TEACHING_OFFICE)) {
    res.status(401).send({error: 'Non sei autorizzato'});
    return;
  }
  const filter = {
    code: req.query.code,
    noticeProtocol: req.query.noticeProtocol,
    state: req.query.state,
    student: req.query.student,
  };
  if (user.role === User.Role.STUDENT) {
    filter.student = user.id;
  }
  Assignment.search(filter)
      .then((data) => {
        res.status(OK_STATUS).send({list: data});
      })
      .catch((err) => {
        res.status(ERR_SERVER_STATUS).send({error: err});
      });
};

/**
 * Allows to decline the request of an assignment
 * @param {Request} req
 * @param {Response} res
 */
exports.decline = (req, res) => {
  const assignment = new Assignment(req.body.assignment);
  const user = req.user;
  if (assignment == null || assignment.state !== Assignment.states.WAITING || assignment.student !== user.id || !checkAssignment(assignment)) {
    res.status(ERR_CLIENT_STATUS)
        .send({error: 'L\'incarico non può essere rifiutato'});
    return;
  }
  assignment.state = Assignment.states.UNASSIGNED;
  assignment.student = null;
  Assignment.update(assignment)
      .then((data) => {
        res.status(OK_STATUS).send({result: true});
      // Inviare email
      })
      .catch((err) => {
        res.status(ERR_SERVER_STATUS).send({error: false});
      });
};

/**
 * Finds an assignment
 * @param {Request} req
 * @param {Response} res
 */

exports.find = (req, res) => {
  const id = req.params.id;
  const user = req.user;
  if (id == null || Number.parseInt(id) === NaN) {
    res.status(ERR_CLIENT_STATUS).send({error: 'Id non passato'});
    return null;
  }
  if (user.role === User.Role.TEACHING_OFFICE) {
    Assignment.findById(id)
        .then((data) => {
          data = data === undefined ? null : data;
          res.status(OK_STATUS).send({assignment: data});
        })
        .catch((err) => {
          res.status(ERR_SERVER_STATUS).send({error: err});
        });
  } else if (user.role === User.Role.STUDENT) {
    Assignment.findByStudent(user.id)
        .then((assignments) => {
          const assignment = assignments.filter((el) => el.id === id);
          if (assignment.length === 1) {
            res.status(OK_STATUS).send({assignment: assignment[0]});
          } else {
            res.status(OK_STATUS).send({assignment: null});
          }
        })
        .catch((err) => {
          res.status(ERR_SERVER_STATUS).send({error: err});
        });
  } else {
    res.status(401).send({error: 'Non sei autorizzato'});
  }
};

/**
 * Allows to close an assignment
 * @param {Request} req
 * @param {Response} res
 */
exports.close = (req, res) => {
  const assignment = new Assignment(req.body.assignment);

  if (assignment == null || assignment.state !== Assignment.states.ASSIGNED || !checkAssignment(assignment)) {
    res.status(ERR_CLIENT_STATUS)
        .send({error: 'L\'incarico non può essere chiuso'});
    return;
  }
  assignment.state = Assignment.states.OVER;
  Assignment.update(assignment)
      .then((data) => {
        res.status(OK_STATUS).send({error: true});
      })
      .catch((err) => {
        res.status(ERR_SERVER_STATUS).send({error: false});
      });
};


const checkAssignment = (assignment) => {
  const noticeProtocolExp = /Prot. n. [0-9]+/;
  const studentExp = /^[a-z]\.[a-z]+[1-9]*\@(studenti\.)?unisa\.it$/;
  const codeExp = /[A-Z]+\/[1-9]+/;
  const idExp = /[1-9]+/;
  const totalNumberHoursExp = /[0-9]+/;
  const title = /PhD|Master/;
  const hourlyCostExp = /[0-9]+(.[0-9]{2})?/;
  const stateExp = /Unassigned|Waiting|Booked|Assigned|Over/;
  if (!noticeProtocolExp.test(assignment.notice_protocol)) {
    return false;
  }
  if (assignment.student != null && !studentExp.test(assignment.student)) {
    return false;
  }
  if (!codeExp.test(assignment.code)) {
    return false;
  }
  if (assignment.id != null && !idExp.test(assignment.id)) {
    return false;
  }
  if (!totalNumberHoursExp.test(assignment.total_number_hours)) {
    return false;
  }
  if (!title.test(assignment.title)) {
    return false;
  }
  if (!hourlyCostExp.test(assignment.hourly_cost)) {
    return false;
  }
  if (!stateExp.test(assignment.state)) {
    return false;
  }

  return true;
};

const checkEmail = (email) => {
  return /^[a-z]\.[a-z]+[1-9]*\@(studenti\.)?unisa\.it$/.test(email);
};
