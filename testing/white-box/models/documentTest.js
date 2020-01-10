const dotenv = require('dotenv');

dotenv.config();

const chai = require('chai');
const sinonChai = require('sinon-chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(sinonChai);
chai.use(chaiAsPromised);

const {expect} = chai;

const Document = require('../../../models/document');
const Candidature = require('../../../models/candidature');
const Student = require('../../../models/student');
const Notice = require('../../../models/notice');
const exampleNotice = require('./exampleNotices.json');

const noticeConst = JSON.parse(JSON.stringify(exampleNotice.notice));

const studentConst = {
  email: 'g.vicidomini69@studenti.unisa.it',
  name: 'Giannandrea',
  surname: 'Vicidomini',
  role: 'Student',
  verified: '1',
  registration_number: 'aaaaB1122',
  password: 'Prumess29',
  birth_date: '1998-03-03 ',
};

const documentConst = {
  student: studentConst.email,
  notice_protocol: noticeConst.protocol,
  file_name: 'CerchiaGiovanni.pdf',
  file: 5648789651648,
};

const candidatureConst = {
  student: studentConst,
  notice_protocol: noticeConst.protocol,
  state: Candidature.States.EDITABLE,
  last_edit: '2019-12-01',
  documents: [],
};

describe('Document model', function() {
  this.timeout(5000);

  let aDocument;

  before(async function() {
    noticeConst.articles = null;
    noticeConst.evaluation_criteria = null;
    noticeConst.assignments = null;
    noticeConst.application_sheet = null;

    await Notice.create(noticeConst);
    await Student.create(studentConst);
    await Candidature.create(candidatureConst);
  });

  after(async function() {
    await Notice.remove(noticeConst);
    await Student.delete(studentConst);
  });

  describe('Create method', function() {
    before(function() {
      aDocument = JSON.parse(JSON.stringify(documentConst));
    });

    after(async function() {
      await Document.remove(aDocument, candidatureConst);
    });

    it('Create_1', function() {
      return expect(Document.create(null, null)).to.be.rejectedWith(Error, /null/);
    });

    it('Create_2', function() {
      return expect(Document.create(aDocument, candidatureConst)).to.be.fulfilled;
    });
  });

  describe('Update method', function() {
    before(async function() {
      aDocument = JSON.parse(JSON.stringify(documentConst));

      await Document.create(aDocument, candidatureConst);
    });

    after(async function() {
      aDocument = JSON.parse(JSON.stringify(documentConst));

      await Document.remove(aDocument, candidatureConst);
    });

    it('Update_1', function() {
      return expect(Document.update(null, null)).to.be.rejectedWith(Error, /null/);
    });

    it('Update_2', function() {
      aDocument.file_name = 'VespoliMario.pdf';

      return expect(Document.update(aDocument, candidatureConst)).to.be.rejectedWith(Error, /doesn't exists/);
    });

    it('Update_3', function() {
      aDocument = JSON.parse(JSON.stringify(documentConst));
      aDocument.file = 292929292929;

      return expect(Document.update(aDocument, candidatureConst)).to.be.fulfilled;
    });
  });

  describe('Remove method', function() {
    before(async function() {
      aDocument = JSON.parse(JSON.stringify(documentConst));

      await Document.create(aDocument, candidatureConst);
    });

    it('Remove_1', function() {
      return expect(Document.remove(null, null)).to.be.rejectedWith(Error, /null/);
    });

    it('Remove_2', function() {
      return expect(Document.remove(aDocument, candidatureConst)).to.be.fulfilled;
    });
  });

  describe('Exists method', function() {
    it('Exists_1', function() {
      return expect(Document.exists(null, null)).to.be.rejectedWith(Error, /null/);
    });

    it('Exists_2', function() {
      return expect(Document.exists(aDocument, candidatureConst)).to.be.fulfilled;
    });
  });

  describe('FindById method', function() {
    before(async function() {
      aDocument = JSON.parse(JSON.stringify(documentConst));

      await Document.create(aDocument, candidatureConst);
    });

    after(async function() {
      aDocument = JSON.parse(JSON.stringify(documentConst));

      await Document.remove(aDocument, candidatureConst);
    });

    it('FindById_1', function() {
      return expect(Document.findById(null, null, null)).to.be.rejectedWith(Error, /null/);
    });

    it('FindById_2', function() {
      return expect(Document.findById('nome mai vero', studentConst.email, noticeConst.protocol)).to.be.fulfilled;
    });

    it('FindById_3', function() {
      return expect(Document.findById(documentConst.file_name, studentConst.email, noticeConst.protocol)).to.be.fulfilled;
    });
  });

  describe('FindByNotice method', function() {
    it('FindByNotice_1', function() {
      return expect(Document.findByNotice(null)).to.be.rejectedWith(Error, /null/);
    });

    it('FindByNotice_2', function() {
      return expect(Document.findByNotice(noticeConst.protocol)).to.be.fulfilled;
    });
  });

  describe('FindByCandidature method', function() {
    it('FindByCandidature_1', function() {
      return expect(Document.findByCandidature(null)).to.be.rejectedWith(Error, /null/);
    });

    it('FindByCandidature_2', function() {
      return expect(Document.findByCandidature(candidatureConst)).to.be.fulfilled;
    });
  });

  describe('FindByStudent method', function() {
    it('FindByStudent_1', function() {
      return expect(Document.findByStudent(null)).to.be.rejectedWith(Error, /null/);
    });

    it('FindByStudent_2', function() {
      return expect(Document.findByStudent(studentConst.email)).to.be.fulfilled;
    });
  });

  describe('FindAll method', function() {
    it('FindAll_1', function() {
      return expect(Document.findAll()).to.be.fulfilled;
    });
  });
});
