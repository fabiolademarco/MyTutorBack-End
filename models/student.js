const pool = require('../db');
const User = require('./user');
// Utilities
const table = 'student';

/**
 * Student
 *
 * This class represents a Student
 *
 * @author Roberto Bruno
 * @version
 * @since
 *
 * 2019 - Copyright by Gang Of Four Eyes
 */
class Student extends User {
  /**
   * Student Object constructor
   * @param {Student} student
   */
  constructor(student) {
    super(student);
    this.registration_number = student.registration_number;
    this.birth_date = student.birth_date;
  }

  /**
   * Creates a new Student.
   * @param {Student} student The Student to save.
   * @return {Promise<Student>} Promise object that represents the created Student.
   */
  static create(student) {
    if (student === null || student === undefined) {
      throw new Error('No parameters');
    }
    return User.create(student)
        .then((student) => {
          return pool.query(`INSERT INTO ${table} SET ?`, [student.email, student])
              .then(([resultSetHeader]) => {
                return student;
              })
              .catch((err) => {
                throw err.message;
              });
        })
        .catch((err) => {
          throw err.message;
        });
  }

  /**
   * Updates a Student.
   * @param {Student} student The Student to update.
   * @return {Promise<Student>} Promise Object that represents the updated Student.
   */
  static update(student) {
    if (student === null || student === undefined) {
      throw new Error('No parameters');
    }
    return User.update(student)
        .then((user) => {
          return pool.query(`UPDATE ${table} SET ? WHERE user_mail = ?`, [student, student.email])
              .then(([resultSetHeader]) => {
                return student;
              })
              .catch((err) => {
                throw err.message;
              });
        })
        .catch((err) => {
          throw err.message;
        });
  }

  /**
   * Finds the Student with the given email.
   * @param {string} email The email of a Student.
   * @return {Promise<Student>} Promise object that represents the Student with the given email.
   */
  static findByEmail(email) {
    if (email === null || email === undefined) {
      throw new Error('No email passed');
    }
    return User.findByEmail(email)
        .then((user) => {
          return pool.query(`SELECT * FROM ${table} WHERE user_mail = ?`, email)
              .then(([rows]) => {
                if (rows.length < 1) {
                  throw new Error(`No result found: ${email}`);
                }
                user.registration_number = rows[0].registration_number;
                user.birth_date = rows[0].birth_date;
                return new Student(user);
              })
              .catch((err) => {
                throw err.message;
              });
        })
        .catch((err) => {
          throw err.message;
        });
  }
  /**
   * Finds all the Students in the db.
   * @return {Promise<Student[]>} Promise object that returns the list of Student.
   */
  static findAll() {
    return User.findByRole(User.STUDENT)
        .then((users) => {
          return Promise.all(users.map((user) => {
            return this.findByEmail(user.email);
          }))
              .catch((err) => {
                throw err.message;
              });
        });
  }
}

module.exports = Student;
