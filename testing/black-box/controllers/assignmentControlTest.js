const dotenv = require('dotenv');

dotenv.config();

const chai = require('chai');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);

const {expect} = chai;
const proxy = require('proxyquire').noCallThru();

const assignmentStub = require('../../stub/assignmentStub');
const mailStub = require('../../stub/mailStub');
const userStub = require('../../stub/userStub');

const path = {
  '../models/assignment': assignmentStub,
  '../utils/mail': mailStub,
  '../models/user': userStub,
};

const assignmentControl = proxy('../../../controllers/assignmentControl', path);
const {mockRequest, mockResponse} = require('mock-req-res');
let req;
let res;

const OK_STATUS = 200;
const ERR_CLIENT_STATUS = 412;

describe('Controller Assignment', function() {
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
    req = mockRequest({method: 'POST', body: {assignment: assignment}});
    res = mockResponse();
  });

  describe('Test_ChiudiAssegno', function() {
    it('TCS_IN.1.0', async function() {
      assignment.note = '';
      await assignmentControl.close(req, res);
      expect(res.status).to.have.been.calledWith(ERR_CLIENT_STATUS);
    });

    it('TCS_IN.1.1', async function() {
      assignment.note = 'abc'.repeat(501);
      await assignmentControl.close(req, res);
      expect(res.status).to.have.been.calledWith(ERR_CLIENT_STATUS);
    });

    it('TCS_IN.1.2', async function() {
      assignment.note = 'L\'assegno sarà chiuso correttamente';
      await assignmentControl.close(req, res);
      expect(res.status).to.have.been.calledWith(OK_STATUS);
    });
  });
});
