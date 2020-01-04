// Import dotenv
const dotenv = require('dotenv');

// Configure dotenv
dotenv.config();

const chai = require('chai');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);
const {expect} = chai;
const proxy = require('proxyquire').noCallThru();


const ratingStub = require('./stub/ratingStub');
const candidatureStub = require('./stub/candidatureStub');
const assignmentStub = require('./stub/assignmentStub');
const evalutationCriterionStub = require('./stub/criterionStub');
const path = {
  '../models/rating': ratingStub,
  '../models/assignment': assignmentStub,
  '../models/candidature': candidatureStub,
  '../models/evaluationCriterion': evalutationCriterionStub,
};

const ratingControl = proxy('../../controllers/ratingControl', path);
const {mockRequest, mockResponse} = require('mock-req-res');
let req;
let res;

describe('Rating Control', function() {
  let ratingList;

  beforeEach(function() {
    ratingList = [
      {
        student: 'f.migliaro69@studenti.unisa.it',
        assignment_id: 3,
        titles_score: 5,
        interview_score: 50,
      },
      {
        student: 'm.dantonio69@studenti.unisa.it',
        assignment_id: 3,
        titles_score: 5,
        interview_score: 51,
      },
    ];
  });

  describe('Test Compila Tabella Valutazioni', function() {
    it('TCS_GA.2.3', async function() {
      ratingList[0].titles_score = 'ajaja';
      req = mockRequest({method: 'PUT', body: {'ratingList': ratingList}});
      res = mockResponse();
      await ratingControl.createTable(req, res);
      expect(res.status).to.have.been.calledWith(412);
    });

    it('TCS_GA.2.4', async function() {
      ratingList[0].titles_score = 30;
      req = mockRequest({method: 'PUT', body: {'ratingList': ratingList}});
      res = mockResponse();
      await ratingControl.createTable(req, res);
      expect(res.status).to.have.been.calledWith(412);
    });

    it('TCS_GA.2.5', async function() {
      ratingList[0].interview_score = 'aasdf';
      req = mockRequest({method: 'PUT', body: {'ratingList': ratingList}});
      res = mockResponse();
      await ratingControl.createTable(req, res);
      expect(res.status).to.have.been.calledWith(412);
    });
    it('TCS_GA.2.6', async function() {
      ratingList[0].interview_score = 30;
      req = mockRequest({method: 'PUT', body: {'ratingList': ratingList}});
      res = mockResponse();
      await ratingControl.createTable(req, res);
      expect(res.status).to.have.been.calledWith(412);
    });
    it('TCS_GA.2.7', async function() {
      ratingList[0].student = 'a.aaaa11@studenti.unisa.it';
      req = mockRequest({method: 'PUT', body: {'ratingList': ratingList}});
      res = mockResponse();
      await ratingControl.createTable(req, res);
      expect(res.status).to.have.been.calledWith(412);
    });
    it('TCS_GA.2.8', async function() {
      req = mockRequest({method: 'PUT', body: {'ratingList': ratingList}});
      res = mockResponse();
      await ratingControl.createTable(req, res);
      expect(res.status).to.have.been.calledWith(200);
    });
  });
});
