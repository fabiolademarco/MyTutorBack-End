// Import dotenv
const dotenv = require('dotenv');

// Configure dotenv
dotenv.config();
const chai = require('chai');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);
const {expect} = chai;
const proxy = require('proxyquire').noCallThru();

const CommentStub = require('../../stub/commentStub');
const UserStub = require('../../stub/userStub');

const path = {
  '../models/comment': CommentStub,
  '../models/user': UserStub,
};

const ERR_CLIENT_STATUS = 412;
const OK_STATUS = 200;
const ERR_UNAUTHORIZED = 403;

const commentControl = proxy('../../../controllers/commentControl', path);
const {mockRequest, mockResponse} = require('mock-req-res');
let req;
let res;

describe('Comment control', function() {
  describe('Set method', function() {
    beforeEach(function() {
      req = mockRequest({user: {role: null}, body: {comment: null}});
      res = mockResponse();
    });

    it('Set_1', async function() {
      await commentControl.set(req, res);

      expect(res.status).to.have.been.calledWith(ERR_CLIENT_STATUS);
    });

    it('Set_2', async function() {
      const comment = {
        notice: 'Prot. n. 0279008',
        author: 'g.vincenzi@unisa.it',
        text: 'È banale',
      };

      req.body.comment = comment;
      req.user.role = UserStub.Role.STUDENT;

      await commentControl.set(req, res);

      expect(res.status).to.have.been.calledWith(ERR_UNAUTHORIZED);
    });

    it('Set_2', async function() {
      const comment = {
        notice: 'Prot. n. 0279698',
        author: 'm.risi@unisa.it',
        text: 'In qualche modo',
      };

      req.body.comment = comment;
      req.user.role = UserStub.Role.PROFESSOR;

      await commentControl.set(req, res);

      expect(res.status).to.have.been.calledWith(OK_STATUS);
    });
  });

  describe('Delete method', function() {
    beforeEach(function() {
      req = mockRequest({params: {id: null}});
      res = mockResponse();
    });

    it('Delete_1', async function() {
      await commentControl.delete(req, res);

      expect(res.status).to.have.been.calledWith(ERR_CLIENT_STATUS);
    });

    it('Delete_2', async function() {
      req.params.id = '';

      await commentControl.delete(req, res);

      expect(res.status).to.have.been.calledWith(ERR_CLIENT_STATUS);
    });

    it('Delete_3', async function() {
      req.params.id = 'Prot. n. 0279008';
      await commentControl.delete(req, res);

      expect(res.status).to.have.been.calledWith(OK_STATUS);
    });
  });

  describe('Get method', function() {
    beforeEach(function() {
      req = mockRequest({body: {noticeProtocol: null}});
      res = mockResponse();
    });

    it('Get_1', async function() {
      await commentControl.get(req, res);

      expect(res.status).to.have.been.calledWith(ERR_CLIENT_STATUS);
    });

    it('Get_2', async function() {
      req.body.noticeProtocol = '';

      await commentControl.get(req, res);

      expect(res.status).to.have.been.calledWith(ERR_CLIENT_STATUS);
    });

    it('Get_3', async function() {
      req.body.noticeProtocol = 'Prot. n. 0279008';

      await commentControl.get(req, res);

      expect(res.status).to.have.been.calledWith(OK_STATUS);
    });
  });
});
