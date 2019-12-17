const ApplicationSheet = require('../models/application_sheet');

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
