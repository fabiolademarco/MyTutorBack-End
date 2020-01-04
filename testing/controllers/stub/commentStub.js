const list = [
  {
    notice: '/*Scrivere un notice*/',
    author: 'alberto@unisa.it',
    text: 'Non è scritto correttamente',
  },
];


/**
 * CommentStub
 *
 * This class represents a CommentStub
 *
 * @author Roberto Bruno
 *
 * @copyright 2019 - Copyright by Gang Of Four Eyes
 */
class Comment {
  /**
   * Comment object constructor
   * @param {Comment} comment The JS object that contains field for setting new Comment object
   */
  constructor(comment) {
    this.notice = comment.notice;
    this.author = comment.author;
    this.text = comment.text;
  }

  /**
   * Creates a new Comment.
   * @param {Comment} comment The comment to save.
   * @return {Promise<Comment>} Promise object that represents the created comment.
   */
  static create(comment) {
    if (comment == null) {
      throw new Error('No parameters');
    }

    return new Promise((resolve) => resolve())
        .then(() => {
          if (list.filter((el) => el.notice === comment.notice).length > 0) {
            throw new Error('Already exists');
          }
          list.push(comment);

          return comment;
        })
        .catch((err) => {
          throw err;
        });
  }

  /**
   * Updates a Comment.
   * @param {Comment} comment The comment to save.
   * @return {Promise<Comment>} Promise object that represents the updated comment.
   */
  static async update(comment) {
    if (comment == null) {
      throw new Error('No parameters');
    }
    if (!await this.exists(comment)) {
      throw new Error('The comment doesn\'t exists');
    }

    return new Promise((resolve) => resolve())
        .then(() => {
          const index = list.map((el) => el.notice).indexOf(comment.notice);

          list[index] = comment;

          return comment;
        })
        .catch((err) => {
          throw err;
        });
  }

  /**
   * Removes a Comment from database.
   * @param {Comment} comment The comment to remove.
   * @return {Promise<boolean>}  Promise that is true if the removal went right else it's false.
   */
  static remove(comment) {
    if (comment == null) {
      throw new Error('No parameters');
    }

    return new Promise((resolve) => resolve())
        .then(() => {
          return list.pop(comment) != null;
        })
        .catch((err) => {
          throw err;
        });
  }

  /**
   * Checks if a comment exists.
   * @param {Comment} comment The comment to check.
   * @return {Promise<boolean>} Promise that is true if the comment exists in the db, else it's false
   */
  static exists(comment) {
    if (comment == null) {
      throw new Error('No parameters');
    }

    return new Promise((resolve) => resolve())
        .then(() => {
          return list.filter((el) => el.notice === comment.notice).length > 0;
        })
        .catch((err) => {
          throw err;
        });
  }
  /**
   * Finds the comment of the specified notice.
   * @param {string} noticeProtocol The protocol of the notice.
   * @return {Promise<Comment>} Promise object that represents the Comment of the passed notice.
   */
  static findByProtocol(noticeProtocol) {
    if (noticeProtocol == null) {
      throw new Error('No parameters');
    }

    return new Promise((resolve) => resolve())
        .then(() => {
          const comment = list.filter((el) => el.notice === noticeProtocol);

          return comment.length > 0 ? comment[0] : null;
        })
        .catch((err) => {
          throw err;
        });
  }

  /**
   * Finds all the comments.
   * @return {Promise<Comment[]>} Promise object that represents the list of all Comments.
   */
  static findAll() {
    return new Promise((resolve) => resolve())
        .then(() => list)
        .catch((err) => {
          throw err;
        });
  }
}

module.exports = Comment;
