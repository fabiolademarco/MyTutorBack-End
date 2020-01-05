// Import dotenv
const dotenv = require('dotenv');

// Configure dotenv
dotenv.config();

const chai = require('chai');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);
const {expect} = chai;
const proxy = require('proxyquire').noCallThru();

const NoticeStub = require('./stub/noticeStub');
const UserStub = require('./stub/userStub');
const path = {
  '../models/notice': NoticeStub,
  '../models/user': UserStub,
};

const noticeControl = proxy('../../controllers/noticeControl', path);
const {mockRequest, mockResponse} = require('mock-req-res');
let req;
let res;

describe('Controller Bando', function() {


});
