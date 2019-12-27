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
 * @version 1.0
 *
 * @copyright 2019 - Copyright by Gang Of Four Eyes
 */
class Student extends User {
  /**
   * Student Object constructor
   * @param {Student} student
   */
  constructor(student) {
    super(student);
    this.registration_number = student.registration_number;
    this.birth_date = new Date(student.birth_date);
  }

  /**
   * Creates a new Student.
   * @param {Student} student The Student to save.
   * @return {Promise<Student>} Promise object that represents the created Student.
   */
  static create(student) {
    if (student == null) {
      throw new Error('The parameter student can not be null or undefined');
    }
    const user = new User(student);
    return super.create(user)
        .then((user) => {
          student.password = user.password;
          return pool.query(`INSERT INTO ${table} VALUES(?, ?, ?)`, [student.email, student.registration_number, student.birth_date])
              .then(([resultSetHeader]) => {
                return new Student(student);
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
    if (student == null) {
      throw new Error('The parameter student can not be null or undefined');
    }
    const user = new User(student);
    return super.update(user)
        .then((user) => {
          return pool.query(`UPDATE ${table} SET registration_number = ?, birth_date = ?  WHERE user_email = ?`, [student.registration_number, student.birth_date, student.email])
              .then(() => {
                return new Student(student);
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
    if (email == null) {
      throw new Error('The parameter email can not be null or undefined');
    }
    return User.findByEmail(email)
        .then((user) => {
          return pool.query(`SELECT * FROM ${table} WHERE user_email = ?`, email)
              .then(([rows]) => {
                if (rows.length < 1) {
                  throw new Error(`No result found: ${email}`);
                }
                user.registration_number = rows[0].registration_number;
                user.birth_date = rows[0].birth_date;
                return new Student(user);
              })
              .catch((err) => {
                throw err;
              });
        })
        .catch((err) => {
          throw err;
        });
  }
  /**
   * Finds all the Students in the db.
   * @return {Promise<Student[]>} Promise object that returns the list of Student.
   */
  static findAll() {
    return User.findByRole(User.Role.STUDENT)
        .then((users) => {
          return Promise.all(users.map((user) => {
            return this.findByEmail(user.email);
          }))
              .catch((err) => {
                throw err;
              });
        });
  }

  /**
   * Check if exists an User with the email and the password passed.
   * @param {string} email
   * @param {string} password
   * @return {Promise<Student>} Promise Object that represents the Student if there is a match or else it's null
   */
  static matchUser(email, password) {
    return super.matchUser(email, password)
        .then((user) => {
          if (user === null) {
            return null;
          }
          return this.findByEmail(user.email);
        })
        .catch((err) => {
          throw err;
        });
  }
}

module.exports = Student;
