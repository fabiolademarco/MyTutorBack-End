const Role = {
  STUDENT: 'Student',
  PROFESSOR: 'Professor',
  DDI: 'DDI',
  TEACHING_OFFICE: 'Teaching Office',
};

const stubStudentList = [
  {
    email: 'c.barletta@studenti.unisa.it',
    password: 'password123',
    name: 'Cristian',
    surname: 'Barletta',
    role: 'Student',
    verified: '1',
  },
  {
    email: 'v.ventura@student.unisa.it',
    password: 'password123',
    name: 'Vittorio',
    surname: 'Ventura',
    role: 'Student',
    verified: '1',
  },
  {
    email: 'g.francone@unisa.it',
    password: 'password123',
    name: 'Giorgio',
    surname: 'Francone',
    role: 'Student',
    verified: '1',
  },
];

const stubProfessorList = [{
  email: 'u.vaccaro@unisa.it',
  password: 'password123',
  name: 'Ugo',
  surname: 'Vaccaro',
  role: 'Professor',
  verified: '1',
},
{
  email: 'alberto@unisa.it',
  password: 'password123',
  name: 'Alberto',
  surname: 'Negro',
  role: 'Professor',
  verified: '1',
},
{
  email: 'cattaneo@unisa.it',
  password: 'password123',
  name: 'Pippo',
  surname: 'Cattaneo',
  role: 'Professor',
  verified: '1',
}];

/**
 * User
 *
 * This class represents an User Stub
 * @author Giannandrea Vicidomini
 *
 * @copyright 2019 - Copyright by Gang Of Four Eyes
 */
class User {
  /**
 * User object constructor
 * @param {User} user The js object containing the fields needed to create User object
 */
  constructor(user) {
    this.email = user.email,
    this.password = user.password,
    this.name = user.name,
    this.surname = user.surname,
    this.role = user.role,
    this.verified = user.verified;
  }

  /** Creates an user
   * @param {User} user The user to create
   * @return {Promise<User>} The promise reresenting the fulfillment of the creation request
   */
  static create(user) {
    if (user===null || user===undefined) {
      throw new Error('User must not be null');
    }
    return new Promise()
        .then(() => user)
        .catch((err) => err.message);
  }
  /** Updates an user
   * @param {User} user The user to update
   * @return {Promise<User>} The promise reresenting the fulfillment of the update request
   */
  static async update(user) {
    if (user===null || user===undefined) {
      throw new Error('User must not be null');
    }
    return new Promise()
        .then(() => user)
        .catch((err) => {
          throw err.message;
        });
  }

  /** Removes an user
   * @param {User} user The user to remove
   * @return {Promise<boolean>} The promise reresenting the fulfillment of the deletion request
   */
  static remove(user) {
    if (user===null || user===undefined) {
      throw new Error('User must not be null');
    }
    return new Promise()
        .then(() => true)
        .catch((err) => {
          throw err.message;
        });
  }
  /** Checks if a given user exists
   * @param {User} user The user whose existence is checked
   * @return {Promise<boolean>} The promise reresenting the fulfillment of the verification request
   */
  static exists(user) {
    if (user===null || user===undefined) {
      throw new Error('User must not be null');
    }
    return new Promise()
        .then(() => {
          const emails = stubStudentList.concat(stubProfessorList).map((el) => el.email);
          return emails.includes(user.email);
        })
        .catch((err) => {
          throw err.message;
        });
  }
  /** Finds user by email
   * @param {string} email The email used to find the user
   * @return {Promise<User>} The promise reresenting the fulfillment of the search request
   */
  static findByEmail(email) {
    if (email===null || email===undefined) {
      throw new Error('email must not be null');
    }
    return new Promise() // Che user dovrebbe tornare?
        .then(() => {
          const list = stubProfessorList.concat(stubStudentList);
          list = list.filter((u) => u.email === email);
          return (list.length > 0) ? newUser(list[0]) : null;
        })
        .catch((err) => {
          throw err.message;
        });
  }
  /** Finds users by role
   * @param {string} role The role used to find the user
   * @return {Promise<User[]>} The promise reresenting the fulfillment of the search request
   */
  static findByRole(role) {
    if (role===null || role===undefined) {
      throw new Error('role must not be null');
    }

    return new Promise()
        .then(() => (role == User.Role.STUDENT) ? stubStudentList : stubProfessorList)
        .catch((err) => {
          throw err.message;
        });
  }
  /** Finds user by verified
   * @param {string} verified The state used to find the user
   * @return {Promise<User[]>} The promise reresenting the fulfillment of the search request
   */
  static findByVerified(verified) {
    if (verified===null || verified===undefined) {
      throw new Error('verified status must not be null');
    }

    return new Promise()
        .then(() => stubProfessorList.concat(stubStudentList))
        .catch((err) => {
          throw err.message;
        });
  }

  /**
   * Finds all users in the database
   * @return {Promise<User[]>} The promise reresenting the fulfillment of the creation request
  */
  static findAll() {
    return new Promise()
        .then(() => stubProfessorList.concat(stubStudentList))
        .catch((err) => {
          throw err.message;
        });
  }

  /** Finds user by parameter
   * @param {Object} filter The object containing the logic to use for the search
   * @return {Promise<User[]>} The promise reresenting the fulfillment of the search request
   */
  static search(filter) {
    const query=`SELECT * FROM ${table} WHERE true`;
    const params=[];

    if (filter.password) {
      query =`${query} AND password = ?`;
      params.push(filter.password);
    }
    if (filter.name) {
      query =`${query} AND name = ?`;
      params.push(filter.name);
    }

    if (filter.surname) {
      query =`${query} AND surname = ?`;
      params.push(filter.surname);
    }
    if (filter.role) {
      query =`${query} AND role = ?`;
      params.push(filter.role);
    }
    if (filter.verified) {
      query =`${query} AND verified = ?`;
      params.push(filter.verified);
    }

    return pool.query(query, params)
        .then(([rows])=>{
          return rows.map((user)=>new User(user));
        })
        .catch((err)=>{
          throw err;
        });
  }
  /**
   * Check if exists an User with the email and the password passed.
   * @param {string} email The user email.
   * @param {string} password The password encrypted.
   * @return {Promise<User>} Promise Object that represents the User if there is a match or else it's null.
   */
  static matchUser(email, password) {
    if (email == null || password == null) {
      throw new Error('Email or Password can not be null or undefined');
    }
    return new Promise()
        .then(() => {
          const list = stubProfessorList.concat(stubStudentList);
          list = list.filter((u) => u.email === email && u.password === password);
          return (list.length > 0) ? newUser(list[0]) : null;
        })
        .catch((err) => {
          throw err.message;
        });
  }
}

User.Role = Role;

module.exports=User;

