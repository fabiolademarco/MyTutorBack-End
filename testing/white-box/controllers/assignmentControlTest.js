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
let req;
let res;


describe('Assignment control', function() {
  describe('SendRequest method', function() {
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
      emailStudent = 'p.franco69@studenti.unisa.it';
      req = mockRequest({method: 'POST', body: {assignment: assignment, emailStudent: emailStudent}});
      res = mockResponse();
    });

    it('SendRequest_1', function() {

    });
  });
});
