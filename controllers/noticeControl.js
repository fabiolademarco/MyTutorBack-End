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
  res.set('Content-Type', 'application/json');
  const id = req.query.protocol;
  if (id === null || Number.parseInt(protocol) === NaN) {
    res.status(412)
        .send(new Error('Protocollo non valido'));
    return;
  }

  Notice.findByProtocol(id, (err, data) => {
    if (err) {
      return res.status(414).send(err);
    }
    return res.status(200).send({notice: data});
  });
};

exports.findAll = (req, res) => {
  Notice.findAll((err, data) => {
    if (err) {
      return res.status(414).send({error: 'Errore del database'});
    }
    return res.status(200).send({notices: data});
  });
};

exports.downloadNotice = (req, res) => {

};

exports.uploadNotice = (req, res) => {

};

exports.downloadGradedList = (req, res) => {

};

exports.uploadGradedList = (req, res) => {

};
