const dotenv = require('dotenv');

dotenv.config();

const chai = require('chai');
const sinonChai = require('sinon-chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(sinonChai);
chai.use(chaiAsPromised);


const {expect} = chai;

const Assignment = require('../../models/assignment');
const Notice = require('../../models/notice');
const exampleNotice = require('./exampleNotices.json');

const noticeConst = JSON.parse(JSON.stringify(exampleNotice.notice));

const assignmentConst = {
  id: null,
  notice_protocol: noticeConst.protocol,
  student: null,
  code: 'DSA/00',
  activity_description: 'Tutorato DSA',
  total_number_hours: 26,
  title: Assignment.titles.PHD,
  hourly_cost: 25,
  ht_fund: null,
  state: Assignment.states.UNASSIGNED,
  note: null,
};

describe('Assignment model', function() {
  this.timeout(5000);

  let assignment;

  before(async function() {
    await Notice.create(noticeConst);
  });

  after(async function() {
    await Notice.remove(noticeConst);
  });

  describe('Create method', function() {
    after(async function() {
      assignment = JSON.parse(JSON.stringify(assignmentConst));

      await Assignment.remove(assignment);
    });

    it('Create_1', function() {
      expect(Assignment.create(null)).to.be.rejectedWith(Error, /No Parameters/);
    });

    it('Create_2', async function() {
      assignmentConst.id = (await Assignment.create(assignmentConst)).id;
      expect(assignmentConst.id).to.be.not.null;
    });
  });

  describe('Update method', function() {
    before(async function() {
      assignmentConst.id = (await Assignment.create(assignmentConst)).id;

      assignment = JSON.parse(JSON.stringify(assignmentConst));
    });

    after(async function() {
      assignment = JSON.parse(JSON.stringify(assignmentConst));

      await Assignment.remove(assignment);
    });

    it('Update_1', function() {
      expect(Assignment.update(null)).to.be.rejectedWith(Error, /No Parameters/);
    });

    it('Update_2', function() {
      assignment.id = 'Manzo';

      expect(Assignment.update(assignment)).to.be.rejectedWith(Error, /doesn't exists/);
    });

    it('Update_3', function() {
      assignment.id = assignmentConst.id;

      expect(Assignment.update(assignment)).to.be.fulfilled;
    });
  });

  describe('Remove method', function() {
    before(async function() {
      assignmentConst.id = (await Assignment.create(assignment)).id;

      assignment = JSON.parse(JSON.stringify(assignmentConst));
    });

    it('Remove_1', function() {
      expect(Assignment.remove(null)).to.be.rejectedWith(Error, /No Parameters/);
    });

    it('Remove_2', function() {
      expect(Assignment.remove(assignment)).to.be.fulfilled;
    });
  });

  describe('Exists method', function() {
    it('Exists_1', function() {
      expect(Assignment.exists(null)).to.be.rejectedWith(Error, /No parameters/);
    });

    it('Exists_2', function() {
      expect(Assignment.exists(assignment)).to.be.fulfilled;
    });
  });

  describe('FindById method', function() {
    before(async function() {
      assignmentConst.id = (await Assignment.create(assignment)).id;

      assignment = JSON.parse(JSON.stringify(assignmentConst));
    });

    after(async function() {
      assignment = JSON.parse(JSON.stringify(assignmentConst));

      await Assignment.remove(assignment);
    });

    it('FindById_1', function() {
      expect(Assignment.findById(null)).to.be.rejectedWith(Error, /No Parameters/);
    });

    it('FindById_2', function() {
      expect(Assignment.findById('Pepp1')).to.be.rejectedWith(Error, /No result/);
    });

    it('FindById_3', function() {
      expect(Assignment.findById(assignment.id)).to.be.fulfilled;
    });
  });

  describe('FindByNotice method', function() {
    it('FindByNotice_1', function() {
      expect(Assignment.findByNotice(null)).to.be.rejectedWith(Error, /No Parameters/);
    });

    it('FindByNotice_2', function() {
      expect(Assignment.findByNotice(assignment.notice_protocol)).to.be.fulfilled;
    });
  });

  describe('FindByStudent method', function() {
    it('FindByStudent_1', function() {
      expect(Assignment.findByStudent(null)).to.be.rejectedWith(Error, /No Parameters/);
    });

    it('FindByStudent_2', function() {
      expect(Assignment.findByStudent('rob.brun@studenti.unisa.it')).to.be.fulfilled;
    });
  });

  describe('FindAll method', function() {
    it('FindAll_1', function() {
      expect(Assignment.findAll()).to.be.fulfilled;
    });
  });

  describe('Search_method', function() {
    const filter = {
      code: '100ann',
      noticeProtocol: '200',
      state: 'Prova',
      student: 'l.carpentieri0@studenti.unisa.it',
    };

    it('Search_1', function() {
      expect(Assignment.search(filter)).to.be.fulfilled;
    });
  });
});
