const dotenv = require('dotenv');

dotenv.config();

const chai = require('chai');
const sinonChai = require('sinon-chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(sinonChai);
chai.use(chaiAsPromised);


const {expect} = chai;

const noticeTable = 'notice';
const userTable = 'user';
const table = 'comment';
const db = require('../../db');
const Comment = require('../../models/comment');

const fakeNotice = 'Bando per il commento';
const fakeUser = {
  email: 'EmailPerCommento',
  password: '...',
  name: 'Name',
  surname: 'Surname',
  role: 'Professor',
  verified: '1',
};
const constComment = {
  notice: fakeNotice,
  author: fakeUser.email,
  text: 'Non è un commento per testare il comment',
};

describe('Comment model', function() {
  before(async function() {
    await db.query(`INSERT INTO ${noticeTable}(protocol) VALUES(?)`, fakeNotice);
    await db.query(`INSERT INTO ${userTable} SET ?`, fakeUser);
  });

  after(async function() {
    await db.query(`DELETE FROM ${noticeTable} WHERE protocol = ?`, fakeNotice);
    await db.query(`DELETE FROM ${userTable} WHERE email = ?`, fakeUser.email);
  });

  describe('Create Method', function() {
    let comment;

    beforeEach(function() {
      comment = JSON.parse(JSON.stringify(constComment));
    });

    afterEach(async function() {
      comment = JSON.parse(JSON.stringify(constComment));
      await db.query(`DELETE FROM ${table} WHERE notice = ?`, comment.notice);
    });

    it('Create_1', async function() {
      await expect(Comment.create(null)).to.be.rejectedWith(Error, 'No parameters');
    });

    it('Create_2', async function() {
      comment = {hey: 'hey'};
      await expect(Comment.create(comment)).to.be.rejectedWith(Error);
    });

    it('Create_3', async function() {
      await expect(Comment.create(comment)).to.be.fulfilled;
    });
  });

  describe('Update method', function() {
    let comment;

    beforeEach(async function() {
      comment = JSON.parse(JSON.stringify(constComment));
      await db.query(`INSERT INTO ${table} SET ?`, comment);
    });

    afterEach(async function() {
      comment = JSON.parse(JSON.stringify(constComment));
      await db.query(`DELETE FROM ${table} WHERE notice = ?`, comment.notice);
    });

    it('Update_1', async function() {
      await expect(Comment.update(null)).to.be.rejectedWith(Error, 'No parameters');
    });

    it('Update_2', async function() {
      comment.notice = ',.,';
      await expect(Comment.update(comment)).to.be.rejectedWith(Error, 'The comment doesn\'t exists');
    });

    it('Update_3', async function() {
      await expect(Comment.update(comment)).to.be.fulfilled;
    });
  });

  describe('Remove method', function() {
    let comment;

    beforeEach(async function() {
      comment = JSON.parse(JSON.stringify(constComment));
      await db.query(`INSERT INTO ${table} SET ?`, comment);
    });

    afterEach(async function() {
      comment = JSON.parse(JSON.stringify(constComment));
      await db.query(`DELETE FROM ${table} WHERE notice = ?`, comment.notice);
    });

    it('Remove_1', async function() {
      await expect(Comment.remove(null)).to.be.rejectedWith(Error, 'No parameters');
    });

    it('Remove_2', async function() {
      delete comment.notice;
      await expect(Comment.remove(comment)).to.be.rejectedWith(Error);
    });

    it('Remove_3', async function() {
      await expect(Comment.remove(comment)).to.be.fulfilled;
    });
  });

  describe('Exists method', function() {
    let comment;

    beforeEach(async function() {
      comment = JSON.parse(JSON.stringify(constComment));
      await db.query(`INSERT INTO ${table} SET ?`, comment);
    });

    afterEach(async function() {
      comment = JSON.parse(JSON.stringify(constComment));
      await db.query(`DELETE FROM ${table} WHERE notice = ?`, comment.notice);
    });

    it('Exists_1', async function() {
      await expect(Comment.exists(null)).to.be.rejectedWith(Error, 'No parameters');
    });

    it('Exists_2', async function() {
      delete comment.notice;
      await expect(Comment.exists(comment)).to.be.rejectedWith(Error);
    });

    it('Exists_3', async function() {
      await expect(Comment.exists(comment)).to.be.fulfilled;
    });
  });

  describe('FindByProtocol method', function() {
    let comment;

    beforeEach(async function() {
      comment = JSON.parse(JSON.stringify(constComment));
      await db.query(`INSERT INTO ${table} SET ?`, comment);
    });

    afterEach(async function() {
      comment = JSON.parse(JSON.stringify(constComment));
      await db.query(`DELETE FROM ${table} WHERE notice = ?`, comment.notice);
    });

    it('FindByProtocol_1', async function() {
      await expect(Comment.findByProtocol(null)).to.be.rejectedWith(Error, 'No parameters');
    });

    it('FindByProtocol_2', async function() {
      await expect(Comment.findByProtocol(',.,')).to.be.fulfilled;
    });

    it('FindByProtocol_3', async function() {
      await expect(Comment.findByProtocol(comment.notice)).to.be.fulfilled;
    });

    it('FindByProtocol_4', async function() {
      await expect(Comment.findByProtocol({hey: 'hey'})).to.be.rejectedWith(Error);
    });
  });

  describe('FindAll method', function() {
    beforeEach(async function() {
      comment = JSON.parse(JSON.stringify(constComment));
      await db.query(`INSERT INTO ${table} SET ?`, comment);
    });

    afterEach(async function() {
      comment = JSON.parse(JSON.stringify(constComment));
      await db.query(`DELETE FROM ${table} WHERE notice = ?`, comment.notice);
    });

    it('FindAll_1', async function() {
      await expect(Comment.findAll()).to.be.fulfilled;
    });
  });
});
