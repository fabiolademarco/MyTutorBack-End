const dotenv = require('dotenv');

dotenv.config();

const chai = require('chai');
const sinonChai = require('sinon-chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(sinonChai);
chai.use(chaiAsPromised);


const {expect} = chai;

const User = require('../../models/user');

describe('User model', function() {
  let user;

  describe('Create method', function() {
    beforeEach(function() {
      user = {
        email: 'provaEmail',
        password: 'Password123',
        name: 'Cristian',
        surname: 'Barletta',
        role: 'DDI',
        verified: '1',
      };
    });

    afterEach(async function() {
      await User.delete(user);
    });

    it('Create_1', async function() {
      expect(User.create(null)).to.be.rejectedWith(Error, 'User must not be null');
    });

    it('Create_2', async function() {
      const insertedUser = await User.create(user);

      expect(user.email).to.been.equal(insertedUser.email);
    });

    it('Create_3', async function() {
      const insertUser = await User.create(user);

      expect(User.create(insertUser)).to.be.rejectedWith(Error);
    });
  });

  describe('Update method', function() {
    beforeEach(async function() {
      user = {
        email: 'provaEmail',
        password: 'Password123',
        name: 'Cristian',
        surname: 'Barletta',
        role: 'DDI',
        verified: '1',
      };
      await User.create(user);
    });

    afterEach(async function() {
      user = {
        email: 'provaEmail',
        password: 'Password123',
        name: 'Cristian',
        surname: 'Barletta',
        role: 'DDI',
        verified: '1',
      };
      await User.delete(user);
    });

    it('Update_1', function() {
      expect(User.update(null)).to.be.rejectedWith(Error, 'User must not be null');
    });

    it('Update_2', function() {
      user.email = 'nonEsiste';
      expect(User.update(user)).to.be.rejectedWith(Error, 'The user doesn\'t exists');
    });

    it('Update_3', async function() {
      const updatedUser = await User.update(user);

      expect(user.email).to.be.equal(updatedUser.email);
    });

    it('Update_4', async function() {
      user.password = null;
      user.verified = 'Prova';
      await expect(User.update(user)).to.be.rejectedWith(Error); // Added await to remove warning on promise handling
    });
  });

  describe('Delete method', function() {
    beforeEach(async function() {
      user = {
        email: 'provaEmail',
        password: 'Password123',
        name: 'Cristian',
        surname: 'Barletta',
        role: 'DDI',
        verified: '1',
      };
      await User.create(user);
    });

    afterEach(async function() {
      user = {
        email: 'provaEmail',
        password: 'Password123',
        name: 'Cristian',
        surname: 'Barletta',
        role: 'DDI',
        verified: '1',
      };
      await User.delete(user);
    });

    it('Delete_1', function() {
      expect(User.delete(null)).to.be.rejectedWith(Error, 'User must not be null');
    });

    it('Delete_2', async function() {
      expect(await User.delete(user)).to.be.equal(true);
    });
  });

  describe('Exists method', function() {
    beforeEach(async function() {
      user = {
        email: 'provaEmail',
        password: 'Password123',
        name: 'Cristian',
        surname: 'Barletta',
        role: 'DDI',
        verified: '1',
      };
      await User.create(user);
    });

    afterEach(async function() {
      user = {
        email: 'provaEmail',
        password: 'Password123',
        name: 'Cristian',
        surname: 'Barletta',
        role: 'DDI',
        verified: '1',
      };
      await User.delete(user);
    });

    it('Delete_1', function() {
      expect(User.delete(null)).to.be.rejectedWith(Error, 'User must not be null');
    });

    it('Delete_2', async function() {
      expect(await User.delete(user)).to.be.equal(true);
    });
  });
});
