/**
 * AssignmentControl
 *
 * This class represents the Assignment Controller
 *
 * @author Roberto Bruno
 * @version
 * @since
 *
 * 2019 - Copyright by Gang Of Four Eyes
 */
const Assignment = require('../models/assignment');
const OK_STATUS = 200;
const ERR_CLIENT_STATUS = 412;
const ERR_SERVER_STATUS = 500;
// Bisogna definire l'autenticazione ed l'invio delle email

/**
 * Allows to send a request of an assignment
 * @param {Request} req
 * @param {Response} res
 */
exports.sendRequest = (req, res) => {
  res.set('Content-Type', 'application/json');
  const assignment = new Assignment(req.body);
  const emailStudent = req.param('emailStudent', null);
  // Bisogna  controllare che esista anche lo studente
  // e forse che sia in graduatoria

  if (emailStudent === null || assignment == null) {
    res.status(ERR_CLIENT_STATUS);
    res.send(new Error('Non è stato specificato lo studente o l\'incarico'));
    return;
  }
  assignment.student = emailStudent;
  assignment.state = Assignment.states.WAITING;
  Assignment.update(assignment, (err, data) => {
    if (err) {
      res.status(ERR_SERVER_STATUS).send(new Error('Aggiornamento fallito'));
      return;
    }
    res.status(OK_STATUS).send(data);
    // Inviare email
  });
};

/**
 * Allows to book the firm for an assignment
 * @param {Request} req
 * @param {Response} res
 */

exports.book = (req, res) => {
  res.set('Content-Type', 'application/json');
  const assignment = new Assignment(req.body);

  if (assignment === null || assignment.state !== Assignment.states.WAITING) {
    res.status(ERR_CLIENT_STATUS);
    res.send(new Error('L\'incarico non può essere prenotato'));
    return;
  }
  assignment.state = Assignment.states.BOOKED;
  Assignment.update(assignment, (err, data) => {
    if (err) {
      res.status(ERR_SERVER_STATUS).send(false);
      return;
    }
    res.status(OK_STATUS).send(true);
    // Inviare email
  });
};

/**
 * Allows to assign an assignment to a student
 * @param {Request} req
 * @param {Response} res
 */

exports.assign = (req, res) => {
  res.set('Content-Type', 'application/json');
  const assignment = new Assignment(req.body);

  if (assignment.state !== Assignment.states.BOOKED) {
    res.status(ERR_CLIENT_STATUS)
        .send(new Error('L\'incarico non può essere assegnato'));
    return;
  }
  assignment.state = Assignment.states.BOOKED;
  Assignment.update(assignment, (err, data) => {
    if (err) {
      res.status(ERR_SERVER_STATUS).send(false);
      return;
    }
    res.status(OK_STATUS).send(true);
    // Inviare email
  });
};

/**
 * Return a list of assignments, that respect the filter criteria
 * @param {Request} req
 * @param {Response} res
 */
exports.search = (req, res) => {
  res.set('Content-Type', 'application/json');
  const filter = {
    code: req.query.code,
    noticeProtocol: req.query.noticeProtocol,
    state: req.query.state,
    student: req.query.student,
  };
  Assignment.search(filter, (err, data) => {
    if (err) {
      res.status(ERR_SERVER_STATUS).send(err);
      return;
    }
    res.status(OK_STATUS).send(data);
  });
};

/**
 * Allows to decline the request of an assignment
 * @param {Request} req
 * @param {Response} res
 */
exports.decline = (req, res) => {
  res.set('Content-Type', 'application/json');
  const assignment = new Assignment(req.body);

  if (assignment === null || assignment.state !== Assignment.states.WAITING) {
    res.status(ERR_CLIENT_STATUS)
        .send(new Error('L\'incarico non può essere rifiutato'));
    return;
  }
  assignment.state = Assignment.states.UNASSIGNED;
  assignment.student = null;
  Assignment.update(assignment, (err, data) => {
    if (err) {
      res.status(ERR_SERVER_STATUS).send(false);
      return;
    }
    res.status(OK_STATUS).send(true);
    // Inviare email
  });
};

/**
 * Finds an assignment
 * @param {Request} req
 * @param {Response} res
 */

exports.find = (req, res) => {
  res.set('Content-Type', 'application/json');
  const id = req.query.id;
  if (id === null || !Number.isInteger(id)) {
    res.status(ERR_CLIENT_STATUS).send(new Error('Id non passato'));
    return null;
  }
  Assignment.findById(id, (err, data) => {
    if (err) {
      res.status(ERR_SERVER_STATUS).send(err);
      return null;
    }
    res.status(OK_STATUS).send(data);
    return data;
  });
};

/**
 * Allows to close an assignment
 * @param {Request} req
 * @param {Response} res
 */
exports.close = (req, res) => {
  res.set('Content-Type', 'application/json');
  const assignment = new Assignment(req.body);

  if (assignment === null || assignment.state !== Assignment.states.ASSIGNED) {
    res.status(ERR_CLIENT_STATUS)
        .send(new Error('L\'incarico non può essere chiuso'));
    return;
  }
  assignment.state = Assignment.states.OVER;
  Assignment.update(assignment, (err, data) => {
    if (err) {
      res.status(ERR_SERVER_STATUS).send(false);
      return;
    }
    res.status(OK_STATUS).send(true);
  });
};


