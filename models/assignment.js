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
 *
 * @copyright 2019 - Copyright by Gang Of Four Eyes
 */
class Assignment {
  /**
 * Assignment object constructor
 * @param {Assignment} assignment The JS object that contains field for setting new Assignment object
 */
  constructor(assignment) {
    this.id = assignment.id;
    this.notice_protocol = assignment.notice_protocol;
    this.student = assignment.student == undefined ? null : assignment.student;
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
   * @return {Promise<Assignment>} Promise object that represents the created Assignment.
   */
  static create(assignment) {
    if (assignment == null) {
      throw new Error('No Parameters');
    }
    return pool.query(`INSERT INTO ${table} SET ? `, assignment)
        .then(([resultSetHeader]) => {
          assignment.id = resultSetHeader.insertId;
          return assignment;
        })
        .catch((err) => {
          throw err.message;
        });
  }
  /**
   * Updates an Assignment.
   * @param {Assignment} assignment The assignment to update.
   * @return {Promise<Assignment>} Promise object that represents the updated Assignment.
   */
  static async update(assignment) {
    if (assignment == null) {
      throw new Error('No Parameters');
    }
    exist = await this.exists(assignment);
    if (!exist) {
      throw new Error('The assignment doesn\'t exists');
    }
    return pool.query(`UPDATE ${table} SET ? WHERE id = ?`, [assignment, assignment.id])
        .then(([resultSetHeader]) => assignment)
        .catch((err) => {
          throw err.message;
        });
  }
  /**
   * Removes an Assignment.
   * @param {Assignment} assignment The assignment to remove.
   * @return {Promise<boolean>} Promise that is true if the removal went right else it's false.
   */
  static remove(assignment) {
    if (assignment == null) {
      throw new Error('No Parameters');
    }
    return pool.query(`DELETE FROM ${table} WHERE id = ?`, assignment.id)
        .then(([resultSetHeader]) => resultSetHeader.affectedRows > 0)
        .catch((err) => {
          throw err.message;
        });
  }
  /**
   * Finds the assignment with the specified id.
   * @param {Number} id The id of an existing assignment.
   * @return {Promise<Assignment>} Promise object that represents the assignment having the passed id.
   */
  static findById(id) {
    if (id == null) {
      throw new Error('No Parameters');
    }
    return pool.query(`SELECT * FROM ${table} WHERE id = ?`, id)
        .then(([rows]) => {
          if (rows.length < 1) {
            throw new Error(`No result found: ${id}`);
          }
          return new Assignment(rows[0]);
        })
        .catch((err) => {
          throw err.message;
        });
  }
  /**
   * Finds the assignments of the specified notice.
   * @param {string} noticeProtocol The protocol of a notice.
   * @return {Promise<Assignment[]>} Promise that represents the Assignments related to the passed Notice protocol.
   */
  static findByNotice(noticeProtocol) {
    if (noticeProtocol == null) {
      throw new Error('No Parameters');
    }
    return pool.query(`SELECT * FROM ${table} WHERE notice_protocol = ?`, noticeProtocol)
        .then(([rows]) => rows.map((el) => new Assignment(el)))
        .catch((err) => {
          throw err.message;
        });
  }
  /**
   * Finds the assignments of a student.
   * @param {string} emailStudent The email of the student.
   * @return {Promise<Assignment[]>} Promise that represents the Assignments related to the passed email Student.
   */
  static findByStudent(emailStudent) {
    if (emailStudent == null) {
      throw new Error('No Parameters');
    }
    return pool.query(`SELECT * FROM ${table} WHERE student = ?`, emailStudent)
        .then(([rows]) => rows.map((i) => new Assignment(i)))
        .catch((err) => {
          throw err.message;
        });
  }
  /**
   * Finds all the assignments.
   * @return {Promise<Assignment[]>} Promise that represents the list of all Assignments.
   */
  static findAll() {
    return pool.query(`SELECT * FROM ${table}`)
        .then(([rows]) => rows.map((a) => new Assignment(a)))
        .catch((err) => {
          throw err.message;
        });
  }
  /**
   * Checks if an assignment exists.
   * @param {Assignment} assignment The assignment to check.
   * @return {Promise<boolean>} Promise that is true if the assignment is in the db, else it's false.
   */
  static exists(assignment) {
    if (assignment == null) {
      throw new Error('No parameters');
    }
    return pool.query(`SELECT * FROM ${table} WHERE id = ?`, assignment.id)
        .then(([rows]) => rows.length > 0)
        .catch((err) => {
          throw err.message;
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
   * @return {Promise<Assignment[]>} Promise that represents the list of Assignments which respects the search criteria.
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
        .then(([rows]) => rows.map((a) => new Assignment(a)))
        .catch((err) => {
          throw err;
        });
  }
}

Assignment.titles = titles;
Assignment.states = states;

module.exports = Assignment;
