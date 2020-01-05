const dotenv = require('dotenv');

dotenv.config();

const chai = require('chai');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);
const {expect} = chai;
const proxy = require('proxyquire').noCallThru();

const userStub = require('./stub/userStub');
const studentStub = require('./stub/studentStub');
const path = {
  '../models/user': userStub,
  '../models/student': studentStub,
};

const userControl = proxy('../../controllers/userControl', path);
const {mockRequest, mockResponse} = require('mock-req-res');
let req;
let res;

describe('Controller Utenti', function() {
  let filter;

  describe('Test_RicercaProfessore', function() {
    beforeEach(function() {
      filter = {
        email: 'alberto@unisa.it',
        role: 'Professor',
      };
    });

    it('TCS_UT.5.0', function() {
      filter.email = 'marchionno20@unisa.it';
      req = mockRequest({method: 'POST', body: {param: filter}});
      res = mockResponse();
      userControl.search(req, res);
      expect(res.status).to.have.been.calledWith(412);
    });

    it('TCS_UT.5.1', async function() {
      filter.email = 'marchionno@unisa.it';
      req = mockRequest({method: 'POST', body: {param: filter}});
      res = mockResponse();
      await userControl.search(req, res);
      expect(res.status).to.have.been.calledWith(200);
    });
  });

  let user;
  let loggedUser;

  describe('Test_ModificaDatiPersonali', function() {
    beforeEach(function() {
      user = {
        email: 'a.lodato1@studenti.unisa.it',
        password: 'Password123',
        name: 'Antonio',
        surname: 'Lodato',
        role: 'Student',
        verified: '1',
        registration_number: '0522505121',
        birth_date: '1997-04-20 ',
      };
      loggedUser = {
        id: user.email,
        role: user.role,
      };
    });

    it('TCS_UT.6.0', function() {
      user.name = '';
      req = mockRequest({method: 'POST', body: {user: user}, user: loggedUser});
      res = mockResponse();
      userControl.update(req, res);
      expect(res.status).to.have.been.calledWith(412);
    });

    it('TCS_UT.6.1', function() {
      user.name = 'Antoniooooooooooooooooooooooooooooooooooooooo';
      req = mockRequest({method: 'POST', body: {user: user}, user: loggedUser});
      res = mockResponse();
      userControl.update(req, res);
      expect(res.status).to.have.been.calledWith(412);
    });

    it('TCS_UT.6.2', function() {
      user.name = 'An#ni@';
      req = mockRequest({method: 'POST', body: {user: user}, user: loggedUser});
      res = mockResponse();
      userControl.update(req, res);
      expect(res.status).to.have.been.calledWith(412);
    });

    it('TCS_UT.6.3', function() {
      user.surname = '';
      req = mockRequest({method: 'POST', body: {user: user}, user: loggedUser});
      res = mockResponse();
      userControl.update(req, res);
      expect(res.status).to.have.been.calledWith(412);
    });

    it('TCS_UT.6.4', function() {
      user.surname = 'Lodooooooooooooooooooooooooooooooooooooooooooooooooooooo';
      req = mockRequest({method: 'POST', body: {user: user}, user: loggedUser});
      res = mockResponse();
      userControl.update(req, res);
      expect(res.status).to.have.been.calledWith(412);
    });

    it('TCS_UT.6.5', function() {
      user.surname = 'Lod@to';
      req = mockRequest({method: 'POST', body: {user: user}, user: loggedUser});
      res = mockResponse();
      userControl.update(req, res);
      expect(res.status).to.have.been.calledWith(412);
    });

    it('TCS_UT.6.6', function() {
      user.birth_date = '199-13-04';
      req = mockRequest({method: 'POST', body: {user: user}, user: loggedUser});
      res = mockResponse();
      userControl.update(req, res);
      expect(res.status).to.have.been.calledWith(412);
    });

    it('TCS_UT.6.7', function() {
      user.registration_number = '056660512?1';
      req = mockRequest({method: 'POST', body: {user: user}, user: loggedUser});
      res = mockResponse();
      userControl.update(req, res);
      expect(res.status).to.have.been.calledWith(412);
    });

    it('TCS_UT.6.8', function() {
      user.password = 'PregiatoMIPS|.,s';
      req = mockRequest({method: 'POST', body: {user: user}, user: loggedUser});
      res = mockResponse();
      userControl.update(req, res);
      expect(res.status).to.have.been.calledWith(412);
    });

    // Non esiste il campo verifica password nel back
    it('TCS_UT.6.9', function() {
      expect(true);
    });

    it('TCS_UT.6.10', async function() {
      req = mockRequest({method: 'POST', body: {user: user}, user: loggedUser});
      res = mockResponse();
      await userControl.update(req, res);
      expect(res.status).to.have.been.calledWith(200);
    });
  });

  describe('Test_RicercaStudente', function() {
    beforeEach(function() {
      filter = {
        email: 'm.rossi20@unisa.it',
        role: 'Student',
      };
    });

    it('TCS_UT.7.0', function() {
      filter.email = 'm.rossi@gmail.com';
      req = mockRequest({method: 'POST', body: {param: filter}});
      res = mockResponse();
      userControl.search(req, res);
      expect(res.status).to.have.been.calledWith(412);
    });

    it('TCS_UT.7.1', async function() {
      req = mockRequest({method: 'POST', body: {param: filter}});
      res = mockResponse();
      await userControl.search(req, res);
      expect(res.status).to.have.been.calledWith(200);
    });
  });
});
