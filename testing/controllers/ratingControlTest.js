// Import dotenv
const dotenv = require('dotenv');
// Configure dotenv
dotenv.config();

const chai = require('chai');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);
const {expect} = chai;
const proxy = require('proxyquire').noCallThru();

const ratingStub=require('./stub/ratingStub')
const path={
    '../models/rating':ratingStub
}