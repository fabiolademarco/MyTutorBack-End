const dotenv = require('dotenv');

dotenv.config();

const chai = require('chai');
const sinonChai = require('sinon-chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(sinonChai);
chai.use(chaiAsPromised);


const {expect} = chai;

const Notice = require('../../../models/notice');
const User = require('../../../models/user');
const example = require('./exampleNotices.json');

new Notice({comment: {}});


describe('Notice test', function() {
  this.timeout(5000);

  let notice = JSON.parse(JSON.stringify(example.notice));
  let professor = JSON.parse(JSON.stringify(example.professor));

  describe('Create method', function() {
    beforeEach(function() {
      notice = JSON.parse(JSON.stringify(example.notice)); // Added because the test Create_2 modified in some way the object
    });

    afterEach(async function() {
      notice = JSON.parse(JSON.stringify(example.notice));
      await Notice.remove(notice);
    });

    it('Create_1', function() {
      return expect(Notice.create(null)).to.be.rejectedWith(Error, 'No Parameters');
    });

    it('Create_2', async function() {
      await Notice.create(notice);

      return expect(Notice.create(notice)).to.be.rejectedWith(Error);
    });

    it('Create_3', async function() {
      const inserted = await Notice.create(notice);

      return expect(inserted.protocol).to.be.equal(notice.protocol);
    });
  });

  describe('Update method', function() {
    beforeEach(async function() {
      notice = JSON.parse(JSON.stringify(example.notice));
      notice = await Notice.create(notice);
    });

    afterEach(async function() {
      notice = JSON.parse(JSON.stringify(example.notice));
      await Notice.remove(notice);
    });

    it('Update_1', function() {
      return expect(Notice.update(null)).to.be.rejectedWith(Error, 'No Parameters');
    });

    it('Update_2', async function() {
      notice.protocol = 'Marcolino';

      return expect(Notice.update(notice)).to.be.rejectedWith(Error, 'The notice doesn\'t exists');
    });

    it('Update_3', function() {
      notice.pippo = 'franco';

      return expect(Notice.update(notice)).to.be.rejectedWith(Error);
    });

    it('Update_4', async function() {
      notice.deadline = '2020-01-31 21:59:59';
      await Notice.update(notice);
      const [dbNotice] = await Notice.findByProtocol(notice.protocol);

      expect(dbNotice.deadline).to.be.equal(notice.deadline);
    });

    it('Update_5', function() {
      notice.application_sheet = {};
      notice.evaluation_criteria = null;
      notice.articles = null;
      notice.assignments = null;

      return expect(Notice.update(notice)).to.be.fulfilled;
    });

    it('Update_6', async function() {
      notice = JSON.parse(JSON.stringify(example.notice));
      await Notice.remove(notice);
      notice.assignments = null;
      notice.comment = null;
      notice.articles = null;
      notice.evaluation_criteria = null;
      await Notice.create(notice);

      return expect(Notice.update(notice)).to.be.fulfilled;
    });

    it('Update_6', async function() {
      const id = notice.assignments[0].id;

      notice.assignments = JSON.parse(JSON.stringify(example.notice.assignments));
      notice.assignments[0].note = 'Hey';
      notice.assignments[0].id = id;

      return expect(Notice.update(notice)).to.be.fulfilled;
    });
  });

  describe('Remove method', function() {
    before(async function() {
      await Notice.create(notice);
    });

    beforeEach(function() {
      notice = JSON.parse(JSON.stringify(example.notice));
    });

    after(async function() {
      await Notice.remove(notice);
    });

    afterEach(function() {
      notice = JSON.parse(JSON.stringify(example.notice));
    });

    it('Remove_1', function() {
      return expect(Notice.remove(null)).to.be.rejectedWith(Error, 'No Parameters');
    });

    it('Remove_2', function() {
      delete notice.protocol;

      return expect(Notice.remove(notice)).to.be.rejectedWith(Error);
    });

    it('Remove_3', function() {
      return expect(Notice.remove(notice)).to.be.fulfilled;
    });
  });

  describe('Exists method', function() {
    beforeEach(function() {
      notice = JSON.parse(JSON.stringify(example.notice));
    });

    afterEach(function() {
      notice = JSON.parse(JSON.stringify(example.notice));
    });

    it('Exists_1', function() {
      return expect(Notice.exists(null)).to.be.rejectedWith(Error, 'No Parameters');
    });

    it('Exists_2', function() {
      delete notice.protocol;

      return expect(Notice.exists(notice)).to.be.rejectedWith(Error);
    });

    it('Exists_3', function() {
      return expect(Notice.exists(notice)).to.be.fulfilled;
    });
  });

  describe('FindByProtocol method', function() {
    before(async function() {
      await Notice.create(notice);
    });

    beforeEach(function() {
      notice = JSON.parse(JSON.stringify(example.notice));
    });

    after(async function() {
      await Notice.remove(notice);
    });

    afterEach(function() {
      notice = JSON.parse(JSON.stringify(example.notice));
    });

    it('FindByProtocol_1', function() {
      return expect(Notice.findByProtocol(null)).to.be.rejectedWith(Error, 'No Parameters');
    });

    it('FindByProtocol_2', function() {
      return expect(Notice.findByProtocol(notice.protocol)).to.be.fulfilled;
    });

    it('FindByProtocol_3', async function() {
      notice = JSON.parse(JSON.stringify(example.notice));
      await Notice.remove(notice);
      notice.assignments = null;
      notice.comment = null;
      notice.articles = null;
      notice.evaluation_criteria = null;
      await Notice.create(notice);

      return expect(Notice.findByProtocol(notice.protocol)).to.be.fulfilled;
    });
  });

  describe('FindByState method', function() {
    before(async function() {
      await Notice.create(notice);
    });

    beforeEach(function() {
      notice = JSON.parse(JSON.stringify(example.notice));
    });

    after(async function() {
      await Notice.remove(notice);
    });

    afterEach(function() {
      notice = JSON.parse(JSON.stringify(example.notice));
    });

    it('FindByState_1', function() {
      return expect(Notice.findByState(null)).to.be.rejectedWith(Error, 'No Parameters');
    });

    it('FindByState_2', function() {
      return expect(Notice.findByState([notice.state])).to.be.fulfilled;
    });
  });

  describe('FindByReferent method', function() {
    before(async function() {
      await User.create(professor);
      await Notice.create(notice);
    });

    beforeEach(function() {
      notice = JSON.parse(JSON.stringify(example.notice));
      professor = JSON.parse(JSON.stringify(example.professor));
    });

    after(async function() {
      await User.delete(professor);
      await Notice.remove(notice);
    });

    afterEach(function() {
      notice = JSON.parse(JSON.stringify(example.notice));
      professor = JSON.parse(JSON.stringify(example.professor));
    });

    it('FindByReferent_1', function() {
      return expect(Notice.findByReferent(null)).to.be.rejectedWith(Error, 'No Parameters');
    });

    it('FindByReferent_2', function() {
      notice.referent_professor = professor.email;

      return expect(Notice.findByReferent(notice.referent_professor)).to.be.fulfilled;
    });
  });

  describe('FindAll method', function() {
    before(async function() {
      await User.create(professor);
      await Notice.create(notice);
    });

    beforeEach(function() {
      notice = JSON.parse(JSON.stringify(example.notice));
      professor = JSON.parse(JSON.stringify(example.professor));
    });

    after(async function() {
      await User.delete(professor);
      await Notice.remove(notice);
    });

    afterEach(function() {
      notice = JSON.parse(JSON.stringify(example.notice));
      professor = JSON.parse(JSON.stringify(example.professor));
    });

    it('FindAll_1', function() {
      return expect(Notice.findAll()).to.be.fulfilled;
    });
  });
});
