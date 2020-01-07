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
    this.birth_date = student.birth_date;
  }

  /**
   * Creates a new Student.
   * @param {Student} student The Student to save.
   * @return {Promise<Student>} Promise object that represents the created Student.
   */
  static async create(student) {
    if (student == null) {
      throw new Error('The parameter student can not be null or undefined');
    }
    const user = new User(student);

    return super.create(user)
        .then(async (user) => {
          student.password = user.password;
          await pool.query(`INSERT INTO ${table} VALUES(?, ?, ?)`, [student.email, student.registration_number, student.birth_date]);

          return new Student(student);
        })
        .catch((err) => {
          throw err;
        });
  }

  /**
   * Updates a Student.
   * @param {Student} student The Student to update.
   * @return {Promise<Student>} Promise Object that represents the updated Student.
   */
  static async update(student) {
    if (student == null) {
      throw new Error('The parameter student can not be null or undefined');
    }
    if (!await this.exists(student)) {
      throw new Error('The student doesn\'t exist');
    }
    const user = new User(student);

    return super.update(user)
        .then((user) => {
          return pool.query(`UPDATE ${table} SET registration_number = ?, birth_date = ?  WHERE user_email = ?`, [student.registration_number, student.birth_date, student.email])
              .then(() => {
                return new Student(student);
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
   * Finds the Student with the given email.
   * @param {string} email The email of a Student.
   * @return {Promise<Student>} Promise object that represents the Student with the given email.
   */
  static async findByEmail(email) {
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
  static async findAll() {
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
  static async matchUser(email, password) {
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

  /**
   * Finds students using a filter
   * @param {Object} filter The object containg the filter attribute.
   * @return {Promise<Student[]>} The promise representing the list of students that respect the filter.
   */
  static async search(filter) {
    filter.role = User.Role.STUDENT;
    const users = await super.search(filter);

    return Promise.all(users.map((u) => this.findByEmail(u.email)))
        .then((students) => students.map((s) => new Student(s)))
        .catch((err) => {
          throw err;
        });
  }
}

module.exports = Student;
