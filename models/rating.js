
const pool=require('../db');
const table='rating';

/**
+findByIncarico(idIncarico : int): List<Valutazione>
*/
/**
 * Rating
 *
 * This class represents a Rating
 *
 * @author Giannandrea Vicidomini
 * @version 1.0
 *
 * 2019 - Copyright by Gang Of Four Eyes
 */
class Rating {
  /**
  * @param {Rating} rating object contructor
  */
  constructor(rating) {
    this.student = rating.student;
    this.assignmentId = rating.assignment_id;
    this.titlesScore = rating.titles_score;
    this.interviewScore = rating.interview_score;
  }
  /**
   * @param {Rating} rating The ratind to create
   * @return {Promise<Rating>} Promise representing the fulfillment of Rating creation
   */
  static create(rating) {
    if (rating == null) {
      throw new Error('The rating must not be null');
    }
    return pool.query(`INSERT INTO ${table} SET ?`, rating)
        .then(([resultSetHeader]) => {
          return new Rating(rating);
        })
        .catch((err) => {
          throw err;
        });
  }

  /**
   * @param {Rating} rating The rating to update
   * @return {Promise<Rating>} Promise representing the fulfillment of Rating update
   */
  static update(rating) {
    if (rating==null) {
      throw new Error('The rating must not be null');
    }
    return pool.query(`UPDATE ${table} SET ? WHERE student=? AND assignment_id=?`, [rating, rating.student, rating.assignment_id])
        .then(([resultSetHeader])=>{
          return new Rating(rating);
        })
        .catch((err)=>{
          throw err;
        });
  }

  /**
   * @param {Rating} rating The rating to remove
   * @return {Promise<Rating>} Promise representing the fulfillment of Rating removal
   */
  static remove(rating) {
    if (rating==null) {
      throw new Error('The rating must not be null');
    }

    return pool.query(`DELETE FROM ${table} WHERE student=? AND assignment_id=?`, [rating.student, rating.assignment_id])
        .then(([resultSetHeader])=>{
          return resultSetHeader.affectedRows>0;
        })
        .catch((err)=>{
          throw err;
        });
  }
  /**
   * @param {Rating} rating The rating whose existence is checked
   * @return {Promise<boolean>} Promise representing the fulfillment of Rating existence check
   */
  static exists(rating) {
    if (rating==null) {
      throw new Error('The rating must not be null');
    }
    return pool.query(`SELECT * FROM ${table} WHERE student=? AND assignment_id=?`, [rating.student, rating.assignment_id])
        .then(([rows])=>{
          return rows.length >0;
        })
        .catch((err)=>{
          throw err;
        });
  }
  /**
   * @param {String} emailStudent The student email
   * @param {String} assignmentId The assignment id
   * @return {Promise<Rating>} Promise representing the fulfillment of Rating search
   */
  static findById(emailStudent, assignmentId) {
    if (emailStudent ==null || assignmentId==null) {
      throw new Error('Student email and assignment id must be both valid');
    }

    return pool.query(`SELECT * FROM ${table} WHERE student=? AND assignment_id=?`, [emailStudent, assignmentId])
        .then(([rows])=>{
          if (rows.length<1) {
            throw new Error('No result was found');
          }
          return new Rating(rows[0]);
        })
        .catch((err)=>{
          throw err;
        });
  }
  /**
   * @param {String} emailStudent The student email
   * @return {Promise<Rating[]>} Promise representing the fulfillment of Rating search
   */
  static findByStudent(emailStudent) {
    if (emailStudent==null) {
      throw new Error('The student email must not be null');
    }
    return pool.query(`SELECT * FROM ${table} WHERE student=?`, emailStudent)
        .then(([rows])=>{
          return rows.map((rating)=>new Rating(rating));
        })
        .catch((err)=>{
          throw err;
        });
  }
  /**
   * @param {String} assignmentId The student email
   * @return {Promise<Rating[]>} Promise representing the fulfillment of Rating search
   */
  static findByAssignment(assignmentId) {
    if (assignmentId==null) {
      throw new Error('The assignment id must not be null');
    }
    return pool.query(`SELECT * FROM ${table} WHERE assignment_id=?`, assignmentId)
        .then(([rows])=>{
          return rows.map((rating)=>new Rating(rating));
        })
        .catch((err)=>{
          throw err;
        });
  }
}

module.exports=Rating;

