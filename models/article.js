/**
 * Article
 *
 * This class represents an article
 *
 * @author Francesco Migliaro
 * @version
 * @since
 *
 * 2019 - Copyright by Gang Of Four Eyes
 */
const pool = require('../db');

const table = 'article';

/**
 * Aticle object constructor
 * @param {Article} article The JS object that contains field
 *                              for setting new Article object
 */
const Article = function(article) {
  this.id = article.id;
  this.noticeProtocol = article.noticeProtocol;
  this.text = article.text;
  this.initial = article.initial;
};

/**
 * Creates a new article in database.
 * @param {Article} article The article to save.
 * @param {callback} result The callback that handles the response.
 */
Article.create = (article, result) => {
  pool.query(`INSERT INTO ${table}
              SET ?`,
  article,
  (err, data) => {
    if (err) {
      return result(err, null);
    }
    result(null, data);
  });
};

/**
 * Update an article in database.
 * @param {Article} article The article to update.
 * @param {callback} result The callback that handles the result.
 */
Article.update = (article, result) => {
  pool.query(`UPDATE ${table}
              SET ?
              WHERE id = ?`,
  [article,
    article.id,
  ],
  (err, data) => {
    if (err) {
      return result(err, null);
    }
    result(null, data);
  });
};

/**
 * Remove an article from database.
 * @param {Article} article The article to remove.
 * @param {callback} result The callback that handles the response.
 */
Article.remove = (article, result) => {
  pool.query(`DELETE
              FROM ${table}
              WHERE id = ?`,
  article.id,
  (err, data) => {
    if (err) {
      return result(err, null);
    }
    result(null, data);
  });
};

/**
 * Find the article with the specific id.
 * @param {Number} id The id of the article.
 * @param {callback} result The callback that handles the result.
 */
Article.findById = (id, result) => {
  pool.query(`SELECT *
              FROM ${table}
              WHERE id = ?`,
  id,
  (err, data) => {
    if (err) {
      return result(err, null);
    }

    result(null, data);
  });
};

/**
 * Finds the articles correlate to the specified notice.
 * @param {string} noticeProtocol The protocol of the notice.
 * @param {callback} result The callback that handles the result.
 */
Article.findByNotice = (noticeProtocol, result) => {
  pool.query(`SELECT *
              FROM ${table}
              WHERE notice_protocol = ?`,
  noticeProtocol,
  (err, data) => {
    if (err) {
      return result(err, null);
    }
    result(null, data);
  });
};

/**
 * Finds all the evaluation criterion.
 * @param {callback} result The callback that handles the response.
 */
Article.findAll = (result) => {
  pool.query(`SELECT *
              FROM ${table}`,
  (err, data) => {
    if (err) {
      return result(err, null);
    }

    result(null, data);
  });
};

/**
 * Check if an article exists.
 * @param {Article} article The article to check.
 * @param {callback} result The callback that handles the result.
 */
Article.exists = (article, result) =>{
  pool.query(`SELECT *
              FROM ${table}
              WHERE id = ?`,
  article.id,
  (err, data) => {
    if (err) {
      return result(err, null);
    }

    result(null, data.length > 0);
  });
};

module.exports = Article;
