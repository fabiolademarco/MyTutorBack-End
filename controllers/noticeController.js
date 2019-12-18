/*
+create(b : Bando): boolean
+update(b : Bando): Bando
+setStatus(b : Bando, status : int): boolean
+delete(b : Bando): boolean
+search(filter : string): List<Bando>
+find(protocollo : string): Bando
+findAll(): List<Bando>
+getFileBando(protocollo : string): File
+setFileBando(protocollo : string, f : File): File
+getFileGraduatoria(protocollo : string): File
+setFileGraduatoria(protocollo : string, f : File): boolean
+generateBandoPdf(protocollo : string): boolean
+generateGraduatoriaPdf(protocollo : string): boolean
*/
/**
 * Notice
 *
 * This class represents Notice controller
 *
 * @author Marco D'Antonio
 * @version
 * @since
 *
 * 2019 - Copyright by Gang Of Four Eyes
 */
const Notice = require('../models/notice');

// Temp function, remove after
/**
 *
 * @param {Request} req
 * @param {Response} res
 */
function temp(req, res) {
  res.send(req.query);
}

exports.create=temp;
exports.update=temp;
exports.setStatus=temp;
exports.delete=temp;
exports.search=temp;
exports.find=temp;

/** Retrieves all the notices from the database
 *
 * @param {Request} req
 * @param {Response} res
 *
 */
exports.findAll=(req, res)=>{
  Notice.findAll((err, data)=>{
    if (err) {
      res.send(new Error('Something went wrong during the search.'));
    }
    res.send(data);
  });
};

exports.getFileBando=temp;
exports.setFileBando=temp;
exports.getFileGraduatoria=temp;
exports.setFileGraduatoria=temp;
exports.generateBandoPdf=temp;
exports.generateGraduatoriaPdf=temp;
