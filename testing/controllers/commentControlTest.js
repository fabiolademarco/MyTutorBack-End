// Import dotenv
const dotenv = require('dotenv');

// Configure dotenv
dotenv.config();
const jwt = require('jsonwebtoken');
const chai = require('chai');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);
const {expect} = chai;
const proxy = require('proxyquire').noCallThru();

const commentStub = require('./stub/commentStub');
const path = {
  '../models/comment': commentStub,
};
const commentControl = proxy('../../controllers/commentControl', path);
const {mockRequest, mockResponse} = require('mock-req-res');
let req;
let res;

describe('Comment control', function() {
  let comment;

  beforeEach(function() {
    comment = {
      notice: 'Prot. n. 0279008',
      author: 'Analberto',
      text: 'placeholder',
    };

    const payload = {
      id: 'manselmo@unisa.it',
      role: 'Professor',
    };
    const token = (function createToken(payload) {
      jwt.sign(payload, process.env.PRIVATE_KEY, {expiresIn: '1h'});

      return 'JWT ' + token;
    })(payload);

    req = mockRequest({
      method: 'PUT',
      body: {'comment': comment},
      headers: {
        Authentication: token,
      },
    });
    res = mockResponse();
  });
  describe('Test Rifiuta Bando', function() {
    it('TCS_AV_5.0', async function() {
      comment.text = '';
      req = mockRequest({method: 'PUT', body: {'comment': comment}});
      res = mockResponse();
      await commentControl.set(req, res);
      expect(res.status).to.have.been.calledWith(412);
    });

    it('TCS_AV_5.1', async function() {
      comment.text = 'abc'.repeat(500);
      req = mockRequest({method: 'PUT', body: {'comment': comment}});
      res = mockResponse();
      await commentControl.set(req, res);
      expect(res.status).to.have.been.calledWith(412);
    });

    it('TCS_AV_5.2', async function() {
      req = mockRequest({method: 'PUT', body: {'comment': comment}});
      res = mockResponse();
      await commentControl.set(req, res);
      expect(res.status).to.have.been.calledWith(200);
    });
  });
});
