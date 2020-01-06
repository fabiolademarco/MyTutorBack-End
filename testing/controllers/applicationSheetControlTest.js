const dotenv = require('dotenv');

dotenv.config();

const chai = require('chai');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);

const {expect} = chai;
const proxy = require('proxyquire').noCallThru();

const applicationSheetStub = require('./stub/applicationSheetStub');
const path = {
  '../models/applicationSheet': applicationSheetStub,
};

const applicationSheetControl = proxy('../../controllers/applicationSheetControl', path);
const {mockRequest, mockResponse} = require('mock-req-res');
let req;
let res;

const OK_STATUS = 200;
const ERR_CLIENT_STATUS = 412;

describe('Controller ApplicationSheet', function() {
  let applicationSheet;

  beforeEach(function() {
    applicationSheet = {
      notice_protocol: 'Prot. n. 0274751',
      documents_to_attach: 'dichiarazione sostitutiva di certificazione relativa all\'avvenuto conseguimento del diploma di laurea magistrale, alla votazione riportata ed alla data del suo conseguimento;   - dichiarazione sostitutiva di certificazione all\'iscrizione al corso di dottorato di ricerca con sede presso l\'Università degli Studi di Salerno;   - dichiarazione sostitutiva di certificazione, resa ai sensi del D.P.R. 445/2000, relativa a precedenti attività di tutorato, didattico-integrative, propedeutiche e di recupero in ambito universitario',
    };
    req = mockRequest({method: 'PUT', body: {applicationSheet: applicationSheet}});
    res = mockResponse();
  });

  describe('Test_CreaBozzaDomanda', function() {
    it('TCS_AV.3.0', async function() {
      applicationSheet.documents_to_attach = '';
      await applicationSheetControl.create(req, res);
      expect(res.status).to.have.been.calledWith(ERR_CLIENT_STATUS);
    });

    it('TCS_AV.3.1', async function() {
      applicationSheet.documents_to_attach = 'a'.repeat(5001);
      await applicationSheetControl.create(req, res);
      expect(res.status).to.have.been.calledWith(ERR_CLIENT_STATUS);
    });

    it('TCS_AV.3.2', async function() {
      await applicationSheetControl.create(req, res);
      expect(res.status).to.have.been.calledWith(OK_STATUS);
    });
  });

  describe('Test_ModificaBozzaDomanda', function() {
    it('TCS_AV.4.0', async function() {
      applicationSheet.documents_to_attach = '';
      await applicationSheetControl.update(req, res);
      expect(res.status).to.have.been.calledWith(ERR_CLIENT_STATUS);
    });

    it('TCS_AV.4.1', async function() {
      applicationSheet.documents_to_attach = 'a'.repeat(5001);
      await applicationSheetControl.update(req, res);
      expect(res.status).to.have.been.calledWith(ERR_CLIENT_STATUS);
    });

    it('TCS_AV.4.2', async function() {
      await applicationSheetControl.update(req, res);
      expect(res.status).to.have.been.calledWith(OK_STATUS);
    });
  });
});
