// Import dotenv
const dotenv = require('dotenv');

// Configure dotenv
dotenv.config();
const chai = require('chai');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);
const {expect} = chai;
const proxy = require('proxyquire').noCallThru();

const assignmentStub = require('../../stub/assignmentStub');
const userStub = require('../../stub/userStub');
const mailStub = require('../../stub/mailStub');

const path = {
  '../models/assignment': assignmentStub,
  '../models/user': userStub,
  '../utils/mail': mailStub,
};

const assignmentControl = proxy('../../../controllers/assignmentControl', path);
const {mockRequest, mockResponse} = require('mock-req-res');

const OK_STATUS = 200;
const ERR_CLIENT_STATUS = 412;

describe('Assignment Control', function() {
  describe('SendRequest method', function() {
    let req;
    let res;
    let assignment;
    let emailStudent;

    beforeEach(function() {
      assignment = {
        id: 3,
        notice_protocol: 'Prot. n. 0279008',
        student: null,
        code: 'BD/01',
        activity_description: 'Base Dati',
        total_number_hours: 35,
        title: assignmentStub.titles.MASTER,
        hourly_cost: 35,
        ht_fund: null,
        state: assignmentStub.states.UNASSIGNED,
        note: null,
      };
      emailStudent = 'p.franco69@studenti.unisa.it';
      res = mockResponse();
    });

    it('SendRequest_1', async function() {
      assignment = null;
      req = mockRequest({method: 'POST', body: {assignment: assignment, emailStudent: emailStudent}});
      await assignmentControl.sendRequest(req, res);
      expect(res.status).to.have.been.calledWith(ERR_CLIENT_STATUS);
    });

    it('SendRequest_2', async function() {
      req = mockRequest({method: 'POST', body: {assignment: assignment, emailStudent: emailStudent}});
      await assignmentControl.sendRequest(req, res);
      expect(res.status).to.have.been.calledWith(OK_STATUS);
    });
  });

  describe('Book method', function() {
    let req;
    let res;
    let assignment;
    let user;

    beforeEach(function() {
      assignment = {
        id: 3,
        notice_protocol: 'Prot. n. 0279008',
        student: 'p.franco69@studenti.unisa.it',
        code: 'BD/01',
        activity_description: 'Base Dati',
        total_number_hours: 35,
        title: assignmentStub.titles.MASTER,
        hourly_cost: 35,
        ht_fund: null,
        state: assignmentStub.states.WAITING,
        note: null,
      };
      res = mockResponse();
      user = {
        id: 'p.franco69@studenti.unisa.it',
        role: userStub.Role.TEACHING_OFFICE,
      };
    });

    it('Book_1', async function() {
      assignment = null;
      req = mockRequest({method: 'POST', body: {assignment: assignment}, user: user});
      await assignmentControl.book(req, res);
      expect(res.status).to.have.been.calledWith(ERR_CLIENT_STATUS);
    });

    it('Book_2', async function() {
      req = mockRequest({method: 'POST', body: {assignment: assignment}, user: user});
      await assignmentControl.book(req, res);
      expect(res.status).to.have.been.calledWith(OK_STATUS);
    });
  });

  describe('Assign method', function() {
    let req;
    let res;
    let assignment;

    beforeEach(function() {
      assignment = {
        id: 3,
        notice_protocol: 'Prot. n. 0279008',
        student: null,
        code: 'BD/01',
        activity_description: 'Base Dati',
        total_number_hours: 35,
        title: assignmentStub.titles.MASTER,
        hourly_cost: 35,
        ht_fund: null,
        state: assignmentStub.states.BOOKED,
        note: null,
      };
      res = mockResponse();
    });

    it('Assign_1', async function() {
      assignment = null;
      req = mockRequest({method: 'POST', body: {assignment: assignment}});
      await assignmentControl.assign(req, res);
      expect(res.status).to.have.been.calledWith(ERR_CLIENT_STATUS);
    });

    it('Assign_2', async function() {
      req = mockRequest({method: 'POST', body: {assignment: assignment}});
      await assignmentControl.assign(req, res);
      expect(res.status).to.have.been.calledWith(OK_STATUS);
    });
  });

  describe('Search method', function() {
    let req;
    let res;
    let user;
    let id;

    beforeEach(function() {
      user = {
        role: userStub.Role.TEACHING_OFFICE,
      };
      id = 'p.franco69@studenti.unisa.it';
      res = mockResponse();
    });

    it('Search_1', async function() {
      user = null;
      req = mockRequest({method: 'GET', user: user});
      await assignmentControl.search(req, res);
      expect(res.status).to.have.been.calledWith(403);
    });

    it('Search_2', async function() {
      req = mockRequest({method: 'GET', user: user});
      await assignmentControl.search(req, res);
      expect(res.status).to.have.been.calledWith(OK_STATUS);
    });

    it('Search_3', async function() {
      user.role = userStub.Role.STUDENT;
      user.id = id;
      req = mockRequest({method: 'GET', user: user});
      await assignmentControl.search(req, res);
      expect(res.status).to.have.been.calledWith(OK_STATUS);
    });
  });

  describe('Decline method', function() {
    let req;
    let res;
    let assignment;
    let user;

    beforeEach(function() {
      assignment = {
        id: 3,
        notice_protocol: 'Prot. n. 0279008',
        student: 'p.franco69@studenti.unisa.it',
        code: 'BD/01',
        activity_description: 'Base Dati',
        total_number_hours: 35,
        title: assignmentStub.titles.MASTER,
        hourly_cost: 35,
        ht_fund: null,
        state: assignmentStub.states.WAITING,
        note: null,
      };
      user = {
        id: 'p.franco69@studenti.unisa.it',
        role: userStub.Role.STUDENT,
      };
      res = mockResponse();
    });

    it('Decline_1', async function() {
      assignment = null;
      req = mockRequest({method: 'POST', body: {assignment: assignment}, user: user});
      await assignmentControl.decline(req, res);
      expect(res.status).to.have.been.calledWith(ERR_CLIENT_STATUS);
    });

    it('Decline_2', async function() {
      req = mockRequest({method: 'POST', body: {assignment: assignment}, user: user});
      await assignmentControl.decline(req, res);
      expect(res.status).to.have.been.calledWith(OK_STATUS);
    });
  });

  describe('Find method', function() {
    let req;
    let res;
    let id;
    let user;

    beforeEach(function() {
      id = 4,
      user = {
        id: 'p.franco69@studenti.unisa.it',
        role: userStub.Role.TEACHING_OFFICE,
      };
      res = mockResponse();
    });

    it('Find_1', async function() {
      user.role = userStub.Role.PROFESSOR;
      req = mockRequest({method: 'POST', params: {id: id}, user: user});
      await assignmentControl.find(req, res);
      expect(res.status).to.have.been.calledWith(401);
    });

    it('Find_2', async function() {
      id = null;
      req = mockRequest({method: 'POST', params: {id: id}, user: user});
      await assignmentControl.find(req, res);
      expect(res.status).to.have.been.calledWith(ERR_CLIENT_STATUS);
    });

    it('Find_3', async function() {
      req = mockRequest({method: 'POST', params: {id: id}, user: user});
      await assignmentControl.find(req, res);
      expect(res.status).to.have.been.calledWith(OK_STATUS);
    });

    it('Find_4', async function() {
      user.role = userStub.Role.STUDENT;
      req = mockRequest({method: 'POST', params: {id: id}, user: user});
      await assignmentControl.find(req, res);
      expect(res.status).to.have.been.calledWith(OK_STATUS);
    });
  });

  describe('Close method', function() {
    let req;
    let res;
    let assignment;

    beforeEach(function() {
      assignment = {
        id: 3,
        notice_protocol: 'Prot. n. 0279008',
        student: null,
        code: 'BD/01',
        activity_description: 'Base Dati',
        total_number_hours: 35,
        title: assignmentStub.titles.MASTER,
        hourly_cost: 35,
        ht_fund: null,
        state: assignmentStub.states.ASSIGNED,
        note: null,
      };
      res = mockResponse();
    });

    it('Close_1', async function() {
      assignment = null;
      req = mockRequest({method: 'POST', body: {assignment: assignment}});
      await assignmentControl.close(req, res);
      expect(res.status).to.have.been.calledWith(ERR_CLIENT_STATUS);
    });

    it('Close_2', async function() {
      req = mockRequest({method: 'POST', body: {assignment: assignment}});
      await assignmentControl.close(req, res);
      expect(res.status).to.have.been.calledWith(OK_STATUS);
    });
  });
});
