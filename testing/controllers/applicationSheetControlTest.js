const dotenv = require('dotenv');
dotenv.config();

const chai = require('chai');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);
const {expect} = chai;
const proxy = require('proxyquire').noCallThru();

const applichationSheetStub = require('./stub/applicationSheetStub');
const path = {
  '../models/applicationSheet': applichationSheetStub,
};

const applicationSheetControl = proxy('../../controllers/applicationSheetcontrol', path);
const {mockRequest, mockResponse} = require('mock-req-res');
let req;
let res;

const OK_STATUS = 200;
const ERR_CLIENT_STATUS = 412;

describe('Gestion Avvio', function() {
  let applicationSheet;

  describe('Test_CreaBozzaDomanda', function() {
    beforeEach(function() {
      applicationSheet = {
        notice_protocol: 'Prot. n. 0274751',
        documents_to_attach: 'dichiarazione sostitutiva di certificazione relativa all\'avvenuto conseguimento del diploma di laurea magistrale, alla votazione riportata ed alla data del suo conseguimento;   - dichiarazione sostitutiva di certificazione all\'iscrizione al corso di dottorato di ricerca con sede presso l\'Università degli Studi di Salerno;   - dichiarazione sostitutiva di certificazione, resa ai sensi del D.P.R. 445/2000, relativa a precedenti attività di tutorato, didattico-integrative, propedeutiche e di recupero in ambito universitario',
      };
      req = mockRequest({method: 'PUT', body: {applicationSheet: applicationSheet}});
      res = mockResponse();
    });

    it('TCS_AV.3.0', function() {
      applicationSheet.documents_to_attach = '';
      applicationSheetControl.create(req, res);
      expect(res.status).to.have.been.calledWith(ERR_CLIENT_STATUS);
    });

    it('TCS_AV.3.1', function() {
      applicationSheet.documents_to_attach = 'a'.repeat(5001);
      applicationSheetControl.create(req, res);
      expect(res.status).to.have.been.calledWith(ERR_CLIENT_STATUS);
    });

    it('TCS_AV.3.2', function() {
      applicationSheetControl.create(req, res);
      expect(res.status).to.have.been.calledWith(OK_STATUS);
    });
  });
});
