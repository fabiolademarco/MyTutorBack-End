// Import dotenv
const dotenv = require('dotenv');

// Configure dotenv
dotenv.config();

const chai = require('chai');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);
const {expect} = chai;
const proxy = require('proxyquire').noCallThru();


const ratingStub = require('../../stub/ratingStub');
const candidatureStub = require('../../stub/candidatureStub');
const assignmentStub = require('../../stub/assignmentStub');
const evaluationCriterionStub = require('../../stub/evaluationCriterionStub');
const path = {
  '../models/rating': ratingStub,
  '../models/assignment': assignmentStub,
  '../models/candidature': candidatureStub,
  '../models/evaluationCriterion': evaluationCriterionStub,
};

const ratingControl = proxy('../../../controllers/ratingControl', path);
const {mockRequest, mockResponse} = require('mock-req-res');
let req;
let res;

describe('Rating Control', function() {
  let ratingList;

  beforeEach(function() {
    const s1 = {
      email: 'm.rossi22@studenti.unisa.it',
      name: 'Mario',
      surname: 'Rossi',
      role: 'Student',
      verified: 1,
      registration_number: 'aaaaBBBB11112222',
      password: 'Abcde123',
      birth_date: '1998-03-03 ',
    };
    const s2 = {
      email: 'm.dantonio69@studenti.unisa.it',
      name: 'Marco',
      surname: 'Dntonio', // Bisogna vedere che probabilmente c'è un problema con i carattere di escape
      registration_number: 'aaaaBBBB11112222',
      password: 'Abcde123',
      birth_date: '1998-03-03 ',
      role: 'Student',
      verified: '1',
    };

    ratingList = [
      {
        student: s1,
        assignment_id: 1,
        titles_score: 10,
        interview_score: 50,
      },
      {
        student: s2,
        assignment_id: 1,
        titles_score: 5,
        interview_score: 51,
      },
    ];
  });

  describe('Test Compila Tabella Valutazioni', function() {
    it('TCS_GA.2.0', async function() {
      ratingList[0].student.name = '';
      req = mockRequest({method: 'PUT', body: {'ratingList': ratingList}});
      res = mockResponse();
      await ratingControl.createTable(req, res);
      expect(res.status).to.have.been.calledWith(412);
    });

    it('TCS_GA.2.1', async function() {
      ratingList[0].student.name = 'a'.repeat(103);
      req = mockRequest({method: 'PUT', body: {'ratingList': ratingList}});
      res = mockResponse();
      await ratingControl.createTable(req, res);
      expect(res.status).to.have.been.calledWith(412);
    });

    it('TCS_GA.2.2', async function() {
      ratingList[0].student.name = 'Franco$$#^234';
      req = mockRequest({method: 'PUT', body: {'ratingList': ratingList}});
      res = mockResponse();
      await ratingControl.createTable(req, res);
      expect(res.status).to.have.been.calledWith(412);
    });

    it('TCS_GA.2.3', async function() {
      ratingList[0].titles_score = -10;
      req = mockRequest({method: 'PUT', body: {'ratingList': ratingList}});
      res = mockResponse();
      await ratingControl.createTable(req, res);
      expect(res.status).to.have.been.calledWith(412);
    });

    it('TCS_GA.2.4', async function() {
      ratingList[0].titles_score = 1000;
      req = mockRequest({method: 'PUT', body: {'ratingList': ratingList}});
      res = mockResponse();
      await ratingControl.createTable(req, res);
      expect(res.status).to.have.been.calledWith(412);
    });

    it('TCS_GA.2.5', async function() {
      ratingList[0].interview_score = -10;
      req = mockRequest({method: 'PUT', body: {'ratingList': ratingList}});
      res = mockResponse();
      await ratingControl.createTable(req, res);
      expect(res.status).to.have.been.calledWith(412);
    });

    it('TCS_GA.2.6', async function() {
      ratingList[0].interview_score = 70;
      req = mockRequest({method: 'PUT', body: {'ratingList': ratingList}});
      res = mockResponse();
      await ratingControl.createTable(req, res);
      expect(res.status).to.have.been.calledWith(412);
    });

    it('TCS_GA.2.7', async function() {
      ratingList[0].student.email = 'a.aaaa11@studenti.unisa.it';
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
