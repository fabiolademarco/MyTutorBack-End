const pool = require('../db');

const ApplicationSheet = function(applicationSheet) {
  this.noticeProtocol = applicationSheet.noticeProtocol;
  this.penalInformation = applicationSheet.penalInformation;
  this.privacyPolicy = applicationSheet.privacyPolicy;
};

ApplicationSheet.create = (applicationSheet, result) => {

};

ApplicationSheet.update = (applicationSheet, result) => {

};

ApplicationSheet.remove = (applicationSheet, result) => {

};

ApplicationSheet.findByNotice = (noticeProtocol, result) => {

};

module.exports = ApplicationSheet;
