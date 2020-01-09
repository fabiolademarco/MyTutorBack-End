// Import dotenv
const dotenv = require('dotenv');

// Configure dotenv
dotenv.config();
const chai = require('chai');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);
const {expect} = chai;
const proxy = require('proxyquire').noCallThru();

const commentStub = require('../../stub/commentStub');
const userStub = require('../../stub/userStub');

const path = {
  '../models/comment': commentStub,
  '../models/user': userStub,
};

const commentControl = proxy('../../../controllers/commentControl', path);
const {mockRequest, mockResponse} = require('mock-req-res');
let req;
let res;

describe('Comment control', function() {
  let comment;

  const payload = {
    id: 'manselmo@unisa.it',
    role: 'Professor',
  };

  beforeEach(function() {
    comment = {
      notice: 'Prot. n. 0279008',
      author: 'Analberto',
      text: 'placeholder',
    };
  });
  describe('Test Rifiuta Bando', function() {
    it('TCS_AV_5.0', async function() {
      comment.text = '';

      options = {
        method: 'PUT',
        body: {'comment': comment},
        user: payload,
      };

      req = mockRequest(options);
      res = mockResponse();
      await commentControl.set(req, res);
      expect(res.status).to.have.been.calledWith(412);
    });

    it('TCS_AV_5.1', async function() {
      comment.text = 'abc'.repeat(500);
      options = {
        method: 'PUT',
        body: {'comment': comment},
        user: payload,
      };
      req = mockRequest(options);
      res = mockResponse();
      await commentControl.set(req, res);
      expect(res.status).to.have.been.calledWith(412);
    });

    it('TCS_AV_5.2', async function() {
      options = {
        method: 'PUT',
        body: {'comment': comment},
        user: payload,
      };
      req = mockRequest(options);
      res = mockResponse();
      await commentControl.set(req, res);
      expect(res.status).to.have.been.calledWith(200);
    });
  });
});
