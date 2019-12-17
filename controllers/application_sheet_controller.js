/**
 * Notice
 *
 * This class represents a Notice
 *
 * @author Giannandrea Vicidomini
 * @version
 * @since
 *
 * 2019 - Copyright by Gang Of Four Eyes
 */
const ApplicationSheet = require('../models/application_sheet');

/** Handles the request for the creation of an application
 * @param {Request} req
 * @param {Response} res
 *
 */
exports.create = (req, res)=>{
  const applicationSheet = req.body;

  if (applicationSheet == null) {
    res.send(new Error('The application must not be null.'));
  }

  ApplicationSheet.create(applicationSheet, (err, data)=>{
    if (err) {
      res.send(false);
    }
    res.send(true);
  });
};


/** Handles the request for the update of an application
 * @param {Request} req
 * @param {Response} res
 *
 */
exports.update = (req, res)=>{
  const applicationSheet=req.body;

  if (applicationSheet == null) {
    res.send(new Error('The application must not be null.'));
  }

  ApplicationSheet.update(applicationSheet, (err, data)=>{
    if (err) {
      res.send(new Error('The update could not be executed.'));
    }
    res.send(data);
  });
};


/** Handles the request for the deletion of an application
 * @param {Request} req
 * @param {Response} res
 *
 */
exports.delete = (req, res)=>{
  const noticeProtocol= req.body;

  if (applicationSheet == null) {
    res.send(new Error('The application must not be null.'));
  }
  const applicationObject= new ApplicationSheet();

  applicationObject.noticeProtocol=noticeProtocol;

  ApplicationSheet.remove(applicationObject, (err, data)=>{
    if (err) {
      res.send(false);
    }
    res.send(true);
  });
};
