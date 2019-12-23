const pool = require('../db');
const table = 'user';
const role = {
  STUDENT: 'Student',
  PROFESSOR: 'Professor',
  DDI: 'DDI',
  TEACHING_OFFICE: 'Teaching Office',
};

/*
+create(u : Utente): Utente
+update(u : Utente): Utente
+remove(u : Utente): boolean
+exists(u : Utente): boolean
+findByEmail(email : string): Utente
+findByRuolo(ruolo : int): List<Utente>
+findByVerificato(verificato : boolean): List<Utente>
+findAll(): List<Utente>
*/

/**
 * User
 *
 * This class represents an User
 * @author Giannandrea Vicidomini
 * @version
 * @since
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
   * @return {Promise} The promise reresenting the fulfillment of the creation request
   */
  static create(user) {
    if (user===null || user===undefined) {
      throw new Error('User must not be null');
    }
    return pool.query(`INSERT INTO ${table} SET ?`, user )
        .then((data)=>{
          return new User(user);
        })
        .catch((err)=>{
          throw err;
        });
  }
  /** Updates an user
   * @param {User} user The user to update
   * @return {Promise} The promise reresenting the fulfillment of the update request
   */
  static update(user) {
    if (user===null || user===undefined) {
      throw new Error('User must not be null');
    }

    return pool.query(`UPDATE ${table} SET ? WHERE email=?`, [user, user.email])
        .then((data)=>{
          return new User(user);
        })
        .catch((err)=>{
          throw err;
        });
  }

  /** Removes an user
   * @param {User} user The user to remove
   * @return {Promise} The promise reresenting the fulfillment of the deletion request
   */
  static remove(user) {
    if (user===null || user===undefined) {
      throw new Error('User must not be null');
    }

    return pool.query(`DELETE FROM ${table} WHERE email=?`, user.email)
        .then(([resultSetHeader])=> resultSetHeader.affectedRows>0)
        .then((err)=> {
          throw err;
        });
  }
  /** Checks if a given user exists
   * @param {User} user The user whose existence is checked
   * @return {Promise} The promise reresenting the fulfillment of the verification request
   */
  static exists(user) {
    if (user===null || user===undefined) {
      throw new Error('User must not be null');
    }

    return pool.query(`SELECT * FROM ${table} WHERE email=?`, user.email)
        .then(([rows])=> rows.length>0)
        .catch((err)=>{
          throw err;
        });
  }
  /** Finds user by email
   * @param {string} email The email used to find the user
   * @return {Promise} The promise reresenting the fulfillment of the search request
   */
  static findByEmail(email) {
    if (email===null || email===undefined) {
      throw new Error('email must not be null');
    }

    return pool.query(`SELECT * FROM ${table} WHERE email=?`, email)
        .then(([rows])=>{
          return (rows[0] === undefined)?rows:new User(rows[0]);
        })
        .catch((err)=>{
          throw err;
        });
  }
  /** Finds users by role
   * @param {string} role The role used to find the user
   * @return {Promise} The promise reresenting the fulfillment of the search request
   */
  static findByRole(role) {
    if (role===null || role===undefined) {
      throw new Error('role must not be null');
    }

    return pool.query(`SELECT * FROM ${table} WHERE role=?`, role)
        .then(([rows])=>{
          return rows.map((u) => new User(u));
        })
        .catch((err)=>{
          throw err;
        });
  }
  /** Finds user by verified
   * @param {string} verified The state used to find the user
   * @return {Promise} The promise reresenting the fulfillment of the search request
   */
  static findByVerified(verified) {
    if (verified===null || verified===undefined) {
      throw new Error('verified status must not be null');
    }

    return pool.query(`SELECT * FROM ${table} WHERE verified=?`, role)
        .then(([rows])=>{
          return rows.map((user)=>new User(user));
        })
        .catch((err)=>{
          throw err;
        });
  }

  /**
   * Finds all users in the database
   * @return {Promise} The promise reresenting the fulfillment of the creation request
  */
  static findAll() {
    return pool.query(`SELECT * FROM ${table}`)
        .then(([rows])=>{
          return rows.map((user)=>new User(user));
        })
        .catch((err)=>{
          throw err;
        });
  }
}

User.Role = role;

module.exports=User;

