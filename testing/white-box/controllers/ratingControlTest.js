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
const ERR_CLIENT_STATUS = 412;

const ratingControl = proxy('../../../controllers/ratingControl', path);
const {mockRequest, mockResponse} = require('mock-req-res');
let req;
let res;

describe('Rating Control', function() {
  before(function() {
    req = mockRequest({body: {ratingList: null}});
    res = mockResponse();
  });

  describe('CreateTable method', function() {
    it('CreateTable_1', async function() {
      await ratingControl.createTable(req, res);
      expect(res.status).to.have.been.calledWith(ERR_CLIENT_STATUS);
    });
  });

  describe('GetTable method', function() {
    it('GetTable_1', async function() {
      await ratingControl.getTable(req, res);
      expect(res.status).to.have.been.calledWith(ERR_CLIENT_STATUS);
    });
  });

  describe('Exists method', function() {
    it('Exists_1', async function() {
      await ratingControl.exists(req, res);
      expect(res.status).to.have.been.calledWith(ERR_CLIENT_STATUS);
    });
  });
});

