const User = require('./userStub');
const list = [{
  email: 'c.barletta@studenti.unisa.it',
  password: 'Password123',
  name: 'Cristian',
  surname: 'Barletta',
  role: 'Student',
  verified: '1',
  registration_number: '0512105099',
  birth_date: '1900-03-03 ',
},
{
  email: 'a.lodato1@studenti.unisa.it',
  password: 'Password123',
  name: 'Antonio',
  surname: 'Lodato',
  role: 'Student',
  verified: '1',
  registration_number: '0522505121',
  birth_date: '1997-04-20 ',
},
{
  email: 'v.ventura@student.unisa.it',
  password: 'Password123',
  name: 'Vittorio',
  surname: 'Ventura',
  role: 'Student',
  verified: '1',
  registration_number: '0512105098',
  birth_date: '1900-03-03 ',
},
{
  email: 'g.francone@unisa.it',
  password: 'Password123',
  name: 'Giorgio',
  surname: 'Francone',
  role: 'Student',
  verified: '1',
  registration_number: '0512105097',
  birth_date: '1900-03-03 ',
}];

/**
 * StudentStub
 *
 * This class represents a StudentStub
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
  static create(student) {
    if (student == null) {
      throw new Error('The parameter student can not be null or undefined');
    }
    const user = new User(student);

    return new Promise((resolve) => resolve())
        .then(async () => {
          await super.create(user);
          list.push(student);

          return student;
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
    const user = new User(student);

    return new Promise((resolve) => resolve())
        .then(async () => {
          await super.update(user);
          list[list.indexOf(student)] = student;

          return student;
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
  static findByEmail(email) {
    if (email == null) {
      throw new Error('The parameter email can not be null or undefined');
    }

    return new Promise((resolve) => resolve())
        .then(async () => {
          const user = await this.findByEmail(email);

          sublist = list.filter((el) => el.email === user.email);

          return (sublist.length > 0) ? sublist[0] : null;
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
    return new Promise((resolve) => resolve())
        .then(() => list)
        .catch((err) => {
          throw err;
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

  /**
   * Finds students using a filter
   * @param {Object} filter The object containg the filter attribute.
   * @return {Promise<Student[]>} The promise representing the list of students that respect the filter.
   */
  static async search(filter) {
    filter.role = User.Role.STUDENT;
    let users;

    try {
      users = await super.search(filter);
    } catch (err) {
      console.log(err);
    }

    return Promise.all(users.map((u) => this.findByEmail(u.email)))
        .then((students) => students.map((s) => new Student(s)))
        .catch((err) => {
          console.log(err);
          throw err;
        });
  }
  /**
   *
   * @param {Studente} student
   * @return {Promise<boolean>} The promise returns a boolean value
   */
  static exists(student) {
    return new Promise((resolve) => resolve())
        .then(() => {
          return list.filter((el) => el.email === student.email).length > 0;
        })
        .catch((err) => {
          throw err;
        });
  }
}

module.exports = Student;
