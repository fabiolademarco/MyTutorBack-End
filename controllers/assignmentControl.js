const Assignment = require('../models/assignment');
const User = require('../models/user');
const Check = require('../utils/check');
const Mail = require('../utils/mail');
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
  if (emailStudent == null || assignment == null || assignment.state !== Assignment.states.UNASSIGNED) {
    res.status(ERR_CLIENT_STATUS);
    res.send({error: 'Non è stato specificato lo studente o l\'incarico'});

    return;
  }

  try {
    Check.checkAssignment(assignment);
    Check.checkStudentEmail(emailStudent);
  } catch (error) {
    res.status(ERR_CLIENT_STATUS)
        .send({
          error: error.message,
          exception: error,
        });

    return;
  }

  assignment.student = emailStudent;
  assignment.state = Assignment.states.WAITING;
  Assignment.update(assignment)
      .then(async (data) => {
        await Mail.sendEmailToStudentRequest(assignment.student);
        res.status(OK_STATUS)
            .send({assignment: data});
      })
      .catch((err) => {
        res.status(ERR_SERVER_STATUS)
            .send({
              error: 'Aggiornamento fallito',
              exception: err.message,
            });
      });
};

/**
 * Allows to book the firm for an assignment
 * @param {Request} req
 * @param {Response} res
 */

exports.book = (req, res) => {
  const assignment = new Assignment(req.body.assignment);
  const user = req.user;

  if (assignment == null || assignment.state !== Assignment.states.WAITING || assignment.student != user.id) {
    res.status(ERR_CLIENT_STATUS);
    res.send({error: 'L\'incarico non può essere prenotato'});

    return;
  }

  assignment.state = Assignment.states.BOOKED;

  try {
    Check.checkAssignment(assignment);
  } catch (error) {
    res.status(ERR_CLIENT_STATUS)
        .send({
          error: error.message,
          exception: error,
        });

    return;
  }

  Assignment.update(assignment)
      .then(async (data) => {
        const teachingOffice = (await User.findByRole(User.Role.TEACHING_OFFICE))[0];

        await Mail.sendEmailToTeachingOfficeBook(teachingOffice.email, assignment);
        res.status(OK_STATUS)
            .send({status: true});
      })
      .catch((err) => {
        res.status(ERR_SERVER_STATUS)
            .send({
              status: false,
              error: 'Prenotazione firma contratto fallita',
              exception: err.message,
            });
      });
};

/**
 * Allows to assign an assignment to a student
 * @param {Request} req
 * @param {Response} res
 */
exports.assign = (req, res) => {
  const assignment = new Assignment(req.body.assignment);

  if (assignment == null || assignment.state !== Assignment.states.BOOKED) {
    res.status(ERR_CLIENT_STATUS)
        .send({error: 'L\'incarico non può essere assegnato'});

    return;
  }

  try {
    Check.checkAssignment(assignment);
  } catch (error) {
    res.status(ERR_CLIENT_STATUS)
        .send({
          error: error.message,
          exception: error,
        });

    return;
  }

  assignment.state = Assignment.states.ASSIGNED;
  Assignment.update(assignment)
      .then(async (data) => {
        await Mail.sendEmailToStudentAssign(assignment.student, assignment.code);
        res.status(OK_STATUS)
            .send({status: true});
      })
      .catch((err) => {
        res.status(ERR_SERVER_STATUS)
            .send({
              status: false,
              error: 'Assegnamento fallito',
              exception: err.message,
            });
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
    res.status(401)
        .send({error: 'Non sei autorizzato'});

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
        res.status(OK_STATUS)
            .send({list: data});
      })
      .catch((err) => {
        res.status(ERR_SERVER_STATUS)
            .send({
              error: 'Ricerca fallita',
              exception: err.message,
            });
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

  if (assignment == null || assignment.state !== Assignment.states.WAITING || assignment.student !== user.id) {
    res.status(ERR_CLIENT_STATUS)
        .send({error: 'L\'incarico non può essere rifiutato'});

    return;
  }

  try {
    Check.checkAssignment(assignment);
  } catch (error) {
    res.status(ERR_CLIENT_STATUS)
        .send({
          error: error.message,
          exception: error,
        });

    return;
  }

  assignment.state = Assignment.states.UNASSIGNED;
  assignment.student = null;
  Assignment.update(assignment)
      .then(async (data) => {
        const teachingOffice = (await User.findByRole(User.Role.TEACHING_OFFICE))[0];

        await Mail.sendEmailToTeachingOfficeDecline(teachingOffice.email, req.id, assignment.code);
        res.status(OK_STATUS)
            .send({status: true});
      })
      .catch((err) => {
        res.status(ERR_SERVER_STATUS)
            .send({
              status: false,
              error: 'Operazione fallita',
              exception: err.message,
            });
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

  if (user.role === User.Role.TEACHING_OFFICE) {
    if (id == null || Number.parseInt(id) === NaN) {
      res.status(ERR_CLIENT_STATUS)
          .send({error: 'Id non specificato.'});

      return;
    }
    Assignment.findById(id)
        .then((data) => {
          data = data === undefined ? null : data;
          res.status(OK_STATUS)
              .send({assignment: data});
        })
        .catch((err) => {
          res.status(ERR_SERVER_STATUS)
              .send({
                error: 'Ricerca fallita',
                exception: err.message,
              });
        });
  } else if (user.role === User.Role.STUDENT) {
    Assignment.findByStudent(user.id)
        .then((assignments) => {
          const assignment = assignments.filter((el) => el.id === id);

          if (assignment.length === 1) {
            res.status(OK_STATUS)
                .send({assignment: assignment[0]});
          } else {
            res.status(OK_STATUS)
                .send({assignment: null});
          }
        })
        .catch((err) => {
          res.status(ERR_SERVER_STATUS)
              .send({
                error: 'Ricerca fallita',
                exception: err.message,
              });
        });
  } else {
    res.status(401)
        .send({error: 'Non sei autorizzato'});
  }
};

/**
 * Allows to close an assignment
 * @param {Request} req
 * @param {Response} res
 * @return {Promise}
 */
exports.close = (req, res) => {
  const assignment = new Assignment(req.body.assignment);

  if (assignment == null || assignment.state !== Assignment.states.ASSIGNED) {
    res.status(ERR_CLIENT_STATUS)
        .send({error: 'L\'incarico non può essere chiuso'});

    return;
  }

  assignment.state = Assignment.states.OVER;

  try {
    Check.checkAssignment(assignment);
  } catch (error) {
    res.status(ERR_CLIENT_STATUS)
        .send({
          error: error.message,
          exception: error,
        });

    return;
  }

  return Assignment.update(assignment)
      .then((data) => {
        res.status(OK_STATUS)
            .send({status: true});
      })
      .catch((err) => {
        res.status(ERR_SERVER_STATUS)
            .send({
              status: false,
              error: 'Chiusura dell\'incario è fallita',
              exception: err.message,
            });
      });
};
