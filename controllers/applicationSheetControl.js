/**
 * ApplicationSheet
 *
 * This class represents the Application Sheet controller
 *
 * @author Giannandrea Vicidomini
 * @version
 * @since
 *
 * 2019 - Copyright by Gang Of Four Eyes
 */
const ApplicationSheet = require('../models/applicationSheet');
const OK_STATUS = 200;
const ERR_CLIENT_STATUS = 412;
const ERR_SERVER_STATUS = 500;

/** Handles the request for the creation of an application
 * @param {Request} req
 * @param {Response} res
 *
 */
exports.create = (req, res)=>{
  res.set('Content-Type', 'application/json');
  const applicationSheet = req.body.applicationSheet;

  if (applicationSheet == null) {
    res.status(ERR_CLIENT_STATUS);
    res.send({error: 'La domanda non può essere nulla.'});
    return;
  }

  ApplicationSheet.create(applicationSheet)
      .then((data)=>{
        res.status(OK_STATUS).send({result: true});
      })
      .catch((err)=>{
        res.status(ERR_SERVER_STATUS);
        res.send({error: false});
        return;
      });
};


/** Handles the request for the update of an application
 * @param {Request} req
 * @param {Response} res
 *
 */
exports.update = (req, res)=>{
  res.set('Content-Type', 'application/json');
  const applicationSheet=req.body.applicationSheet;

  if (applicationSheet == null) {
    res.status(ERR_CLIENT_STATUS);
    res.send({error: 'La domanda non può essere nulla.'});
    return;
  }

  ApplicationSheet.update(applicationSheet)
      .then((data)=>{
        res.status(OK_STATUS).send(data);
      })
      .catch((err)=>{
        res.status(ERR_SERVER_STATUS);
        res.send({error: 'The update could not be executed.'});
        return;
      });
};


/** Handles the request for the deletion of an application
 * @param {Request} req
 * @param {Response} res
 *
 */
exports.delete = (req, res)=>{
  res.set('Content-Type', 'application/json');
  const noticeProtocol= req.body.noticeProtocol;

  if (applicationSheet == null) {
    res.status(ERR_CLIENT_STATUS);
    res.send({error: 'La domanda non può essere nulla.'});
    return;
  }
  const applicationObject= new ApplicationSheet();

  applicationObject.noticeProtocol=noticeProtocol;

  ApplicationSheet.remove(applicationObject)
      .then((data)=>{
        res.status(OK_STATUS).send({result: true});
      })
      .catch((err)=>{
        res.status(ERR_SERVER_STATUS);
        res.send({error: false});
        return;
      });
};
