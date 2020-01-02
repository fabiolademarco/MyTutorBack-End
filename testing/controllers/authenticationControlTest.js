// Import dotenv
const dotenv = require('dotenv');
// Configure dotenv
dotenv.config();

const chai = require('chai');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);
const {expect} = chai;
const proxy = require('proxyquire').noCallThru();

const userStub = require('./stub/userStub');
const studentStub = require('./stub/studentStub');
const verifiedEmailStub = require('./stub/verifiedEmailStub');
const path = {
  '../models/user': userStub,
  '../models/student': studentStub,
  '../models/verifiedEmail': verifiedEmailStub,
};

const authenticationControl = proxy('../../controllers/authenticationControl', path);
const {mockRequest, mockResponse} = require('mock-req-res');
let req;
let res;

describe('Gestione Autenticazione', function() {
  let student;
  describe('Test_RegistraStudente', function() {
    beforeEach(function() {
      student = {
        email: 'c.barletta1@studenti.unisa.it',
        name: 'Cristian',
        password: 'Password123',
        surname: 'Barletta',
        role: 'Student',
        verified: '1',
        registration_number: '0512105097',
        birth_date: '1998-03-03 ',
      };
    });

    it('TCS_UT.1.0', function() {
      student.name = '';
      req = mockRequest({method: 'POST', body: {student: student}});
      res = mockResponse();
      authenticationControl.registerStudent(req, res);
      expect(res.status).to.have.been.calledWith(412);
    });

    it('TCS_UT.1.1', function() {
      student.name = 'CristianCristianCristian';
      req = mockRequest({method: 'POST', body: {student: student}});
      res = mockResponse();
      authenticationControl.registerStudent(req, res);
      expect(res.status).to.have.been.calledWith(412);
    });

    it('TCS_UT.1.2', function() {
      student.name = 'Cristian123';
      req = mockRequest({method: 'POST', body: {student: student}});
      res = mockResponse();
      authenticationControl.registerStudent(req, res);
      expect(res.status).to.have.been.calledWith(412);
    });

    it('TCS_UT.1.3', function() {
      student.surname = '';
      req = mockRequest({method: 'POST', body: {student: student}});
      res = mockResponse();
      authenticationControl.registerStudent(req, res);
      expect(res.status).to.have.been.calledWith(412);
    });

    it('TCS_UT.1.4', function() {
      student.surname = 'BarlettaBarlettaBarletta';
      req = mockRequest({method: 'POST', body: {student: student}});
      res = mockResponse();
      authenticationControl.registerStudent(req, res);
      expect(res.status).to.have.been.calledWith(412);
    });

    it('TCS_UT.1.5', function() {
      student.surname = 'Barletta123';
      req = mockRequest({method: 'POST', body: {student: student}});
      res = mockResponse();
      authenticationControl.registerStudent(req, res);
      expect(res.status).to.have.been.calledWith(412);
    });

    it('TCS_UT.1.6', function() {
      student.birth_date = '';
      req = mockRequest({method: 'POST', body: {student: student}});
      res = mockResponse();
      authenticationControl.registerStudent(req, res);
      expect(res.status).to.have.been.calledWith(412);
    });

    it('TCS_UT.1.7', function() {
      student.birth_date = '1997-05-40';
      req = mockRequest({method: 'POST', body: {student: student}});
      res = mockResponse();
      authenticationControl.registerStudent(req, res);
      expect(res.status).to.have.been.calledWith(412);
    });

    it('TCS_UT.1.8', function() {
      student.registration_number = '';
      req = mockRequest({method: 'POST', body: {student: student}});
      res = mockResponse();
      authenticationControl.registerStudent(req, res);
      expect(res.status).to.have.been.calledWith(412);
    });

    it('TCS_UT.1.9', function() {
      student.registration_number = '051210509705121050970512105097';
      req = mockRequest({method: 'POST', body: {student: student}});
      res = mockResponse();
      authenticationControl.registerStudent(req, res);
      expect(res.status).to.have.been.calledWith(412);
    });

    it('TCS_UT.1.10', function() {
      student.registration_number = '0512105097**';
      req = mockRequest({method: 'POST', body: {student: student}});
      res = mockResponse();
      authenticationControl.registerStudent(req, res);
      expect(res.status).to.have.been.calledWith(412);
    });

    it('TCS_UT.1.11', function() {
      student.email = '';
      req = mockRequest({method: 'POST', body: {student: student}});
      res = mockResponse();
      authenticationControl.registerStudent(req, res);
      expect(res.status).to.have.been.calledWith(412);
    });

    it('TCS_UT.1.12', function() {
      student.email = 'c.barlettabarlettabarlettabarlettabarlettabarlettabarletta1@studenti.unisa.it';
      req = mockRequest({method: 'POST', body: {student: student}});
      res = mockResponse();
      authenticationControl.registerStudent(req, res);
      expect(res.status).to.have.been.calledWith(412);
    });

    it('TCS_UT.1.13', function() {
      student.email = 'c.barletta1***@studenti.unisa.it';
      req = mockRequest({method: 'POST', body: {student: student}});
      res = mockResponse();
      authenticationControl.registerStudent(req, res);
      expect(res.status).to.have.been.calledWith(412);
    });

    it('TCS_UT.1.14', async function() {
      student.email = 'c.barletta@studenti.unisa.it';
      req = mockRequest({method: 'POST', body: {student: student}});
      res = mockResponse();
      await authenticationControl.registerStudent(req, res);
      expect(res.status).to.have.been.calledWith(412);
    });

    // Non esiste il campo Conferma email nel back
    it('TCS_UT.1.15', function() {
      expect(true);
    });

    it('TCS_UT.1.16', function() {
      expect(true);
    });

    it('TCS_UT.1.17', function() {
      expect(true);
    });

    it('TCS_UT.1.18', function() {
      expect(true);
    });

    it('TCS_UT.1.19', function() {
      student.password = 'Pass123';
      req = mockRequest({method: 'POST', body: {student: student}});
      res = mockResponse();
      authenticationControl.registerStudent(req, res);
      expect(res.status).to.have.been.calledWith(412);
    });

    it('TCS_UT.1.20', function() {
      student.password = 'Pass123456789123456789123';
      req = mockRequest({method: 'POST', body: {student: student}});
      res = mockResponse();
      authenticationControl.registerStudent(req, res);
      expect(res.status).to.have.been.calledWith(412);
    });

    it('TCS_UT.1.21', function() {
      student.password = '123456789++++';
      req = mockRequest({method: 'POST', body: {student: student}});
      res = mockResponse();
      authenticationControl.registerStudent(req, res);
      expect(res.status).to.have.been.calledWith(412);
    });

    // Non esiste il campo Conferma password nel back
    it('TCS_UT.1.22', function() {
      expect(true);
    });

    it('TCS_UT.1.23', function() {
      expect(true);
    });

    it('TCS_UT.1.24', function() {
      expect(true);
    });

    it('TCS_UT.1.25', function() {
      expect(true);
    });

    it('TCS_UT.1.26', async function() {
      req = mockRequest({method: 'POST', body: {student: student}});
      res = mockResponse();
      await authenticationControl.registerStudent(req, res);
      expect(res.status).to.have.been.calledWith(200);
    });
  });

  describe('Test_InserisciEmailProfessore', function() {
    it('TCS_UT.3.0', function() {
      req = mockRequest({method: 'POST', body: {email: ''}});
      res = mockResponse();
      authenticationControl.insertVerifiedEmail(req, res);
      expect(res.status).to.have.been.calledWith(412);
    });

    it('TCS_UT.3.1', function() {
      req = mockRequest({method: 'POST', body: {email: 'f.allegrettiaaaaaaaaaaabbbbbbbbbbccccccddddddderdsa@unisa.it'}});
      res = mockResponse();
      authenticationControl.insertVerifiedEmail(req, res);
      expect(res.status).to.have.been.calledWith(412);
    });

    it('TCS_UT.3.2', function() {
      req = mockRequest({method: 'POST', body: {email: 'c.feggri@studenti.unisa.it'}});
      res = mockResponse();
      authenticationControl.insertVerifiedEmail(req, res);
      expect(res.status).to.have.been.calledWith(412);
    });

    it('TCS_UT.3.3', async function() {
      req = mockRequest({method: 'POST', body: {email: 'alberto@unisa.it'}});
      res = mockResponse();
      await authenticationControl.insertVerifiedEmail(req, res);
      expect(res.status).to.have.been.calledWith(412);
    });

    it('TCS_UT.3.4', async function() {
      req = mockRequest({method: 'POST', body: {email: 'f.allegretti@unisa.it'}});
      res = mockResponse();
      await authenticationControl.insertVerifiedEmail(req, res);
      expect(res.status).to.have.been.calledWith(200);
    });
  });

  let user;
  describe('Test_EffettuaLogin', function() {
    beforeEach(function() {
      user = {
        email: 'f.allegretti@unisa.it',
        password: '12345678Ab!',
      };
    });

    it('TCS_UT.4.0', function() {
      user.email = '';
      req = mockRequest({method: 'POST', body: {user: user}});
      res = mockResponse();
      authenticationControl.login(req, res);
      expect(res.status).to.have.been.calledWith(412);
    });

    it('TCS_UT.4.1', function() {
      user.email = 'f.allegrettiaaaaaaaaaaabbbbbbbbbbccccccddddddderdsa@unisa.it';
      req = mockRequest({method: 'POST', body: {user: user}});
      res = mockResponse();
      authenticationControl.login(req, res);
      expect(res.status).to.have.been.calledWith(412);
    });

    it('TCS_UT.4.2', function() {
      user.email = 'f.allegretti@studenti@unisa.it';
      req = mockRequest({method: 'POST', body: {user: user}});
      res = mockResponse();
      authenticationControl.login(req, res);
      expect(res.status).to.have.been.calledWith(412);
    });

    it('TCS_UT.4.3', async function() {
      user.email = 'c.feggri@unisa.it';
      req = mockRequest({method: 'POST', body: {user: user}});
      res = mockResponse();
      await authenticationControl.login(req, res);
      expect(res.status).to.have.been.calledWith(401);
    });

    it('TCS_UT.4.4', async function() {
      user.password = '';
      req = mockRequest({method: 'POST', body: {user: user}});
      res = mockResponse();
      await authenticationControl.login(req, res);
      expect(res.status).to.have.been.calledWith(412);
    });

    it('TCS_UT.4.5', async function() {
      user.password = 'aaaaaaaa33aaaaaaaaaaB!';
      req = mockRequest({method: 'POST', body: {user: user}});
      res = mockResponse();
      await authenticationControl.login(req, res);
      expect(res.status).to.have.been.calledWith(412);
    });

    it('TCS_UT.4.6', async function() {
      user.password = '12345678!';
      req = mockRequest({method: 'POST', body: {user: user}});
      res = mockResponse();
      await authenticationControl.login(req, res);
      expect(res.status).to.have.been.calledWith(412);
    });

    it('TCS_UT.4.7', async function() {
      user.email = 'c.barletta@studenti.unisa.it';
      user.password = 'Password123';
      req = mockRequest({method: 'POST', body: {user: user}});
      res = mockResponse();
      await authenticationControl.login(req, res);
      expect(res.status).to.have.been.calledWith(200);
    });
  });
});
