const dotenv = require('dotenv');

dotenv.config();

const chai = require('chai');
const sinonChai = require('sinon-chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(sinonChai);
chai.use(chaiAsPromised);


const {expect} = chai;

const Notice = require('../../models/notice');
const User = require('../../models/user');
const example = require('./exampleNotices.json');

describe('Notice test', function() {
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
      expect(Notice.create(null)).to.be.rejectedWith(Error, 'No Parameters');
    });

    it('Create_2', async function() {
      await Notice.create(notice);

      expect(Notice.create(notice)).to.be.rejectedWith(Error);
    });

    it('Create_3', async function() {
      const inserted = await Notice.create(notice);

      expect(inserted.protocol).to.be.equal(notice.protocol);
    });
  });

  describe('Update method', function() {
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

    it('Update_1', function() {
      expect(Notice.update(null)).to.be.rejectedWith(Error, 'No Parameters');
    });

    it('Update_2', async function() {
      await Notice.remove(notice);
      expect(Notice.update(notice)).to.be.rejectedWith(Error, 'The notice doesn\'t exists');
      await Notice.create(notice);
    });

    it('Update_3', function() {
      notice.pippo = 'franco';
      expect(Notice.update(notice)).to.be.rejectedWith(Error);
    });

    it('Update_4', async function() {
      notice.deadline = '2020-01-31 21:59:59';
      await Notice.update(notice);
      const [dbNotice] = await Notice.findByProtocol(notice.protocol);

      expect(dbNotice.deadline).to.be.equal(notice.deadline);
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
      expect(Notice.remove(null)).to.be.rejectedWith(Error, 'No Parameters');
    });

    it('Remove_2', function() {
      delete notice.protocol;
      expect(Notice.remove(notice)).to.be.rejectedWith(Error);
    });

    it('Remove_3', function() {
      expect(Notice.remove(notice)).to.be.fulfilled;
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
      expect(Notice.exists(null)).to.be.rejectedWith(Error, 'No Parameters');
    });

    it('Exists_2', function() {
      delete notice.protocol;
      expect(Notice.exists(notice)).to.be.rejectedWith(Error);
    });

    it('Exists_3', function() {
      expect(Notice.exists(notice)).to.be.fulfilled;
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
      expect(Notice.findByProtocol(null)).to.be.rejectedWith(Error, 'No Parameters');
    });

    it('FindByProtocol_2', function() {
      expect(Notice.findByProtocol(notice.protocol)).to.be.fulfilled;
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
      expect(Notice.findByState(null)).to.be.rejectedWith(Error, 'No Parameters');
    });

    it('FindByState_2', function() {
      expect(Notice.findByProtocol(notice.state)).to.be.fulfilled;
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
      expect(Notice.findByReferent(null)).to.be.rejectedWith(Error, 'No Parameters');
    });

    it('FindByReferent_2', function() {
      expect(Notice.findByReferent(notice.referent)).to.be.fulfilled;
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
      expect(Notice.findAll()).to.be.fulfilled;
    });
  });
});
