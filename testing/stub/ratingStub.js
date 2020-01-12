
const ratingStubList = [
  {
    student: 'm.rossi22@studenti.unisa.it',
    assignment_id: 1,
    titles_score: 10,
    interview_score: 50,
  },
  {
    student: 'l.carpentieri7@studenti.unisa.it',
    assignment_id: 1,
    titles_score: 30,
    interview_score: 50,
  },
  {
    student: 'l.carpentieri7@studenti.unisa.it',
    assignment_id: 2,
    titles_score: 30,
    interview_score: 51,
  },
  {
    student: 'r.bruno20@studenti.unisa.it',
    assignment_id: 2,
    titles_score: 31,
    interview_score: 52,
  },
  {
    student: 'f.migliaro69@studenti.unisa.it',
    assignment_id: 3,
    titles_score: 32,
    interview_score: 53,
  },
  {
    student: 'm.dantonio69@studenti.unisa.it',
    assignment_id: 3,
    titles_score: 33,
    interview_score: 54,
  },
];

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
    this.assignment_id = rating.assignment_id;
    this.titles_score = rating.titles_score;
    this.interview_score = rating.interview_score;
  }
  /**
   * @param {Rating} rating The ratind to create
   * @return {Promise<Rating>} Promise representing the fulfillment of Rating creation
   */
  static create(rating) {
    if (rating == null) {
      throw new Error('The rating must not be null');
    }
    ratingStubList.push(rating);

    return new Promise((resolve) => resolve())
        .then(() => {
          return true;
        })
        .catch((err) => {
          throw err;
        });
  }

  /**
   * @param {Rating} rating The rating to update
   * @return {Promise<Rating>} Promise representing the fulfillment of Rating update
   */
  static async update(rating) {
    if (rating == null) {
      throw new Error('The rating must not be null');
    }

    const index = ratingStubList.findIndex((el) => el.student === rating.student && el.assignment_id === rating.assignment_id);

    if (index = -1) {
      throw new Error('The rating doesn\'t exists');
    }
    ratingStubList[index] = rating;

    return new Promise((resolve) => resolve())
        .then(() => new Rating(rating))
        .catch((err) => {
          throw err;
        });
  }

  /**
   * @param {Rating} rating The rating to remove
   * @return {Promise<Rating>} Promise representing the fulfillment of Rating removal
   */
  static remove(rating) {
    if (rating == null) {
      throw new Error('The rating must not be null');
    }

    return new Promise((resolve) => resolve())
        .then(() => {
          return true;
        })
        .catch((err) => {
          throw err;
        });
  }
  /**
   * @param {Rating} rating The rating whose existence is checked
   * @return {Promise<boolean>} Promise representing the fulfillment of Rating existence check
   */
  static exists(rating) {
    if (rating == null) {
      throw new Error('The rating must not be null');
    }

    return new Promise((resolve) => resolve())
        .then(() => {
          const filtered = ratingStubList.filter((el) => el.student === rating.student && el.assignment_id === rating.assignment_id);

          return filtered[0] != undefined;
        })
        .catch((err) => {
          throw err;
        });
  }
  /**
   * @param {String} emailStudent The student email
   * @param {String} assignmentId The assignment id
   * @return {Promise<Rating>} Promise representing the fulfillment of Rating search
   */
  static findById(emailStudent, assignmentId) {
    if (emailStudent == null || assignmentId == null) {
      throw new Error('Student email and assignment id must be both valid');
    }

    return new Promise((resolve) => resolve())
        .then(() => {
          const filtered = ratingStubList.filter((el) => el.student === emailStudent && el.assignment_id === assignmentId);

          return (filtered.length == 1) ? new Rating(filtered[0]) : null;
        });
  }
  /**
   * @param {String} emailStudent The student email
   * @return {Promise<Rating[]>} Promise representing the fulfillment of Rating search
   */
  static findByStudent(emailStudent) {
    if (emailStudent == null) {
      throw new Error('The student email must not be null');
    }

    return new Promise((resolve) => resolve())
        .then(() => {
          const resultSet = ratingStubList.filter((el) => el.student === emailStudent)
              .map((el) => new Rating(el));

          return resultSet;
        });
  }
  /**
   * @param {String} assignmentId The student email
   * @return {Promise<Rating[]>} Promise representing the fulfillment of Rating search
   */
  static findByAssignment(assignmentId) {
    if (assignmentId == null) {
      throw new Error('The assignment id must not be null');
    }

    return new Promise((resolve) => resolve())
        .then(() => {
          const resultSet = ratingStubList.filter((el) => el.student === assignmentId)
              .map((el) => new Rating(el));

          return resultSet;
        });
  }
}

module.exports = Rating;

