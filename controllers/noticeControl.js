/*
 * NoticeControl
 *
 * This module represents the Notice Controller
 *
 * @author Marco D'Antonio
 * @version
 * @since
 *
 * 2019 - Copyright by Gang Of Four Eyes
 */
const Notice = require('../models/notice');


/**
 *  Handles the request for the creation of a notice
 *
 * @param {Request} req
 * @param {Response} res
 *
 */
exports.create = (req, res) => {
  const notice = req.body;

  if (notice == null || notice == undefined) {
    res.send({error: 'Request body must be defined'});
  }

  Notice.create(notice, (err, data) => {
    if (err) {
      return res.send({error: 'Errore nella creazione del bando'});
    }
    return res.send({notice: data});
  });
};

exports.update = (req, res) => {

};

exports.setStatus = (req, res) => {

};

exports.delete = (req, res) => {

};

exports.search = (req, res) => {

};

exports.find = (req, res) => {

};

exports.findAll = (req, res) => {

};

exports.create = (req, res) => {

};

exports.downloadNotice = (req, res) => {

};

exports.uploadNotice = (req, res) => {

};

exports.downloadGradedList = (req, res) => {

};

exports.uploadGradedList = (req, res) => {

};
