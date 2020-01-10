const dotenv = require('dotenv');

dotenv.config();

const chai = require('chai');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);
const {expect} = chai;
const proxy = require('proxyquire').noCallThru();

const userStub = require('../../stub/userStub');
const studentStub = require('../../stub/studentStub');
const path = {
  '../models/user': userStub,
  '../models/student': studentStub,
};

const userControl = proxy('../../../controllers/userControl', path);
const {mockRequest, mockResponse} = require('mock-req-res');
let req;
let res;

const constUser = {
  email: 'g.gianfranco@unisa.it',
  password: 'Password123',
  name: 'Gianfranchi',
  surname: 'Gianfranco',
  role: 'Student',
  verified: '1',
  registration_number: '0512105069',
  birth_date: '1900-03-03 ',
};

describe('User Control', function() {
  describe('Delete method', function() {
    let email;

    beforeEach(function() {
      email = 'f.giorgio@unisa.it';
      res = mockResponse();
    });

    it('Delete_1', async function() {
      req = mockRequest({method: 'DELETE', params: {id: null}});
      await userControl.delete(req, res);
      expect(res.status).to.been.calledWith(412);
    });

    it('Delete_2', async function() {
      req = mockRequest({method: 'DELETE', params: {id: email}});
      await userControl.delete(req, res);
      expect(res.status).to.been.calledWith(200);
    });
  });

  describe('Search method', function() {
    it('Search_1', async function() {
      req = mockRequest({method: 'POST'});
      await userControl.search(req, res);
      expect(res.status).to.been.calledWith(412);
    });
  });

  describe('Update method', function() {
    let user;
    let payload;

    beforeEach(function() {
      user = JSON.parse(JSON.stringify(constUser));
      payload = {
        id: user.email,
        role: user.role,
      };
      req = mockRequest({method: 'PATCH', body: {user: user}, user: payload});
      res = mockResponse();
    });

    it('Update_1', async function() {
      req = mockRequest({method: 'PATCH'});
      await userControl.update(req, res);
      expect(res.status).to.been.calledWith(412);
    });

    it('Update_2', async function() {
      payload.role = 'Professor';
      user.role = 'Professor';
      req = mockRequest({method: 'PATCH', body: {user: user}, user: payload});
      await userControl.update(req, res);
      expect(res.status).to.been.calledWith(200);
    });
  });

  describe('Find method', function() {
    let user;
    let payload;

    beforeEach(function() {
      user = JSON.parse(JSON.stringify(constUser));
      payload = {
        id: user.email,
        role: user.role,
      };
      req = mockRequest({method: 'GET', params: {id: user.email}, user: payload});
      res = mockResponse();
    });

    it('Find_1', async function() {
      req = mockRequest({method: 'GET', params: {id: null}, user: payload});
      await userControl.find(req, res);
      expect(res.status).to.been.calledWith(412);
    });

    it('Find_2', async function() {
      req = mockRequest({method: 'GET', params: {id: 'f.franco@unisa.it'}, user: payload});
      await userControl.find(req, res);
      expect(res.status).to.been.calledWith(403);
    });

    it('Find_3', async function() {
      await userControl.find(req, res);
      expect(res.status).to.been.calledWith(200);
    });
  });
});
