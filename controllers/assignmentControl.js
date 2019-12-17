const Assignment = require('../models/assignment');

// Bisogna definire l'autenticazione ed l'invio delle email

/**
 * Allows to send a request of an assignment
 * @param {Request} req
 * @param {Response} res
 */
exports.sendRequest = (req, res) => {
  const assignment = new Assignment(req.body);
  const emailStudent = req.param('emailStudent', null);

  // Bisogna  controllare che esista anche lo studente
  // e forse che sia in graduatoria

  if (emailStudent === null || assignment == null) {
    res.send(new Error('Non è stato specificato lo studente o l\'incarico'));
    return;
  }
  assignment.student = emailStudent;
  assignment.state = Assignment.states.WAITING;
  Assignment.update(assignment, (err, data) => {
    if (err) {
      res.send(new Error('Aggiornamento fallito'));
      return;
    }
    res.send(data);
    // Inviare email
  });
};

/**
 * Allows to book the firm for an assignment
 * @param {Request} req
 * @param {Response} res
 */

exports.book = (req, res) => {
  const assignment = new Assignment(req.body);

  if (assignment === null || assignment.state !== Assignment.states.WAITING) {
    res.send(new Error('L\'incarico non può essere prenotato'));
    return;
  }
  assignment.state = Assignment.states.BOOKED;
  Assignment.update(assignment, (err, data) => {
    if (err) {
      res.send(false);
      return;
    }
    res.send(true);
    // Inviare email
  });
};

/**
 * Allows to assign an assignment to a student
 * @param {Request} req
 * @param {Response} res
 */

exports.assign = (req, res) => {
  const assignment = new Assignment(req.body);

  if (assignment.state !== Assignment.states.BOOKED) {
    res.send(new Error('L\'incarico non può essere assegnato'));
    return;
  }
  assignment.state = Assignment.states.BOOKED;
  Assignment.update(assignment, (err, data) => {
    if (err) {
      res.send(false);
      return;
    }
    res.send(true);
    // Inviare email
  });
};

/**
 * Return a list of assignments, that respect the filter criteria
 * @param {Request} req
 * @param {Response} res
 */
exports.search = (req, res) => {
  const filter = {
    code: req.param('code', undefined),
    noticeProtocol: req.param('noticeProtocol', undefined),
    state: req.param('state', undefined),
    student: req.param('studente', undefined),
  };
  Assignment.search(filter, (err, data) => {
    if (err) {
      res.send(err);
      return;
    }
    res.send(data);
  });
};

/**
 * Allows to decline the request of an assignment
 * @param {Request} req
 * @param {Response} res
 */
exports.decline = (req, res) => {
  const assignment = new Assignment(req.body);

  if (assignment === null || assignment.state !== Assignment.states.WAITING) {
    res.send(new Error('L\'incarico non può essere rifiutato'));
    return;
  }
  assignment.state = Assignment.states.UNASSIGNED;
  assignment.student = null;
  Assignment.update(assignment, (err, data) => {
    if (err) {
      res.send(false);
      return;
    }
    res.send(true);
    // Inviare email
  });
};

/**
 * Finds an assignment
 * @param {Request} req
 * @param {Response} res
 */

exports.find = (req, res) => {
  const id = req.param('id', null);
  if (id === null || !Number.isInteger(id)) {
    res.send(new Error('Id non passato'));
    return null;
  }
  Assignment.findById(id, (err, data) => {
    if (err) {
      res.send(err);
      return null;
    }
    res.send(data);
    return data;
  });
};

/**
 * Allows to close an assignment
 * @param {Request} req
 * @param {Response} res
 */
exports.close = (req, res) => {
  const assignment = new Assignment(req.body);

  if (assignment === null || assignment.state !== Assignment.states.ASSIGNED) {
    res.send(new Error('L\'incarico non può essere chiuso'));
    return;
  }
  assignment.state = Assignment.states.OVER;
  Assignment.update(assignment, (err, data) => {
    if (err) {
      res.send(false);
      return;
    }
    res.send(true);
  });
};


