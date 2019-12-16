const pool = require('../db');
// Utilities
const states = ['Unassigned', 'Waiting', 'Booked', 'Assigned', 'Over'];
const titles = ['PhD', 'Master'];
const table = 'assignment';

/**
 * Assignment object constructor
 * @param {Assignment} assignment
 */
const Assignment = function(assignment) {
  this.id = assignment.id;
  this.notice_protocol = assignment.notice_protocol;
  this.student = assignment.student === undefined ? null : assignment.student;
  this.code = assignment.code;
  this.activity_description = assignment.activity_description;
  this.total_number_hours = Number.isInteger(assignment.total_number_hours) ?
    assignment.total_number_hours : null;
  this.title = titles.includes(assignment.title) ? assignment.title : null;
  this.hourly_cost = Number.isInteger(assignment.hourly_cost) ?
    assignment.hourly_cost : assignment.hourly_cost;
  this.ht_fund = assignment.ht_fund;
  this.state = states.includes(assignment.state) ? assignment.state : null;
  this.note = assignment.note;
};

/**
 * Creates a new Assignment.
 * @param {Assignment} assignment The assignment to save.
 * @param {callback} result The callback that handle the response.
 * @return {void}
 */
Assignment.create = (assignment, result) => {
  if (assignment == null) {
    return result(new Error('Parametro passato nullo'), null);
  }
  pool.query(`INSERT INTO ${table} SET ? `,
      assignment,
      (err, data) => {
        if (err) {
          return result(err, null);
        }
        assignment.id = data.insertId;
        result(null, assignment);
      });
};

/**
 * Updates an Assignment.
 * @param {Assignment} assignment The assignment to update.
 * @param {callback} result The callback that handle the response.
 * @return {void}
 */
Assignment.update = (assignment, result) => {
  if (assignment == null) {
    return result(new Error('Parametro passato nullo'), null);
  }
  pool.query(`UPDATE ${table} SET ? WHERE id = ${assignment.id}`,
      assignment,
      (err, data) => {
        if (err) {
          return result(err, null);
        }
        result(null, assignment);
      });
};

/**
 * Removes an Assignment.
 * @param {Assignment} assignment The assignment to remove.
 * @param {callback} result The callback that handle the response.
 * @return {void}
 */
Assignment.remove = (assignment, result) => {
  if (assignment == null) {
    return result(new Error('Parametro passato nullo'), null);
  }
  pool.query(`DELETE FROM ${table} WHERE id = ?`,
      assignment.id,
      (err, data) => {
        if (err) {
          return result(err, null);
        }
        result(null, data.affectedRows > 0);
      });
};

/**
 * Finds the assignment with the specified id.
 * @param {Number} id The id of an existing assignment.
 * @param {callback} result The callback that handle the response.
 * @return {void}
 */
Assignment.findById = (id, result) => {
  if (id == null) {
    return result(new Error('Parametro passato nullo'), null);
  }
  pool.query(`SELECT * FROM ${table} WHERE id = ?`, id, (err, data) => {
    if (err) {
      return result(err, null);
    }
    result(null, data[0]);
  });
};

/**
 * Finds the assignments of the specified notice.
 * @param {string} noticeProtocol The protocol of a notice.
 * @param {callback} result The callback that handle the response.
 * @return {void}
 */
Assignment.findByNotice = (noticeProtocol, result) => {
  if (noticeProtocol == null) {
    return result(new Error('Parametro passato nullo'), null);
  }
  pool.query(`SELECT * FROM ${table} WHERE notice_protocol = ?`,
      noticeProtocol,
      (err, data) => {
        if (err) {
          return result(err, null);
        }
        result(null, data);
      });
};

/**
 * Finds the assignments of a student.
 * @param {string} emailStudent The email of the student.
 * @param {callback} result The callback that handle the response.
 * @return {void}
 */
Assignment.findByStudent = (emailStudent, result) => {
  if (emailStudent == null) {
    return result(new Error('Parametro passato nullo'), null);
  }
  pool.query(`SELECT * FROM ${table} WHERE student = ?`,
      emailStudent,
      (err, data) => {
        if (err) {
          return result(err, null);
        }
        result(null, data);
      });
};

/**
 * Finds all the assignments.
 * @param {callback} result The callback that handle the response.
 * @return {void}
 */
Assignment.findAll = (result) => {
  pool.query(`SELECT * FROM ${table}`, (err, data) => {
    if (err) {
      return result(err, null);
    }
    result(null, data);
  });
};

/**
 * Checks if an assignment exists.
 * @param {Assignment} assignment The assignment to check.
 * @param {callback} result The callback that handle the response.
 * @return {void}
 */
Assignment.exists = (assignment, result) => {
  if (assignment == null) {
    return result(new Error('Parametro passato nullo'), null);
  }
  pool.query(`SELECT * FROM ${table} WHERE id = ?`,
      assignment.id,
      (err, data) => {
        if (err) {
          return result(err, null);
        }
        console.log(data);
        result(null, data.length > 0);
      });
};

module.exports = Assignment;

