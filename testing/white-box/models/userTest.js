const dotenv = require('dotenv');

dotenv.config();

const chai = require('chai');
const sinonChai = require('sinon-chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(sinonChai);
chai.use(chaiAsPromised);


const {expect} = chai;

const db = require('../../../db');
const table = 'user';
const User = require('../../../models/user');

const constUser = {
  email: 'provaEmail',
  password: 'Password123',
  name: 'Cristian',
  surname: 'Barletta',
  role: 'DDI',
  verified: '1',
};

describe('User model', function() {
  this.timeout(5000);

  describe('Create method', function() {
    let user;

    beforeEach(function() {
      user = JSON.parse(JSON.stringify(constUser));
    });

    afterEach(async function() {
      user = JSON.parse(JSON.stringify(constUser));
      await db.query(`DELETE FROM ${table} WHERE email = ?`, user.email);
    });

    it('Create_1', async function() {
      expect(User.create(null)).to.be.rejectedWith(Error, 'User must not be null');
    });

    it('Create_2', async function() {
      expect(User.create(user)).to.be.fulfilled;
    });

    it('Create_3', async function() {
      const insertUser = await User.create(user);

      expect(User.create(insertUser)).to.be.rejectedWith(Error);
    });
  });

  describe('Update method', function() {
    let user;

    beforeEach(async function() {
      user = JSON.parse(JSON.stringify(constUser));
      await db.query(`INSERT INTO ${table} SET ?`, user);
    });

    afterEach(async function() {
      user = JSON.parse(JSON.stringify(constUser));
      await db.query(`DELETE FROM ${table} WHERE email = ?`, user.email);
    });

    it('Update_1', function() {
      expect(User.update(null)).to.be.rejectedWith(Error, 'User must not be null');
    });

    it('Update_2', function() {
      user.email = 'nonEsiste';

      expect(User.update(user)).to.be.rejectedWith(Error, 'The user doesn\'t exists');
    });

    it('Update_3', function() {
      user.password = null;
      expect(User.update(user)).to.be.fulfilled;
    });

    it('Update_4', function() {
      expect(User.update(user)).to.be.fulfilled;
    });
  });

  describe('Delete method', function() {
    let user;

    beforeEach(async function() {
      user = JSON.parse(JSON.stringify(constUser));
      await db.query(`INSERT INTO ${table} SET ?`, user);
    });

    afterEach(async function() {
      user = JSON.parse(JSON.stringify(constUser));
      await db.query(`DELETE FROM ${table} WHERE email = ?`, user.email);
    });

    it('Delete_1', function() {
      expect(User.delete(null)).to.be.rejectedWith(Error, 'User must not be null');
    });

    it('Delete_2', async function() {
      expect(User.delete(user)).to.be.fulfilled;
    });
  });

  describe('Exists method', function() {
    let user;

    beforeEach(async function() {
      user = JSON.parse(JSON.stringify(constUser));
      await db.query(`INSERT INTO ${table} SET ?`, user);
    });

    afterEach(async function() {
      user = JSON.parse(JSON.stringify(constUser));
      await db.query(`DELETE FROM ${table} WHERE email = ?`, user.email);
    });

    it('Exists_1', function() {
      expect(User.exists(null)).to.be.rejectedWith(Error, 'User must not be null');
    });

    it('Exists_2', function() {
      expect(User.exists(user)).to.be.fulfilled;
    });
  });

  describe('FindByEmail method', function() {
    let user;

    beforeEach(async function() {
      user = JSON.parse(JSON.stringify(constUser));
      await db.query(`INSERT INTO ${table} SET ?`, user);
    });

    afterEach(async function() {
      user = JSON.parse(JSON.stringify(constUser));
      await db.query(`DELETE FROM ${table} WHERE email = ?`, user.email);
    });

    it('FindByEmail_1', function() {
      expect(User.findByEmail(null)).to.be.rejectedWith(Error, 'Email must not be null');
    });

    it('FindByEmail_2', async function() {
      expect(await User.findByEmail('nonesiste')).to.be.equal(null);
    });

    it('FindByEmail_3', async function() {
      expect((await User.findByEmail(user.email)).email).to.be.equal(user.email);
    });

    it('FindByEmail_4', function() {
      expect(User.findByEmail({hey: 'hey'})).to.be.rejectedWith(Error);
    });
  });

  describe('FindByRole method', function() {
    let user;

    beforeEach(async function() {
      user = JSON.parse(JSON.stringify(constUser));
      await db.query(`INSERT INTO ${table} SET ?`, user);
    });

    afterEach(async function() {
      user = JSON.parse(JSON.stringify(constUser));
      await db.query(`DELETE FROM ${table} WHERE email = ?`, user.email);
    });

    it('FindByRole_1', function() {
      expect(User.findByRole(null)).to.be.rejectedWith(Error, 'Role must not be null');
    });

    it('FindByRole_2', function() {
      expect(User.findByRole('Student')).to.be.fulfilled;
    });

    it('FindByRole_3', function() {
      expect(User.findByRole({role: 'hey', hey: 'hey'})).to.be.rejectedWith(Error);
    });
  });

  describe('FindByVerified method', function() {
    let user;

    beforeEach(async function() {
      user = JSON.parse(JSON.stringify(constUser));
      await db.query(`INSERT INTO ${table} SET ?`, user);
    });

    afterEach(async function() {
      user = JSON.parse(JSON.stringify(constUser));
      await db.query(`DELETE FROM ${table} WHERE email = ?`, user.email);
    });

    it('FindByVerified_1', function() {
      expect(User.findByVerified(null)).to.be.rejectedWith(Error, 'Verified status must not be null');
    });

    it('FindByVerified_2', async function() {
      expect(User.findByVerified(1)).to.be.fulfilled; // Added to remove a warning about promise handling
    });

    it('FindByVerified_3', function() {
      expect(User.findByVerified({role: 'hey', hey: 'hey'})).to.be.rejectedWith(Error);
    });
  });

  describe('FindAll method', function() {
    it('FindAll', function() {
      expect(User.findAll()).to.be.fulfilled;
    });
  });

  describe('Search method', function() {
    let filter;

    beforeEach(function() {
      filter = JSON.parse(JSON.stringify(constUser));
    });

    it('Search_1', function() {
      expect(User.search(null)).to.be.rejectedWith(Error);
    });

    it('Search_2', function() {
      expect(User.search(filter)).to.be.fulfilled;
    });

    it('Search_3', function() {
      filter = {};
      expect(User.search(filter)).to.be.fulfilled;
    });
  });

  describe('MatchUser method', function() {
    let user;

    beforeEach(async function() {
      user = JSON.parse(JSON.stringify(constUser));
      await db.query(`INSERT INTO ${table} SET ?`, user);
    });

    afterEach(async function() {
      user = JSON.parse(JSON.stringify(constUser));
      await db.query(`DELETE FROM ${table} WHERE email = ?`, user.email);
    });

    it('MatchUser_1', function() {
      expect(User.matchUser(user.email, null)).to.be.rejectedWith(Error, 'Email or Password can not be null or undefined');
    });

    it('MatchUser_2', async function() {
      expect(await User.matchUser(user.email, 'password')).to.be.equal(null);
    });

    it('MatchUser_3', function() {
      expect(User.matchUser({hey: 'hey'}, user.password)).to.be.rejectedWith(Error);
    });

    it('MatchUser_4', function() {
      expect(User.matchUser(user.email, 'Password123')).to.be.fulfilled;
    });
  });
});
