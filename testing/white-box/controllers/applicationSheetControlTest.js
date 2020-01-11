const dotenv = require('dotenv');

dotenv.config();

const chai = require('chai');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);

const {expect} = chai;
const proxy = require('proxyquire').noCallThru();

const applicationSheetStub = require('../../stub/applicationSheetStub');
const path = {
  '../models/applicationSheet': applicationSheetStub,
};

const applicationSheetControl = proxy('../../../controllers/applicationSheetControl', path);
const {mockRequest, mockResponse} = require('mock-req-res');
let req;
let res;
let applicationSheet;

const OK_STATUS = 200;
const ERR_CLIENT_STATUS = 412;
const ERR_SERVER_STATUS = 500;

describe('ApplicationSheet Control', function() {
  beforeEach(function() {
    applicationSheet = {
      notice_protocol: 'Prot. n. 0274751',
      documents_to_attach: 'dichiarazione sostitutiva di certificazione relativa all\'avvenuto conseguimento del diploma di laurea magistrale, alla votazione riportata ed alla data del suo conseguimento;   - dichiarazione sostitutiva di certificazione all\'iscrizione al corso di dottorato di ricerca con sede presso l\'Università degli Studi di Salerno;   - dichiarazione sostitutiva di certificazione, resa ai sensi del D.P.R. 445/2000, relativa a precedenti attività di tutorato, didattico-integrative, propedeutiche e di recupero in ambito universitario',
    };
  });
  describe('Create Method', function() {
    it('create method 1', async function() {
      applicationSheet = null;
      req = mockRequest({method: 'PUT', body: {applicationSheet: applicationSheet}});
      res = mockResponse();
      await applicationSheetControl.create(req, res);
      expect(res.status).to.have.been.calledWith(ERR_CLIENT_STATUS);
    });

    it('create method 2', async function() {
      applicationSheet.documents_to_attach = '';
      req = mockRequest({method: 'PUT', body: {applicationSheet: applicationSheet}});
      res = mockResponse();
      await applicationSheetControl.create(req, res);
      expect(res.status).to.have.been.calledWith(ERR_CLIENT_STATUS);
    });

    it('create method 3', async function() {
      req = mockRequest({method: 'PUT', body: {applicationSheet: applicationSheet}});
      res = mockResponse();
      await applicationSheetControl.create(req, res);
      expect(res.status).to.have.been.calledWith(OK_STATUS);
    });
  });

  describe('Update method', function() {
    it('update method 1', async function() {
      applicationSheet = null;
      req = mockRequest({method: 'PATCH', body: {applicationSheet: applicationSheet}});
      res = mockResponse();
      await applicationSheetControl.update(req, res);
      expect(res.status).to.have.been.calledWith(ERR_CLIENT_STATUS);
    });

    it('update method 2', async function() {
      applicationSheet.documents_to_attach = '';
      req = mockRequest({method: 'PATCH', body: {applicationSheet: applicationSheet}});
      res = mockResponse();
      await applicationSheetControl.update(req, res);
      expect(res.status).to.have.been.calledWith(ERR_CLIENT_STATUS);
    });

    it('update method 3', async function() {
      applicationSheet.notice_protocol = 'Prot. n. 0999999';
      req = mockRequest({method: 'PATCH', body: {applicationSheet: applicationSheet}});
      res = mockResponse();
      await applicationSheetControl.update(req, res);
      expect(res.status).to.have.been.calledWith(ERR_SERVER_STATUS);
    });

    it('update method 4', async function() {
      req = mockRequest({method: 'PATCH', body: {applicationSheet: applicationSheet}});
      res = mockResponse();
      await applicationSheetControl.update(req, res);
      expect(res.status).to.have.been.calledWith(OK_STATUS);
    });
  });

  describe('Delete method', function() {
    it('delete method 1', async function() {
      req = mockRequest({method: 'DELETE', params: {id: null}});
      res = mockResponse();
      await applicationSheetControl.delete(req, res);
      expect(res.status).to.have.been.calledWith(ERR_CLIENT_STATUS);
    });

    it('delete method 2', async function() {
      applicationSheet.notice_protocol = '';
      req = mockRequest({method: 'DELETE', params: {id: applicationSheet.notice_protocol}});
      res = mockResponse();
      await applicationSheetControl.delete(req, res);
      expect(res.status).to.have.been.calledWith(ERR_CLIENT_STATUS);
    });

    it('delete method 3', async function() {
      req = mockRequest({method: 'DELETE', params: {id: applicationSheet.notice_protocol}});
      res = mockResponse();
      await applicationSheetControl.delete(req, res);
      expect(res.status).to.have.been.calledWith(OK_STATUS);
    });
  });
})
;
