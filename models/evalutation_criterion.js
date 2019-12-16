const pool = require('../db');

const EvalutationCriterion = function(evalutationCriterion) {
  this.noticeProtocol = evalutationCriterion.noticeProtocol;
  this.name = evalutationCriterion.name;
  this.maxScore = evalutationCriterion.maxScore;
};

EvalutationCriterion.create = (evalutationCriterion, result) => {

};

EvalutationCriterion.update = (evalutationCriterion, result) => {

};

EvalutationCriterion.remove = (evalutationCriterion, result) => {

};

EvalutationCriterion.findByNotice = (noticeProtocol, result) => {

};

module.exports = EvalutationCriterion;
