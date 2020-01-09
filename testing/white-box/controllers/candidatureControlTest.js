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
const documentStub = require('../../stub/documentStub');

const path = {
  '../models/candidature': candidatureStub,
  '../models/user': userStub,
  '../models/document': documentStub,
};

const candidatureControl = proxy('../../../controllers/candidatureControl', path);
const {mockRequest, mockResponse} = require('mock-req-res');
let req;
let res;


describe('Candidature control', function() {
  describe('Create method', function() {
    this.beforeEach(function() {

    });
  });
});

