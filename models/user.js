const pool = require('../db');
const table = 'user';


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
    this.passwors = user.password,
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
  }
  /** Updates an user
   * @param {User} user The user to uodate
   * @return {Promise} The promise reresenting the fulfillment of the update request
   */
  static update(user) {
  }
  /** Removes an user
   * @param {User} user The user to remove
   * @return {Promise} The promise reresenting the fulfillment of the deletion request
   */
  static remove(user) {
  }
  /** Checks if a given user exists
   * @param {User} user The user whose existence is checked
   * @return {Promise} The promise reresenting the fulfillment of the verification request
   */
  static exists(user) {
  }
  /** Finds user by email
   * @param {string} email The email used to find the user
   * @return {Promise} The promise reresenting the fulfillment of the search request
   */
  static findByEmail(email) {
  }
  /** Finds user by role
   * @param {string} role The role used to find the user
   * @return {Promise} The promise reresenting the fulfillment of the search request
   */
  static findByRole(role) {
  }
  /** Finds user by verified
   * @param {string} verified The state used to find the user
   * @return {Promise} The promise reresenting the fulfillment of the search request
   */
  static findByVerified(verified) {
  }

  /**
   * Finds all users in the database
   * @return {Promise} The promise reresenting the fulfillment of the creation request
  */
  static findAll() {

  }
}


module.exports=User;

