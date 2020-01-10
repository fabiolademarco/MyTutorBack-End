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
const studentTable = 'student';
const table = 'candidature';
const db = require('../../../db');
const Candidature = require('../../../models/candidature');

const fakeNotice = 'Bando per candidatura';
const fakeUser = {
  email: 'EmailPerCandidatura',
  password: '...',
  name: 'Name',
  surname: 'Surname',
  role: 'Student',
  verified: '1',
};
const fakeStudent = {
  email: 'EmailPerCandidatura',
  password: '...',
  name: 'Name',
  surname: 'Surname',
  role: 'Student',
  verified: '1',
  registration_number: 'avc',
  birth_date: '1998-03-04 ',
};

const constCandidature = {
  student: JSON.parse(JSON.stringify(fakeStudent)),
  notice_protocol: fakeNotice,
  state: 'Editable',
  last_edit: '1998-09-04 ',
  documents: [
    {
      student: fakeUser.email,
      notice_protocol: fakeNotice,
      file: '123',
      file_name: `${fakeNotice}${fakeUser.email}`,
    }],
};

describe('Candidature model', function() {
  this.timeout(5000);

  before(async function() {
    await db.query(`INSERT INTO ${noticeTable}(protocol) VALUES(?)`, fakeNotice);
    await db.query(`INSERT INTO ${userTable} SET ?`, fakeUser);
    await db.query(`INSERT INTO ${studentTable}(user_email,registration_number,birth_date) VALUES(?,?,?)`, [fakeUser.email, fakeStudent.registration_number, fakeStudent.birth_date]);
  });

  after(async function() {
    await db.query(`DELETE FROM ${noticeTable} WHERE protocol = ?`, fakeNotice);
    await db.query(`DELETE FROM ${userTable} WHERE email = ?`, fakeUser.email);
  });

  describe('Create method', function() {
    let candidature;

    beforeEach(function() {
      candidature = JSON.parse(JSON.stringify(constCandidature));
    });

    afterEach(async function() {
      candidature = JSON.parse(JSON.stringify(constCandidature));
      await db.query(`DELETE FROM ${table} WHERE student = ? AND notice_protocol = ?`, [candidature.student.email, candidature.notice_protocol]);
    });

    it('Create_1', function() {
      return expect(Candidature.create(null)).to.be.rejectedWith(Error, 'Parameter can not be null or undefined');
    });

    it('Create_2', function() {
      delete candidature.student;

      return expect(Candidature.create(candidature)).to.be.rejectedWith(Error);
    });

    it('Create_3', function() {
      return expect(Candidature.create(candidature)).to.be.fulfilled;
    });
  });

  describe('Update method', function() {
    let candidature;

    beforeEach(async function() {
      candidature = JSON.parse(JSON.stringify(constCandidature));
      await db.query(`INSERT INTO ${table}(student,notice_protocol,state,last_edit) VALUES(?,?,?,?)`, [candidature.student.email, candidature.notice_protocol, candidature.state, candidature.last_edit]);
    });

    afterEach(async function() {
      candidature = JSON.parse(JSON.stringify(constCandidature));
      await db.query(`DELETE FROM ${table} WHERE student = ? AND notice_protocol = ?`, [candidature.student.email, candidature.notice_protocol]);
    });

    it('Update_1', function() {
      return expect(Candidature.update(null)).to.be.rejectedWith(Error, 'Parameter can not be null or undefined');
    });

    it('Update_2', function() {
      candidature.student = ',.,';

      return expect(Candidature.update(candidature)).to.be.rejectedWith(Error, 'The candidature doesn\'t exist');
    });

    it('Update_3', function() {
      return expect(Candidature.update(candidature)).to.be.fulfilled;
    });

    it('Update_4', function() {
      candidature.documents = null;

      return expect(Candidature.update(candidature)).to.be.fulfilled;
    });

    it('Update_5', function() {
      candidature.student = null;

      return expect(Candidature.update(candidature)).to.be.rejectedWith(Error, 'Student can not be null or undefined');
    });
  });

  describe('Remove method', function() {
    let candidature;

    beforeEach(async function() {
      candidature = JSON.parse(JSON.stringify(constCandidature));
      await db.query(`INSERT INTO ${table}(student,notice_protocol,state,last_edit) VALUES(?,?,?,?)`, [candidature.student.email, candidature.notice_protocol, candidature.state, candidature.last_edit]);
    });

    afterEach(async function() {
      candidature = JSON.parse(JSON.stringify(constCandidature));
      await db.query(`DELETE FROM ${table} WHERE student = ? AND notice_protocol = ?`, [candidature.student.email, candidature.notice_protocol]);
    });

    it('Remove_1', function() {
      return expect(Candidature.remove(null)).to.be.rejectedWith(Error, 'Parameter can not be null or undefined');
    });

    it('Remove_2', function() {
      return expect(Candidature.remove({student: {email: {hey: 'hey'}}})).to.be.rejectedWith(Error);
    });

    it('Remove_3', function() {
      return expect(Candidature.remove(candidature)).to.be.fulfilled;
    });

    it('Remove_4', function() {
      candidature.student = null;

      return expect(Candidature.remove(candidature)).to.be.rejectedWith(Error, 'Student can not be null or undefined');
    });
  });

  describe('Exists method', function() {
    let candidature;

    beforeEach(async function() {
      candidature = JSON.parse(JSON.stringify(constCandidature));
      await db.query(`INSERT INTO ${table}(student,notice_protocol,state,last_edit) VALUES(?,?,?,?)`, [candidature.student.email, candidature.notice_protocol, candidature.state, candidature.last_edit]);
    });

    afterEach(async function() {
      candidature = JSON.parse(JSON.stringify(constCandidature));
      await db.query(`DELETE FROM ${table} WHERE student = ? AND notice_protocol = ?`, [candidature.student.email, candidature.notice_protocol]);
    });

    it('Exists_1', function() {
      return expect(Candidature.exists(null)).to.be.rejectedWith(Error, 'Parameter can not be null or undefined');
    });

    it('Exists_2', function() {
      return expect(Candidature.exists({student: {email: {hey: 'hey'}}})).to.rejectedWith(Error);
    });

    it('Exists_3', function() {
      return expect(Candidature.exists(candidature)).to.be.fulfilled;
    });

    it('Exists_4', function() {
      candidature.student = null;

      return expect(Candidature.exists(candidature)).to.be.rejectedWith(Error, 'Student can not be null or undefined');
    });
  });

  describe('FindById method', function() {
    let candidature;

    beforeEach(async function() {
      candidature = JSON.parse(JSON.stringify(constCandidature));
      await db.query(`INSERT INTO ${table}(student,notice_protocol,state,last_edit) VALUES(?,?,?,?)`, [candidature.student.email, candidature.notice_protocol, candidature.state, candidature.last_edit]);
    });

    afterEach(async function() {
      candidature = JSON.parse(JSON.stringify(constCandidature));
      await db.query(`DELETE FROM ${table} WHERE student = ? AND notice_protocol = ?`, [candidature.student.email, candidature.notice_protocol]);
    });

    it('FindById_1', function() {
      return expect(Candidature.findById('hey', null)).to.be.rejectedWith(Error, 'Parameters can not be null or undefined');
    });

    it('FindById_2', function() {
      return expect(Candidature.findById('..', '..')).to.be.rejectedWith(Error, 'No result found: .. and ..');
    });

    it('FindById_3', function() {
      return expect(Candidature.findById(candidature.student.email, candidature.notice_protocol)).to.be.fulfilled;
    });
  });

  describe('FindByStudent method', function() {
    let candidature;

    beforeEach(async function() {
      candidature = JSON.parse(JSON.stringify(constCandidature));
      await db.query(`INSERT INTO ${table}(student,notice_protocol,state,last_edit) VALUES(?,?,?,?)`, [candidature.student.email, candidature.notice_protocol, candidature.state, candidature.last_edit]);
    });

    afterEach(async function() {
      candidature = JSON.parse(JSON.stringify(constCandidature));
      await db.query(`DELETE FROM ${table} WHERE student = ? AND notice_protocol = ?`, [candidature.student.email, candidature.notice_protocol]);
    });

    it('FindByStudent_1', function() {
      return expect(Candidature.findByStudent(null)).to.be.rejectedWith(Error, 'Parameter can not be null or undefined');
    });

    it('FindByStudent_2', function() {
      return expect(Candidature.findByStudent({hey: 'hey'})).to.be.rejectedWith(Error);
    });

    it('FindByStudent_3', function() {
      return expect(Candidature.findByStudent(candidature.student.email)).to.be.fulfilled;
    });
  });

  describe('FindByNotice method', function() {
    let candidature;

    beforeEach(async function() {
      candidature = JSON.parse(JSON.stringify(constCandidature));
      await db.query(`INSERT INTO ${table}(student,notice_protocol,state,last_edit) VALUES(?,?,?,?)`, [candidature.student.email, candidature.notice_protocol, candidature.state, candidature.last_edit]);
    });

    afterEach(async function() {
      candidature = JSON.parse(JSON.stringify(constCandidature));
      await db.query(`DELETE FROM ${table} WHERE student = ? AND notice_protocol = ?`, [candidature.student.email, candidature.notice_protocol]);
    });

    it('FindByNotice_1', function() {
      return expect(Candidature.findByNotice(null)).to.be.rejectedWith(Error, 'Parameter can not be null or undefined');
    });

    it('FindByNotice_2', function() {
      return expect(Candidature.findByNotice({hey: 'hey'})).to.be.rejectedWith(Error);
    });

    it('FindByNotice_3', function() {
      return expect(Candidature.findByNotice(candidature.notice_protocol)).to.be.fulfilled;
    });
  });

  describe('FindAll method', function() {
    let candidature;

    beforeEach(async function() {
      candidature = JSON.parse(JSON.stringify(constCandidature));
      await db.query(`INSERT INTO ${table}(student,notice_protocol,state,last_edit) VALUES(?,?,?,?)`, [candidature.student.email, candidature.notice_protocol, candidature.state, candidature.last_edit]);
    });

    afterEach(async function() {
      candidature = JSON.parse(JSON.stringify(constCandidature));
      await db.query(`DELETE FROM ${table} WHERE student = ? AND notice_protocol = ?`, [candidature.student.email, candidature.notice_protocol]);
    });

    it('FindAll_1', function() {
      return expect(Candidature.findAll()).to.be.fulfilled;
    });
  });
});
