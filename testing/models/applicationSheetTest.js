const dotenv = require('dotenv');

dotenv.config();

const chai = require('chai');
const sinonChai = require('sinon-chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(sinonChai);
chai.use(chaiAsPromised);


const {expect} = chai;

const ApplicationSheet = require('../../models/applicationSheet');
const Notice = require('../../models/notice');
const exampleNotice = require('./exampleNotices.json');

const noticeConst = JSON.parse(JSON.stringify(exampleNotice.notice));

const applicationSheetConst = {
  notice_protocol: noticeConst.protocol,
  documents_to_attach: 'dichiarazione sostitutiva di certificazione relativa all\'avvenuto conseguimento del diploma di laurea magistrale, alla votazione riportata ed alla data del suo conseguimento;   - dichiarazione sostitutiva di certificazione all\'iscrizione al corso di dottorato di ricerca con sede presso l\'Università degli Studi di Salerno;   - dichiarazione sostitutiva di certificazione, resa ai sensi del D.P.R. 445/2000, relativa a precedenti attività di tutorato, didattico-integrative, propedeutiche e di recupero in ambito universitario',
};

describe('ApplicationSheet Model', function() {
  let applicationSheet;

  before(async function() {
    this.timeout(3000);
    applicationSheet = JSON.parse(JSON.stringify(applicationSheetConst));
    noticeConst.application_sheet = null;

    await Notice.create(noticeConst);
  });

  after(async function() {
    applicationSheet = JSON.parse(JSON.stringify(applicationSheetConst));

    await Notice.remove(noticeConst);
  });

  describe('Create method', function() {
    after(async function() {
      await ApplicationSheet.remove(applicationSheet);
    });

    it('Create_1', function() {
      expect(ApplicationSheet.create(null)).to.be.rejectedWith(Error, /No Parameters/);
    });

    it('Create_2', async function() {
      expect(ApplicationSheet.create(applicationSheet)).to.be.fulfilled;
    });
  });

  describe('Update method', function() {
    before(async function() {
      await ApplicationSheet.create(applicationSheet);
    });

    after(async function() {
      await ApplicationSheet.remove(applicationSheet);
    });

    it('Update_1', function() {
      expect(ApplicationSheet.update(null)).to.be.rejectedWith(Error, /No Parameters/);
    });

    it('Update_2', function() {
      applicationSheet.notice_protocol = 'Prot. n. 9999999';

      expect(ApplicationSheet.update(applicationSheet)).to.be.rejectedWith(Error, /doesn't exists/);
    });

    it('Update_3', async function() {
      applicationSheet.notice_protocol = applicationSheetConst.notice_protocol;
      applicationSheet.documents_to_attach = 'a';

      expect(ApplicationSheet.update(applicationSheet)).to.be.fulfilled;
    });
  });

  describe('Remove method', function() {
    before(async function() {
      await ApplicationSheet.create(applicationSheet);
    });

    it('Remove_1', function() {
      expect(ApplicationSheet.remove(null)).to.be.rejectedWith(Error, /No Parameters/);
    });

    it('Remove_2', function() {
      expect(ApplicationSheet.remove(applicationSheet)).to.be.fulfilled;
    });
  });

  describe('Exists method', function() {
    it('Exists_1', function() {
      expect(ApplicationSheet.exists(null)).to.be.rejectedWith(Error, /No Parameters/);
    });

    it('Exists_2', function() {
      expect(ApplicationSheet.exists(applicationSheet)).to.be.fulfilled;
    });
  });

  describe('FindByNotice method', function() {
    it('FindByNotice_1', function() {
      expect(ApplicationSheet.findByNotice(null)).to.be.rejectedWith(Error, /No Parameters/);
    });

    it('FindByNotice_2', function() {
      expect(ApplicationSheet.findByNotice('Manzo')).to.be.fulfilled;
    });

    it('FindByNotice_3', function() {
      expect(ApplicationSheet.findByNotice(applicationSheet.notice_protocol)).to.be.fulfilled;
    });
  });

  describe('FindAll', function() {
    it('FindAll_1', function() {
      expect(ApplicationSheet.findAll()).to.be.fulfilled;
    });
  });
});
