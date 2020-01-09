const dotenv = require('dotenv');

dotenv.config();

const chai = require('chai');
const sinonChai = require('sinon-chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(sinonChai);
chai.use(chaiAsPromised);

const {expect} = chai;

const Student = require('../../models/student');

const constStudent = {
  email: 'provaStudenteEmail',
  password: 'Password123',
  name: 'Cristian',
  surname: 'Barletta',
  role: 'Student',
  verified: '1',
  registration_number: '0512105069',
  birth_date: '1998-03-12 ',
};

describe('Student model', function() {
  this.timeout(5000);

  describe('Create method', function() {
    let student;

    beforeEach(function() {
      student = JSON.parse(JSON.stringify(constStudent));
    });

    afterEach(async function() {
      student = JSON.parse(JSON.stringify(constStudent));
      await Student.delete(student);
    });

    it('Create_1', async function() {
      await expect(Student.create(null)).to.be.rejectedWith(Error, 'The parameter student can not be null or undefined');
    });

    it('Create_2', async function() {
      await expect(Student.create({hey: 'hey'})).to.be.rejectedWith(Error);
    });

    it('Create_3', async function() {
      await expect(Student.create(student)).to.be.fulfilled;
    });
  });

  describe('Update method', function() {
    let student;

    beforeEach(async function() {
      student = JSON.parse(JSON.stringify(constStudent));
      await Student.create(student);
    });

    afterEach(async function() {
      student = JSON.parse(JSON.stringify(constStudent));
      await Student.delete(student);
    });

    it('Update_1', async function() {
      await expect(Student.update(null)).to.be.rejectedWith(Error, 'The parameter student can not be null or undefined');
    });

    it('Update_2', async function() {
      student.email = '...non esiste';
      await expect(Student.update(student)).to.be.rejectedWith(Error, 'The student doesn\'t exist');
    });

    it('Update_3', async function() {
      delete student.registration_number;
      delete student.birth_date;
      await expect(Student.update(student)).to.be.rejectedWith(Error);
    });

    it('Update_4', async function() {
      await expect(Student.update(student)).to.be.fulfilled;
    });
  });

  describe('FindByEmail', function() {
    beforeEach(async function() {
      student = JSON.parse(JSON.stringify(constStudent));
      await Student.create(student);
    });

    afterEach(async function() {
      student = JSON.parse(JSON.stringify(constStudent));
      await Student.delete(student);
    });

    it('FindByEmail_1', async function() {
      await expect(Student.findByEmail(null)).to.be.rejectedWith(Error, 'The parameter email can not be null or undefined');
    });

    it('FindByEmail_2', async function() {
      student.email = 'nulla...';
      await expect(Student.findByEmail(student.email)).to.be.rejectedWith(Error, `No result found: ${student.email}`);
    });

    it('FindByEmail_3', async function() {
      await expect(Student.findByEmail({hey: 'hey'})).to.be.rejectedWith(Error);
    });

    it('FindByEmail_4', async function() {
      await expect(Student.findByEmail(student.email)).to.be.fulfilled;
    });
  });

  describe('FindAll method', function() {
    it('FindAll_1', async function() {
      await expect(Student.findAll()).to.be.fulfilled;
    });
  });

  describe('MatchUser method', function() {
    beforeEach(async function() {
      student = JSON.parse(JSON.stringify(constStudent));
      await Student.create(student);
    });

    afterEach(async function() {
      student = JSON.parse(JSON.stringify(constStudent));
      await Student.delete(student);
    });

    it('MatchUser_1', async function() {
      await expect(Student.matchUser(student.email, null)).to.be.rejectedWith(Error, 'Email or Password can not be null or undefined');
    });

    it('MatchUser_2', async function() {
      await expect(Student.matchUser(student.email, 'Non la password giusta')).to.be.fulfilled;
    });

    it('MatchUser_3', async function() {
      await expect(Student.matchUser(student.email, 'Password123')).to.be.fulfilled;
    });
  });

  describe('Search method', function() {
    it('Search_1', async function() {
      await expect(Student.search({})).to.be.fulfilled;
    });
  });
});
