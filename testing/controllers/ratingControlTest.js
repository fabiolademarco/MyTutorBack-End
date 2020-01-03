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
const path = {
  '../models/rating': ratingStub,
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
        titles_score: 30,
        interview_score: 50,
      },
      {
        student: 'm.dantonio69@studenti.unisa.it',
        assignment_id: 3,
        titles_score: 30,
        interview_score: 50,
      },
    ];
  });

  describe('Test Compila Tabella Valutazioni', function() {
    
    it('TCS_GA.2.3', function() {
        ratingList[0].titles_score=
    });
  });
});
