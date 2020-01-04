const list = [
  {
    id: 1,
    notice_protocol: 'Inserire notice protocol',
    text: 'Articolo 1',
    initial: 'VISTO',
  },
  {
    id: 2,
    notice_protocol: 'Inserire notice protocol',
    text: 'Articolo 2',
    initial: 'VISTO',
  },
];

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
    if (article == null) {
      throw new Error('The article cannot be null.');
    }

    return new Promise((resolve) => resolve())
        .then(async () => {
          if (await this.exists(article)) {
            throw new Error('Already exists');
          }
          list.push(article);

          return article;
        })
        .catch((err) => {
          throw err;
        });
  }

  /**
   * Updates an article in database.
   * @param {Article} article The article to update.
   * @return {Promise<Article>} Promise object that represents the updated Article
   */
  static async update(article) {
    if (article == null || !await this.exists(article)) {
      throw new Error('The article must not be null.');
    }

    return new Promise((resolve) => resolve())
        .then(() => {
          const el = list.filter((a) => a.id === article.id && a.notice_protocol === article.notice_protocol)[0];

          list[list.indexOf(el)] = el;

          return article;
        })
        .catch((err) => {
          throw err;
        });
  }

  /**
   * Removes an article from database.
   * @param {Article} article The article to remove.
   * @return {Promise<boolean>} Promise that is true if the removal went right else it's false
   */
  static remove(article) {
    if (article == null) {
      throw new Error('The article cannot be null');
    }

    return new Promise((resolve) => resolve())
        .then(() => list.pop(article) != null)
        .catch((err) => {
          throw err;
        });
  }

  /**
   * Finds the article with the specific id.
   * @param {String} id The id of the article.
   * @param {String} noticeProtocol The protocol number
   * @return {Promise<Article>} Promise that represents the Article having the passed id
   */
  static findById(id, noticeProtocol) {
    if (id == null || noticeProtocol == null) {
      throw new Error('The protocol/id must not be null');
    }

    return new Promise((resolve) => resolve())
        .then(() => {
          const el = list.filter((a) => a.id === article.id && a.notice_protocol === article.notice_protocol);

          return el.length > 0 ? el[0] : null;
        });
  }

  /**
   * Finds the articles correlate to the specified notice.
   * @param {string} noticeProtocol The protocol of the notice.
   * @return {Promise<Article[]>} Promise that represents the Articles related to the passed Notice protocol
   */
  static findByNotice(noticeProtocol) {
    if (noticeProtocol == null) {
      throw new Error('The protocol must not be null');
    }

    return new Promise((resolve) => resolve())
        .then(() => list.filter((el) => el.notice_protocol = noticeProtocol))
        .catch((err) => {
          throw err;
        });
  }

  /**
   * Finds all the articles.
   * @return {Promise<Article[]>} Promise that represents a list of all the Articles
   */
  static findAll() {
    return new Promise((resolve) => resolve())
        .then(() => {
          return list;
        })
        .catch((err) => {
          throw err;
        });
  }

  /**
   * Checks if an article exists.
   * @param {Article} article The article to check.
   * @return {Promise<boolean>} Promise that is true if the Article is in the db, else it's false
   */
  static exists(article) {
    return new Promise((resolve) => resolve())
        .then(() => list.filter((el) => el.id === article.id && el.notice_protocol === article.notice_protocol).length > 0)
        .catch((err) => {
          throw err;
        });
  }
}

module.exports = Article;
