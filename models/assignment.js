/**
 * Assignment
 *
 * This class represents a Assignment
 *
 * @author Roberto Bruno
 * @version
 * @since
 *
 * 2019 - Copyright by Gang Of Four Eyes
 */

const pool = require('../db');
// Utilities
const table = 'assignment';
const states = {
  UNASSIGNED: 'Unassigned',
  WAITING: 'Waiting',
  BOOKED: 'Booked',
  ASSIGNED: 'Assigned',
  OVER: 'Over',
};
const titles = {
  PHD: 'PhD',
  MASTER: 'Master',
};

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
  this.title = Object.values(titles).includes(assignment.title) ?
    assignment.title : null;
  this.hourly_cost = Number.isInteger(assignment.hourly_cost) ?
    assignment.hourly_cost : assignment.hourly_cost;
  this.ht_fund = assignment.ht_fund;
  this.state = Object.values(states).includes(assignment.state) ?
    assignment.state : null;
  this.note = assignment.note;
};

Assignment.titles = titles;
Assignment.states = states;

/**
 * Models Callback
 * @callback modelsCallback
 * @param err
 * @param data
 */

/**
 * Creates a new Assignment.
 * @param {Assignment} assignment The assignment to save.
 * @param {modelsCallback} result The callback that handles the response.
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
 * @param {modelsCallback} result The callback that handles the response.
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
 * @param {modelsCallback} result The callback that handles the response.
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
 * @param {modelsCallback} result The callback that handles the response.
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
 * @param {modelsCallback} result The callback that handles the response.
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
 * @param {modelsCallback} result The callback that handles the response.
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
 * @param {modelsCallback} result The callback that handles the response.
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
 * @param {modelsCallback} result The callback that handles the response.
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
        result(null, data.length > 0);
      });
};
/**
 * Search Filter definition
 * @typedef {Object} filter
 * @property {string} code
 * @property {string} noticeProtocol
 * @property {string} state
 * @property {string} student
 */

/**
 * Searches a list of assignments
 * @param {filter} filter An object specifying the search criteria.
 * @param {modelsCallback} result The callback that handles the response.
 */
Assignment.search = (filter, result) => {
  let query = `SELECT * FROM ${table} WHERE true `;
  if (filter.code) {
    query = `${query} AND code LIKE \'${filter.code}%\'`;
  }
  if (filter.noticeProtocol) {
    query = `${query} AND notice_protocol=${filter.noticeProtocol}`;
  }
  if (filter.state) {
    query = `${query} AND state=${filter.state}`;
  }
  if (filter.student) {
    query = `${query} AND student=${filter.student}`;
  }

  pool.query(query, (err, data) => {
    if (err) {
      return result(err, null);
    }
    result(null, data);
  });
};

module.exports = Assignment;
