const pool = require('../db');

const Article = function(article) {
  this.id = article.id;
  this.noticeProtocol = article.noticeProtocol;
  this.text = article.text;
  this.initial = article.initial;
};

Article.create = (article, result) => {

};

Article.update = (article, result) => {

};

Article.remove = (article, result) => {

};

Article.findByNotice = (noticeProtocol, result) => {

};

module.exports = Article;
