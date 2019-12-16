const pool = require('../db');
// Utilities
const states = ['Unassigned', 'Waiting', 'Booked', 'Assigned', 'Over'];
const titles = ['PhD', 'Master'];
const table = 'assignment';

// Assignment object constructor
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

Assignment.create = (assignment, result) => {
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

Assignment.update = (assignment, result) => {
  pool.query(`UPDATE ${table} SET ? WHERE id = ${assignment.id}`,
      assignment,
      (err, data) => {
        if (err) {
          return result(err, null);
        }
        result(null, assignment);
      });
};

Assignment.remove = (assignment, result) => {
  pool.query(`DELETE FROM ${table} WHERE id = ?`,
      assignment.id,
      (err, data) => {
        if (err) {
          return result(err, null);
        }
        result(null, data.affectedRows > 0);
      });
};

Assignment.findById = (id, result) => {
  pool.query(`SELECT * FROM ${table} WHERE id = ?`, id, (err, data) => {
    if (err) {
      return result(err, null);
    }
    result(null, data[0]);
  });
};

Assignment.findByNotice = (noticeProtocol, result) => {
  pool.query(`SELECT * FROM ${table} WHERE notice_protocol = ?`,
      noticeProtocol,
      (err, data) => {
        if (err) {
          return result(err, null);
        }
        result(null, data);
      });
};

Assignment.findByStudent = (emailStudent, result) => {
  pool.query(`SELECT * FROM ${table} WHERE student = ?`,
      emailStudent,
      (err, data) => {
        if (err) {
          return result(err, null);
        }
        result(null, data);
      });
};

Assignment.findAll = (result) => {
  pool.query(`SELECT * FROM ${table}`, (err, data) => {
    if (err) {
      return result(err, null);
    }
    result(null, data);
  });
};

Assignment.exists = (assignment, result) => {
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

