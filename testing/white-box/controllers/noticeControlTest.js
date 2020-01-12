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
const PdfStub = require('../../stub/pdfStub');
const path = {
  '../models/notice': NoticeStub,
  '../models/user': UserStub,
  '../models/rating': RatingStub,
  '../utils/pdf': PdfStub,

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
      body: {notice: body},
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
      req.body.notice = null;
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

    it('Update_3', async function() {
      const fakeNotice = {protocol: 'Prot. n. 02'};

      fakeNotice.state = NoticeStub.States.CLOSED;
      req.body.notice = fakeNotice;
      await noticeControl.update(req, res);
      expect(res.status).to.have.been.calledWith(ERR_CLIENT_STATUS);
    });

    it('Update_4', async function() {
      const fakeNotice = {protocol: 'Prot. n. 0279008'};

      fakeNotice.state = NoticeStub.States.IN_APPROVAL;
      req.body.notice = fakeNotice;
      await noticeControl.update(req, res);
      expect(res.status).to.have.been.calledWith(ERR_CLIENT_STATUS);
    });
  });

  describe('SetState method', function() {
    it('SetState_1', async function() {
      req.user.role = UserStub.Role.STUDENT;
      await noticeControl.setState(req, res);
      expect(res.status).to.have.been.calledWith(403);
    });

    it('SetState_2', async function() {
      req.user = null;
      await noticeControl.setState(req, res);
      expect(res.status).to.have.been.calledWith(ERR_UNAUTHORIZED);
    });

    it('SetState_3', async function() {
      req.user.role = UserStub.Role.PROFESSOR;
      req.body.notice = {protocol: 'Prot. n. 0279008'};
      req.body.notice.state = NoticeStub.States.IN_APPROVAL;
      await noticeControl.setState(req, res);
      expect(res.status).to.have.been.calledWith(403);
    });

    it('SetState_4', async function() {
      req.user.role = UserStub.Role.DDI;
      await noticeControl.setState(req, res);
      expect(res.status).to.have.been.calledWith(ERR_CLIENT_STATUS);
    });

    it('SetState_5', async function() {
      req.user.role = UserStub.Role.DDI;
      req.body.notice.state = NoticeStub.States.DRAFT;
      req.body.notice.protocol = 'Prot. n. 0279008';
      await noticeControl.setState(req, res);
      expect(res.status).to.have.been.calledWith(500);
    });

    it('SetState_6', async function() {
      const [notice] = await NoticeStub.findByProtocol('Prot. n. 0279008');

      notice.state = NoticeStub.States.IN_ACCEPTANCE;

      req = mockRequest({body: {notice: notice}, user: {role: UserStub.Role.TEACHING_OFFICE}});
      await noticeControl.setState(req, res);
      expect(res.status).to.have.been.calledWith(200);
    });

    it('SetState_7', async function() {
      req.user.role = UserStub.Role.TEACHING_OFFICE;
      req.body.notice.state = NoticeStub.States.IN_APPROVAL;
      req.body.notice.protocol = 'Prot. n. 0279008';
      await noticeControl.setState(req, res);
      expect(res.status).to.have.been.calledWith(500);
    });

    it('SetState_8', async function() {
      req.user.role = UserStub.Role.TEACHING_OFFICE;
      req.body.notice.state = NoticeStub.States.WAITING_FOR_GRADED_LIST;
      req.body.notice.protocol = 'Prot. n. 0279008';
      await noticeControl.setState(req, res);
      expect(res.status).to.have.been.calledWith(500);
    });
  });

  describe('Delete method', function() {
    it('Delete_1', async function() {
      req.body.notice = null;
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

    it('Search_8', async function() {
      req.user.role = UserStub.Role.TEACHING_OFFICE;
      req.body.state = null;
      req.body.type = 'vv';
      req.body.protocol = 'vv';

      await noticeControl.search(req, res);

      expect(res.status).to.have.been.calledWith(OK_STATUS);
    });

    it('Search_8', async function() {
      req.user.role = UserStub.Role.TEACHING_OFFICE;
      req.body.state = null;
      req.body.type = 'vv';

      await noticeControl.search(req, res);

      expect(res.status).to.have.been.calledWith(OK_STATUS);
    });

    it('Search_9', async function() {
      req.user.role = UserStub.Role.TEACHING_OFFICE;
      req.body.state = NoticeStub.States.PUBLISHED;

      await noticeControl.search(req, res);

      expect(res.status).to.have.been.calledWith(OK_STATUS);
    });
  });

  describe('Find method', function() {
    it('Find_1', async function() {
      await noticeControl.find(req, res);
      expect(res.status).to.have.been.calledWith(ERR_CLIENT_STATUS);
    });

    it('Find_2', async function() {
      req.params.protocol = '';
      await noticeControl.find(req, res);
      expect(res.status).to.have.been.calledWith(ERR_CLIENT_STATUS);
    });

    it('Find_3', async function() {
      req.params.protocol = '';
      req.user.role = UserStub.Role.DDI;
      await noticeControl.find(req, res);
      expect(res.status).to.have.been.calledWith(ERR_CLIENT_STATUS);
    });

    it('Find_4', async function() {
      req.params.protocol = 'Prot. n. 0279008';
      req.user.role = UserStub.Role.DDI;
      await noticeControl.find(req, res);
      expect(res.status).to.have.been.calledWith(OK_STATUS);
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

    it('DownloadNotice_3', async function() {
      req.params.protocol = 'Prot. n. 027900000';
      req.user = {
        role: 'Teaching Office',
      };
      await noticeControl.downloadNotice(req, res);
      expect(res.status).to.have.been.calledWith(ERR_CLIENT_STATUS);
    });

    it('DownloadNotice_4', async function() {
      req.params.protocol = 'Prot. n. 027';
      req.user = {
        role: 'Teaching Office',
      };
      await noticeControl.downloadNotice(req, res);
      expect(res.status).to.have.been.calledWith(ERR_CLIENT_STATUS);
    });

    it('DownloadNotice_5', async function() {
      req.params.protocol = 'Prot. n. 0279008';
      req.user = {
        role: 'Teaching Office',
      };
      await noticeControl.downloadNotice(req, res);
      expect(res.status).to.have.been.calledWith(ERR_UNAUTHORIZED);
    });
  });

  describe('UploadNotice method', function() {
    it('UploadNotice_1', async function() {
      await noticeControl.uploadNotice(req, res);
      expect(res.status).to.have.been.calledWith(ERR_CLIENT_STATUS);
    });

    it('UploadNotice_2', async function() {
      req.params.protocol = 'Prot. n. 000';
      await noticeControl.uploadNotice(req, res);
      expect(res.status).to.have.been.calledWith(ERR_CLIENT_STATUS);
    });


    it('UploadNotice_3', async function() {
      req.params.protocol = 'Prot. n. 000';
      req.body.notice = null;
      await noticeControl.uploadNotice(req, res);
      expect(res.status).to.have.been.calledWith(ERR_CLIENT_STATUS);
    });

    it('UploadNotice_4', async function() {
      req.params.protocol = 'Prot. n. 027';
      await noticeControl.uploadNotice(req, res);
      expect(res.status).to.have.been.calledWith(ERR_CLIENT_STATUS);
    });

    it('UploadNotice_5', async function() {
      req.params.protocol = 'Prot. n. 0279008';
      await noticeControl.uploadNotice(req, res);
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
      req.params.protocol = '';
      await noticeControl.downloadGradedList(req, res);
      expect(res.status).to.have.been.calledWith(ERR_CLIENT_STATUS);
    });

    it('DownloadGradedList_3', async function() {
      req.user.role = UserStub.Role.TEACHING_OFFICE;
      req.params.protocol = 'Prot. n. 027';
      await noticeControl.downloadGradedList(req, res);
      expect(res.status).to.have.been.calledWith(ERR_CLIENT_STATUS);
    });

    it('DownloadGradedList_4', async function() {
      req.user.role = UserStub.Role.TEACHING_OFFICE;
      req.params.protocol = 'Prot. n. 027000000';
      await noticeControl.downloadGradedList(req, res);
      expect(res.status).to.have.been.calledWith(ERR_CLIENT_STATUS);
    });

    it('DownloadGradedList_5', async function() {
      req.user.role = UserStub.Role.TEACHING_OFFICE;
      req.params.protocol = 'Prot. n. 0279008';
      await noticeControl.downloadGradedList(req, res);
      expect(res.status).to.have.been.calledWith(ERR_UNAUTHORIZED);
    });
  });

  describe('UploadGradedList method', function() {
    it('UploadGradedList_1', async function() {
      await noticeControl.uploadGradedList(req, res);
      expect(res.status).to.have.been.calledWith(ERR_CLIENT_STATUS);
    });

    it('UploadGradedList_2', async function() {
      req.params.protocol = '';
      await noticeControl.uploadGradedList(req, res);
      expect(res.status).to.have.been.calledWith(ERR_CLIENT_STATUS);
    });

    it('UploadGradedList_3', async function() {
      req.params.protocol = 'Prot. n. 023';
      await noticeControl.uploadGradedList(req, res);
      expect(res.status).to.have.been.calledWith(ERR_CLIENT_STATUS);
    });

    it('UploadGradedList_4', async function() {
      req.params.protocol = 'Prot. n. 023';
      req.body.gradedList = ['hye'];
      await noticeControl.uploadGradedList(req, res);
      expect(res.status).to.have.been.calledWith(ERR_CLIENT_STATUS);
    });

    it('UploadGradedList_5', async function() {
      req.params.protocol = 'Prot. n. 027';
      req.body.gradedList = ['hye'];
      await noticeControl.uploadGradedList(req, res);
      expect(res.status).to.have.been.calledWith(ERR_CLIENT_STATUS);
    });

    it('UploadGradedList_6', async function() {
      req.params.protocol = 'Prot. n. 0279008';
      req.body.gradedList = 'a'.repeat(1000);
      await noticeControl.uploadGradedList(req, res);
      expect(res.status).to.have.been.calledWith(ERR_CLIENT_STATUS);
    });
  });
});
