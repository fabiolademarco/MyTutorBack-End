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
class Assignment {
  /**
 * Assignment object constructor
 * @param {Assignment} assignment
 */
  constructor(assignment) {
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
  }
  /**
   * Creates a new Assignment.
   * @param {Assignment} assignment The assignment to save.
   * @return {Promise} Promise object that represents the created Assignment.
   */
  static create(assignment) {
    if (assignment == null) {
      return null;
    }
    return pool.query(`INSERT INTO ${table} SET ? `, assignment)
        .then((data) => {
          assignment.id = data[0].insertId;
          return assignment;
        })
        .catch((err) => {
          throw err;
        });
  }
  /**
   * Updates an Assignment.
   * @param {Assignment} assignment The assignment to update.
   * @return {Promise} Promise object that represents the updated Assignment.
   */
  static update(assignment) {
    if (assignment == null) {
      return null;
    }
    return pool.query(`UPDATE ${table} SET ? WHERE id = ?`, [assignment, assignment.id])
        .then((data) => assignment)
        .catch((err) => {
          throw err;
        });
  }
  /**
   * Removes an Assignment.
   * @param {Assignment} assignment The assignment to remove.
   * @return {Promise} Promise object that represents the result of the remove.
   */
  static remove(assignment) {
    if (assignment == null) {
      return null;
    }
    return pool.query(`DELETE FROM ${table} WHERE id = ?`, assignment.id)
        .then((data) => data[0].affectedRows > 0)
        .catch((err) => {
          throw err;
        });
  }
  /**
   * Finds the assignment with the specified id.
   * @param {Number} id The id of an existing assignment.
   * @return {Promise} Promise object that represents the result of the select.
   */
  static findById(id) {
    if (id == null) {
      return null;
    }
    return pool.query(`SELECT * FROM ${table} WHERE id = ?`, id)
        .then((data) => new Assignment(data[0][0]))
        .catch((err) => {
          throw err;
        });
  }
  /**
   * Finds the assignments of the specified notice.
   * @param {string} noticeProtocol The protocol of a notice.
   * @return {Promise} Promise object that represents the result of the select.
   */
  static findByNotice(noticeProtocol) {
    if (noticeProtocol == null) {
      return null;
    }
    return pool.query(`SELECT * FROM ${table} WHERE notice_protocol = ?`, noticeProtocol)
        .then((data) => data[0].map((el) => new Assignment(el)))
        .catch((err) => {
          throw err;
        });
  }
  /**
   * Finds the assignments of a student.
   * @param {string} emailStudent The email of the student.
   * @return {Promise} Promise object that represents the result of the select.
   */
  static findByStudent(emailStudent) {
    if (emailStudent == null) {
      return null;
    }
    return pool.query(`SELECT * FROM ${table} WHERE student = ?`, emailStudent)
        .then((data) => data[0].map((i) => new Assignment(i)))
        .catch((err) => {
          throw err;
        });
  }
  /**
   * Finds all the assignments.
   * @param {modelsCallback} result The callback that handles the response.
   * @return {Promise} Promise object that represents the result of the select.
   */
  static findAll() {
    return pool.query(`SELECT * FROM ${table}`)
        .then((data) => data[0].map((a) => new Assignment(a)))
        .catch((err) => {
          throw err;
        });
  }
  /**
   * Checks if an assignment exists.
   * @param {Assignment} assignment The assignment to check.
   * @return {Promise} Promise object that represents the boolean value of the query.
   */
  static exists(assignment) {
    if (assignment == null) {
      return null;
    }
    return pool.query(`SELECT * FROM ${table} WHERE id = ?`, assignment.id)
        .then((data) => data[0].length > 0)
        .catch((err) => {
          throw err;
        });
  }
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
   * @return {Promise} Promise object that represents the result of the search.
   */
  static search(filter) {
    let query = `SELECT * FROM ${table} WHERE true `;
    const params = [];
    if (filter.code) {
      query = `${query} AND code LIKE ?`;
      params[params.length] = filter.code + '%';
    }
    if (filter.noticeProtocol) {
      query = `${query} AND notice_protocol=?`;
      params[params.length] = filter.noticeProtocol;
    }
    if (filter.state) {
      query = `${query} AND state=?`;
      params[params.length] = filter.state;
    }
    if (filter.student) {
      query = `${query} AND student=?`;
      params[params.length] = filter.student;
    }
    return pool.query(query, params)
        .then((data) => data[0].map((a) => new Assignment(a)))
        .catch((err) => {
          throw err;
        });
  }
}

Assignment.titles = titles;
Assignment.states = states;

module.exports = Assignment;
