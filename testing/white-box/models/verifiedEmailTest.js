const dotenv = require('dotenv');

dotenv.config();

const chai = require('chai');
const sinonChai = require('sinon-chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(sinonChai);
chai.use(chaiAsPromised);

const {expect} = chai;

const VerifiedEmail = require('../../../models/verifiedEmail');
const db = require('../../../db');
const table = 'verified_email';

const verifiedEmail = {
  email: 'EmailVerificataModel',
  signed_up: 0,
};

describe('VerifiedEmail Model', function() {
  this.timeout(5000);

  describe('Create method', function() {
    let email;

    beforeEach(function() {
      email = JSON.parse(JSON.stringify(verifiedEmail));
    });

    afterEach(async function() {
      email = JSON.parse(JSON.stringify(verifiedEmail));
      await db.query(`DELETE FROM ${table} WHERE email = ?`, email.email);
    });

    it('Create_1', function() {
      return expect(VerifiedEmail.create(null)).to.be.rejectedWith(Error, 'VerifiedEmail can not be null or undefined');
    });

    it('Create_2', function() {
      return expect(VerifiedEmail.create({hey: 'hey'})).to.be.rejectedWith(Error);
    });

    it('Create_3', function() {
      return expect(VerifiedEmail.create(email)).to.be.fulfilled;
    });
  });

  describe('Update method', function() {
    beforeEach(async function() {
      email = JSON.parse(JSON.stringify(verifiedEmail));
      await db.query(`INSERT INTO ${table} SET ?`, email);
    });

    afterEach(async function() {
      email = JSON.parse(JSON.stringify(verifiedEmail));
      await db.query(`DELETE FROM ${table} WHERE email = ?`, email.email);
    });

    it('Update_1', function() {
      return expect(VerifiedEmail.update(null)).to.be.rejectedWith(Error, 'VerifiedEmail can not be null or undefined');
    });

    it('Update_2', function() {
      email.email = '...';

      return expect(VerifiedEmail.update(email)).to.be.rejectedWith(Error, 'The verified email doesn\'t exists');
    });

    it('Update_3', function() {
      return expect(VerifiedEmail.update(email)).to.be.fulfilled;
    });

    it('Update_4', function() {
      email.hey = 'hey';

      return expect(VerifiedEmail.update(email)).to.be.rejectedWith(Error);
    });
  });

  describe('Remove method', function() {
    beforeEach(async function() {
      email = JSON.parse(JSON.stringify(verifiedEmail));
      await db.query(`INSERT INTO ${table} SET ?`, email);
    });

    afterEach(async function() {
      email = JSON.parse(JSON.stringify(verifiedEmail));
      await db.query(`DELETE FROM ${table} WHERE email = ?`, email.email);
    });

    it('Remove_1', function() {
      return expect(VerifiedEmail.remove(null)).to.be.rejectedWith(Error, 'VerifiedEmail can not be null or undefined');
    });

    it('Remove_2', function() {
      delete email.email;

      return expect(VerifiedEmail.remove(email)).to.be.rejectedWith(Error);
    });

    it('Remove_3', function() {
      return expect(VerifiedEmail.remove(email)).to.be.fulfilled;
    });
  });

  describe('Exists method', function() {
    beforeEach(async function() {
      email = JSON.parse(JSON.stringify(verifiedEmail));
      await db.query(`INSERT INTO ${table} SET ?`, email);
    });

    afterEach(async function() {
      email = JSON.parse(JSON.stringify(verifiedEmail));
      await db.query(`DELETE FROM ${table} WHERE email = ?`, email.email);
    });

    it('Exists_1', function() {
      return expect(VerifiedEmail.exists(null)).to.be.rejectedWith(Error, 'VerifiedEmail can not be null or undefined');
    });

    it('Exists_2', function() {
      delete email.email;

      return expect(VerifiedEmail.exists(email)).to.be.rejectedWith(Error);
    });

    it('Exists_3', function() {
      return expect(VerifiedEmail.exists(email)).to.be.fulfilled;
    });
  });

  describe('FindByEmail method', function() {
    beforeEach(async function() {
      email = JSON.parse(JSON.stringify(verifiedEmail));
      await db.query(`INSERT INTO ${table} SET ?`, email);
    });

    afterEach(async function() {
      email = JSON.parse(JSON.stringify(verifiedEmail));
      await db.query(`DELETE FROM ${table} WHERE email = ?`, email.email);
    });

    it('FindByEmail_1', function() {
      return expect(VerifiedEmail.findByEmail(null)).to.be.rejectedWith(Error, 'email can not be null or undefined');
    });

    it('FindByEmail_2', function() {
      return expect(VerifiedEmail.findByEmail('...')).to.be.rejectedWith(Error, 'No result found: ...');
    });

    it('FindByEmail_3', function() {
      return expect(VerifiedEmail.findByEmail(email.email)).to.be.fulfilled;
    });
  });

  describe('FindAll method', function() {
    it('FindAll', function() {
      return expect(VerifiedEmail.findAll()).to.be.fulfilled;
    });
  });

  describe('IsVerified method', function() {
    beforeEach(async function() {
      email = JSON.parse(JSON.stringify(verifiedEmail));
      await db.query(`INSERT INTO ${table} SET ?`, email);
    });

    afterEach(async function() {
      email = JSON.parse(JSON.stringify(verifiedEmail));
      await db.query(`DELETE FROM ${table} WHERE email = ?`, email.email);
    });

    it('IsVerified_1', function() {
      return expect(VerifiedEmail.isVerified(null)).to.be.rejectedWith(Error, 'Email can not be null or undefined');
    });

    it('IsVerified_2', function() {
      email = {
        hey: 'hey',
      };

      return expect(VerifiedEmail.isVerified(email)).to.be.rejectedWith(Error);
    });

    it('IsVerified_3', function() {
      return expect(VerifiedEmail.isVerified(email.email)).to.be.fulfilled;
    });
  });
});
