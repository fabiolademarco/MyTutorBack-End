// Import dotenv
const dotenv = require('dotenv');

// Configure dotenv
dotenv.config();

const chai = require('chai');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);
const {expect} = chai;
const proxy = require('proxyquire').noCallThru();

const NoticeStub = require('../../stub/noticeStub');
const UserStub = require('../../stub/userStub');
const RatingStub = require('../../stub/ratingStub');
const path = {
  '../models/notice': NoticeStub,
  '../models/user': UserStub,
  '../models/rating': RatingStub,
};

const exampleNotice = require('../models/exampleNotices');

const ERR_CLIENT_STATUS = 412;
const OK_STATUS = 200;
const ERR_UNAUTHORIZED = 403;

const noticeControl = proxy('../../../controllers/noticeControl', path);
const {mockRequest, mockResponse} = require('mock-req-res');
let req;
let res;

describe('Controller Bando', function() {
  beforeEach(function() {
    const body = {
      protocol: null,
      notice: null,
      state: null,
      professor: null,
      type: null,
    };

    req = mockRequest({
      user: {role: null},
      body: body,
    });
    res = mockResponse();
  });

  describe('Create method', function() {
    it('Create_1', async function() {
      await noticeControl.create(req, res);
      expect(res.status).to.have.been.calledWith(ERR_CLIENT_STATUS);
    });
  });

  describe('Update method', function() {
    it('Update_1', async function() {
      await noticeControl.update(req, res);
      expect(res.status).to.have.been.calledWith(ERR_CLIENT_STATUS);
    });

    it('Update_2', async function() {
      const fakeNotice = {protocol: exampleNotice.notice.protocol};

      fakeNotice.state = NoticeStub.States.CLOSED;
      req.body.notice = fakeNotice;
      await noticeControl.update(req, res);
      expect(res.status).to.have.been.calledWith(ERR_CLIENT_STATUS);
    });
  });

  describe('SetState method', function() {
    it('SetState_1', async function() {
      req.user.role = UserStub.Role.DDI;
      await noticeControl.setState(req, res);
      expect(res.status).to.have.been.calledWith(ERR_CLIENT_STATUS);
    });

    it('SetState_2', async function() {
      req.user = null;
      await noticeControl.setState(req, res);
      expect(res.status).to.have.been.calledWith(ERR_UNAUTHORIZED);
    });

    it('SetState_3', async function() {
      req.user.role = UserStub.Role.PROFESSOR;
      req.body.notice = {protocol: ''};
      await noticeControl.setState(req, res);
      expect(res.status).to.have.been.calledWith(ERR_CLIENT_STATUS);
    });
  });

  describe('Delete method', function() {
    it('Delete_1', async function() {
      await noticeControl.delete(req, res);
      expect(res.status).to.have.been.calledWith(ERR_CLIENT_STATUS);
    });

    it('Delete_2', async function() {
      req.body.notice = {protocol: ''};
      await noticeControl.delete(req, res);
      expect(res.status).to.have.been.calledWith(ERR_CLIENT_STATUS);
    });

    it('Delete_3', async function() {
      req.body.notice = {protocol: 'Prot. n. 0279008'};
      await noticeControl.delete(req, res);
      expect(res.status).to.have.been.calledWith(OK_STATUS);
    });
  });

  describe('Search method', function() {
    beforeEach(function() {
      body = {
        protocol: null,
        notice: null,
        state: null,
        professor: null,
        type: null,
      };
      req = mockRequest({
        user: {role: null},
        body: body,
      });
      res = mockResponse();
    });

    it('Search_1', async function() {
      body.protocol = 'a'.repeat(200);

      await noticeControl.search(req, res);

      expect(res.status).to.have.been.calledWith(ERR_CLIENT_STATUS);
    });

    it('Search_2', async function() {
      req.user.role = UserStub.Role.TEACHING_OFFICE;

      await noticeControl.search(req, res);

      expect(res.status).to.have.been.calledWith(OK_STATUS);
    });

    it('Search_3', async function() {
      req.body.protocol = 'Prot. n. 0279008';
      req.user = null;

      await noticeControl.search(req, res);

      expect(res.status).to.have.been.calledWith(OK_STATUS);
    });

    it('Search_4', async function() {
      body.professor = 'Davide Iannaccone';

      await noticeControl.search(req, res);

      expect(res.status).to.have.been.calledWith(ERR_UNAUTHORIZED);
    });

    it('Search_5', async function() {
      req.user.role = UserStub.Role.TEACHING_OFFICE;
      req.body = {
        protocol: 'Prot. n. 0279008',
        state: NoticeStub.States.IN_APPROVAL,
        professor: 'Frankenstein',
        type: 'Tutoring',
      };

      await noticeControl.search(req, res);

      expect(res.status).to.have.been.calledWith(OK_STATUS);
    });

    it('Search_6', async function() {
      req.user.role = UserStub.Role.TEACHING_OFFICE;
      req.body = {
        protocol: null,
        state: NoticeStub.States.IN_APPROVAL,
        professor: 'Frankenstein',
        type: 'Tutoring',
      };

      await noticeControl.search(req, res);

      expect(res.status).to.have.been.calledWith(OK_STATUS);
    });

    it('Search_7', async function() {
      req.user.role = UserStub.Role.STUDENT;
      req.body.state = NoticeStub.States.DRAFT;

      await noticeControl.search(req, res);

      expect(res.status).to.have.been.calledWith(ERR_UNAUTHORIZED);
    });
  });

  describe('Find method', function() {
    it('Find_1', async function() {
      await noticeControl.find(req, res);
      expect(res.status).to.have.been.calledWith(ERR_CLIENT_STATUS);
    });

    it('Find_2', async function() {
      req.body.notice = {protocol: ''};
      await noticeControl.find(req, res);
      expect(res.status).to.have.been.calledWith(ERR_CLIENT_STATUS);
    });

    it('Find_3', async function() {
      req.user.role = UserStub.Role.DDI;
      await noticeControl.find(req, res);
      expect(res.status).to.have.been.calledWith(ERR_CLIENT_STATUS);
    });
  });

  describe('FindAll method', function() {
    it('FindAll_1', async function() {
      req.user = null;
      await noticeControl.findAll(req, res);
      expect(res.status).to.have.been.calledWith(OK_STATUS);
    });
  });

  describe('DownloadNotice method', function() {
    it('DownloadNotice_1', async function() {
      await noticeControl.downloadNotice(req, res);
      expect(res.status).to.have.been.calledWith(ERR_CLIENT_STATUS);
    });

    it('DownloadNotice_2', async function() {
      req.body.protocol = '';
      await noticeControl.downloadNotice(req, res);
      expect(res.status).to.have.been.calledWith(ERR_CLIENT_STATUS);
    });
  });

  describe('DownloadGradedList method', function() {
    it('DownloadGradedList_1', async function() {
      await noticeControl.downloadGradedList(req, res);
      expect(res.status).to.have.been.calledWith(ERR_CLIENT_STATUS);
    });

    it('DownloadGradedList_2', async function() {
      req.user.role = UserStub.Role.TEACHING_OFFICE;
      req.body.protocol = '';
      await noticeControl.downloadGradedList(req, res);
      expect(res.status).to.have.been.calledWith(ERR_CLIENT_STATUS);
    });
  });

  describe('UploadGradedList method', function() {
    it('UploadGradedList_1', async function() {
      await noticeControl.uploadGradedList(req, res);
      expect(res.status).to.have.been.calledWith(ERR_CLIENT_STATUS);
    });

    it('UploadGradedList_2', async function() {
      req.body.protocol = '';
      await noticeControl.uploadGradedList(req, res);
      expect(res.status).to.have.been.calledWith(ERR_CLIENT_STATUS);
    });
  });
});
