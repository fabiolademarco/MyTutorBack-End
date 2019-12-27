const pool = require('../db');
const table = 'article';

/**
 * Article
 *
 * This class represents an article
 *
 * @author Francesco Migliaro, Marco D'Antonio
 *
 * @copyright 2019 - Copyright by Gang Of Four Eyes
 */
class Article {
  /**
   * Article object constructor
   * @param {Article} article The JS object that contains field for setting new Article object
   */
  constructor(article) {
    this.id = article.id;
    this.notice_protocol = article.notice_protocol;
    this.text = article.text;
    this.initial = article.initial;
  }

  /**
   * Creates a new article in database.
   * @param {Article} article The article to save.
   * @return {Promise<Article>} Promise object that represents the created Article
   */
  static create(article) {
    return pool.query(`INSERT INTO ${table} SET ?`, article)
        .then(([resultSetHeader]) => {
          article.id = resultSetHeader.insertId;
          return article;
        })
        .catch((err) => {
          throw err.message;
        });
  }

  /**
   * Update an article in database.
   * @param {Article} article The article to update.
   * @return {Promise<Article>} Promise object that represents the updated Article
   */
  static update(article) {
    return pool.query(`UPDATE ${table} SET ? WHERE id = ?`, [article, article.id])
        .then(([resultSetHeader]) => {
          return article;
        })
        .catch((err) => {
          throw err.message;
        });
  }

  /**
   * Remove an article from database.
   * @param {Article} article The article to remove.
   * @return {Promise<boolean>} Promise that is true if the removal went right else it's false
   */
  static remove(article) {
    return pool.query(`DELETE FROM ${table} WHERE id = ?`, article.id)
        .then(([resultSetHeader]) => {
          return resultSetHeader.affectedRows > 0;
        })
        .catch((err) => {
          throw err.message;
        });
  }

  /**
   * Find the article with the specific id.
   * @param {Number} id The id of the article.
   * @return {Promise<Article>} Promise that represents the Article having the passed id
   */
  static findById(id) {
    return pool.query(`SELECT * FROM ${table} WHERE id = ?`, id)
        .then(([rows, fields]) => {
          return new Article(rows[0]);
        })
        .catch((err) => {
          throw err.message;
        });
  }

  /**
   * Finds the articles correlate to the specified notice.
   * @param {string} noticeProtocol The protocol of the notice.
   * @return {Promise<Article[]>} Promise that represents the Articles related to the passed Notice protocol
   */
  static findByNotice(noticeProtocol) {
    return pool.query(`SELECT * FROM ${table} WHERE notice_protocol = ?`, noticeProtocol)
        .then(([rows, fields]) => {
          return rows.map((el) => new Article(el));
        })
        .catch((err) => {
          throw err.message;
        });
  }

  /**
   * Finds all the articles.
   * @return {Promise<Article[]>} Promise that represents a list of all the Articles
   */
  static findAll() {
    return pool.query(`SELECT * FROM ${table}`)
        .then(([rows, fields]) => {
          return rows.map((er) => new Article(el));
        })
        .catch((err) => {
          throw err.message;
        });
  }

  /**
   * Check if an article exists.
   * @param {Article} article The article to check.
   * @return {Promise<boolean>} Promise that is true if the Article is in the db, else it's false
   */
  static exists(article) {
    return pool.query(`SELECT * FROM ${table} WHERE id = ?`, article.id)
        .then(([rows, fields]) => {
          return rows.length > 0;
        })
        .catch((err) => {
          throw err.message;
        });
  }
}

module.exports = Article;
