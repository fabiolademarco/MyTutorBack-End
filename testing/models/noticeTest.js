const dotenv = require('dotenv');

dotenv.config();

const chai = require('chai');
const sinonChai = require('sinon-chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(sinonChai);
chai.use(chaiAsPromised);


const {expect} = chai;

const Notice = require('../../models/notice');
const example = require('./exampleNotices.json');

describe('Notice test', function() {
  let notice;

  describe('Create method', function() {
    beforeEach(function() {
      notice = JSON.parse(JSON.stringify(example.notice)); // Added because the test Create_2 modified in some way the object
    });

    afterEach(async function() {
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
});
