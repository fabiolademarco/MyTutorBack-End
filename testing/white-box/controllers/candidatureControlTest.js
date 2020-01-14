// Import dotenv
const dotenv = require('dotenv');

// Configure dotenv
dotenv.config();
const chai = require('chai');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);
const {expect} = chai;
const proxy = require('proxyquire').noCallThru();

const candidatureStub = require('../../stub/candidatureStub');
const userStub = require('../../stub/userStub');
const studentStub = require('../../stub/studentStub');
const documentStub = require('../../stub/documentStub');

const path = {
  '../models/candidature': candidatureStub,
  '../models/user': userStub,
  '../models/document': documentStub,
  '../models/student': studentStub,
};

const candidatureControl = proxy('../../../controllers/candidatureControl', path);
const {mockRequest, mockResponse} = require('mock-req-res');
let req;
let res;

const constUser = {
  email: 'c.barletta@studenti.unisa.it',
  password: 'Password123',
  name: 'Cristian',
  surname: 'Barletta',
  role: 'Student',
  verified: '1',
  registration_number: '0512105069',
  birth_date: '1998-03-12 ',
};

const constCandidature = {
  student: JSON.parse(JSON.stringify(constUser)),
  notice_protocol: 'Prot. n. 1111022',
  state: 'Editable',
  last_edit: '2020-03-03',
  documents: [],
};


describe('Candidature control', function() {
  describe('Create method', function() {
    let candidature;
    let user;
    let payload;

    beforeEach(function() {
      candidature = JSON.parse(JSON.stringify(constCandidature));
      user = JSON.parse(JSON.stringify(constUser));
      payload = {
        id: user.email,
        role: user.role,
      };
      req = mockRequest({method: 'POST', body: {candidature: candidature}, user: payload});
      res = mockResponse();
    });

    it('Create_1', async function() {
      req = mockRequest({method: 'POST'});
      await candidatureControl.create(req, res);
      expect(res.status).to.been.calledWith(412);
    });

    it('Create_2', async function() {
      await candidatureControl.create(req, res);
      expect(res.status).to.been.calledWith(200);
    });
  });

  describe('Update method', function() {
    let candidature;
    let user;
    let payload;

    beforeEach(function() {
      candidature = JSON.parse(JSON.stringify(constCandidature));
      user = JSON.parse(JSON.stringify(constUser));
      payload = {
        id: user.email,
        role: user.role,
      };
      req = mockRequest({method: 'POST', body: {candidature: candidature}, user: payload});
      res = mockResponse();
    });

    it('Update_1', async function() {
      req = mockRequest({method: 'POST'});
      await candidatureControl.update(req, res);
      expect(res.status).to.been.calledWith(412);
    });

    it('Update_2', async function() {
      await candidatureControl.update(req, res);
      expect(res.status).to.been.calledWith(200);
    });


    it('Update_3', async function() {
      payload.role = 'Teaching Office';
      req = mockRequest({method: 'POST', body: {candidature: candidature}, user: payload});
      await candidatureControl.update(req, res);
      expect(res.status).to.been.calledWith(200);
    });
  });

  describe('Delete method', function() {
    let candidature;
    let user;
    let payload;

    beforeEach(function() {
      candidature = JSON.parse(JSON.stringify(constCandidature));
      user = JSON.parse(JSON.stringify(constUser));
      payload = {
        id: user.email,
        role: user.role,
      };
      req = mockRequest({method: 'DELETE', params: {notice: candidature.notice_protocol}, user: payload});
      res = mockResponse();
    });

    it('Delete_1', async function() {
      req = mockRequest({method: 'DELETE'});
      await candidatureControl.delete(req, res);
      expect(res.status).to.been.calledWith(412);
    });

    it('Delete_2', async function() {
      await candidatureControl.delete(req, res);
      expect(res.status).to.been.calledWith(200);
    });
  });

  describe('Search method', function() {
    let candidature;
    let user;
    let payload;

    beforeEach(function() {
      candidature = JSON.parse(JSON.stringify(constCandidature));
      user = JSON.parse(JSON.stringify(constUser));
      payload = {
        id: user.email,
        role: user.role,
      };
      req = mockRequest({method: 'GET', query: {protocol: candidature.notice_protocol, student: candidature.student.email}, user: payload});
      res = mockResponse();
    });

    it('Search_1', async function() {
      payload.role = 'Teaching Office';
      await candidatureControl.search(req, res);
      expect(res.status).to.been.calledWith(200);
    });

    it('Search_2', async function() {
      payload.role = 'Teaching Office';
      req = mockRequest({method: 'GET', query: {protocol: candidature.notice_protocol, student: null}, user: payload});
      await candidatureControl.search(req, res);
      expect(res.status).to.been.calledWith(200);
    });

    it('Search_3', async function() {
      payload.role = 'Teaching Office';
      req = mockRequest({method: 'GET', query: {protocol: null, student: candidature.student.email}, user: payload});
      await candidatureControl.search(req, res);
      expect(res.status).to.been.calledWith(200);
    });

    it('Search_4', async function() {
      payload.role = 'Teaching Office';
      req = mockRequest({method: 'GET', query: {protocol: null, student: null}, user: payload});
      await candidatureControl.search(req, res);
      expect(res.status).to.been.calledWith(200);
    });

    it('Search_5', async function() {
      payload.role = 'Professor';
      req = mockRequest({method: 'GET', query: {protocol: null, student: null}, user: payload});
      await candidatureControl.search(req, res);
      expect(res.status).to.been.calledWith(412);
    });

    it('Search_6', async function() {
      req = mockRequest({method: 'GET', query: {protocol: null, student: null}, user: payload});
      await candidatureControl.search(req, res);
      expect(res.status).to.been.calledWith(200);
    });

    it('Search_7', async function() {
      payload.role = 'DDI';
      req = mockRequest({method: 'GET', query: {protocol: null, student: null}, user: payload});
      await candidatureControl.search(req, res);
      expect(res.status).to.been.calledWith(403);
    });

    it('Search_8', async function() {
      payload.role = 'Professor';
      req = mockRequest({method: 'GET', query: {protocol: candidature.notice_protocol, student: null}, user: payload});
      await candidatureControl.search(req, res);
      expect(res.status).to.been.calledWith(200);
    });
  });

  describe('DownloadDocumentFile method', function() {
    it('DownloadDocumentFile_1', async function() {
      req = mockRequest({method: 'POST'});
      res = mockResponse();
      await candidatureControl.downloadDocumentFile(req, res);
      expect(res.status).to.been.calledWith(412);
    });

    it('DownloadDocumentFile_2', async function() {
      const candidature = JSON.parse(JSON.stringify(constCandidature));

      req = mockRequest({method: 'POST', body: {candidature: candidature, fileName: 'hey'}});
      res = mockResponse();
      await candidatureControl.downloadDocumentFile(req, res);
      expect(res.status).to.been.calledWith(500);
    });
  });

  describe('DownloadDocuments method', function() {
    it('DownloadDocuments_1', async function() {
      req = mockRequest({method: 'POST'});
      res = mockResponse();
      await candidatureControl.downloadDocuments(req, res);
      expect(res.status).to.been.calledWith(412);
    });

    it('DownloadDocuments_2', async function() {
      const candidature = JSON.parse(JSON.stringify(constCandidature));

      req = mockRequest({method: 'POST', body: {candidature: candidature}});
      res = mockResponse();
      res.download = (a, b) => res;
      res.type = (a) => res;
      await candidatureControl.downloadDocuments(req, res);
      expect(true);
    });
  });
});

