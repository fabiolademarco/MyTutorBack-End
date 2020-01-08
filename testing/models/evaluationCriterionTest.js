const dotenv = require('dotenv');

dotenv.config();

const chai = require('chai');
const sinonChai = require('sinon-chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(sinonChai);
chai.use(chaiAsPromised);


const {expect} = chai;

const noticeTable = 'notice';
const table = 'evaluation_criterion';
const db = require('../../db');
const fakeNotice = 'Bando per evaluationCriterion';

const EvaluationCriterion = require('../../models/evaluationCriterion');

const evaluationCriterion = {
  notice_protocol: fakeNotice,
  name: 'criterio.........',
  max_score: 10,
};

describe('EvaluationCriterion model', function() {
  before(async function() {
    await db.query(`INSERT INTO ${noticeTable}(protocol) VALUES(?)`, fakeNotice);
  });

  after(async function() {
    await db.query(`DELETE FROM ${noticeTable} WHERE protocol = ?`, fakeNotice);
  });

  describe('Create method', function() {
    let criterion;

    beforeEach(function() {
      criterion = JSON.parse(JSON.stringify(evaluationCriterion));
    });

    afterEach(async function() {
      criterion = JSON.parse(JSON.stringify(evaluationCriterion));
      await db.query(`DELETE FROM ${table} WHERE notice_protocol = ?`, criterion.notice_protocol);
    });

    it('Create_1', async function() {
      await expect(EvaluationCriterion.create(null)).to.be.rejectedWith(Error, 'No parameters');
    });

    it('Create_2', async function() {
      await expect(EvaluationCriterion.create({hey: 'hey'})).to.be.rejectedWith(Error);
    });

    it('Create_3', async function() {
      await expect(EvaluationCriterion.create(criterion)).to.be.fulfilled;
    });
  });

  describe('Update method', function() {
    let criterion;

    beforeEach(async function() {
      criterion = JSON.parse(JSON.stringify(evaluationCriterion));
      await db.query(`INSERT INTO ${table} SET ?`, criterion);
    });

    afterEach(async function() {
      criterion = JSON.parse(JSON.stringify(evaluationCriterion));
      await db.query(`DELETE FROM ${table} WHERE notice_protocol = ?`, criterion.notice_protocol);
    });

    it('Update_1', async function() {
      await expect(EvaluationCriterion.update(null)).to.be.rejectedWith(Error, 'No parameters');
    });

    it('Update_2', async function() {
      criterion.notice_protocol = '..';
      await expect(EvaluationCriterion.update(criterion)).to.be.rejectedWith(Error, 'The evaluation criterion doesn\'t exists');
    });

    it('Update_3', async function() {
      await expect(EvaluationCriterion.update(criterion)).to.be.fulfilled;
    });
  });

  describe('Remove method', function() {
    let criterion;

    beforeEach(async function() {
      criterion = JSON.parse(JSON.stringify(evaluationCriterion));
      await db.query(`INSERT INTO ${table} SET ?`, criterion);
    });

    afterEach(async function() {
      criterion = JSON.parse(JSON.stringify(evaluationCriterion));
      await db.query(`DELETE FROM ${table} WHERE notice_protocol = ?`, criterion.notice_protocol);
    });

    it('Remove_1', async function() {
      await expect(EvaluationCriterion.remove(null)).to.be.rejectedWith(Error, 'No parameters');
    });

    it('Remove_2', async function() {
      await expect(EvaluationCriterion.remove(criterion)).to.be.fulfilled;
    });
  });

  describe('Exists method', function() {
    let criterion;

    beforeEach(async function() {
      criterion = JSON.parse(JSON.stringify(evaluationCriterion));
      await db.query(`INSERT INTO ${table} SET ?`, criterion);
    });

    afterEach(async function() {
      criterion = JSON.parse(JSON.stringify(evaluationCriterion));
      await db.query(`DELETE FROM ${table} WHERE notice_protocol = ?`, criterion.notice_protocol);
    });

    it('Exists_1', async function() {
      await expect(EvaluationCriterion.exists(null)).to.be.rejectedWith(Error, 'No parameters');
    });

    it('Exists_2', async function() {
      await expect(EvaluationCriterion.exists(criterion)).to.be.fulfilled;
    });
  });

  describe('FindById method', function() {
    let criterion;

    beforeEach(async function() {
      criterion = JSON.parse(JSON.stringify(evaluationCriterion));
      await db.query(`INSERT INTO ${table} SET ?`, criterion);
    });

    afterEach(async function() {
      criterion = JSON.parse(JSON.stringify(evaluationCriterion));
      await db.query(`DELETE FROM ${table} WHERE notice_protocol = ?`, criterion.notice_protocol);
    });

    it('FindById_1', async function() {
      await expect(EvaluationCriterion.findById(criterion.name, null)).to.be.rejectedWith(Error, 'No parameters');
    });

    it('FindById_2', async function() {
      await expect(EvaluationCriterion.findById(criterion.name, {hey: 'hey'})).to.be.rejectedWith(Error);
    });

    it('FindById_3', async function() {
      await expect(EvaluationCriterion.findById('---', criterion.notice_protocol)).to.be.fulfilled;
    });

    it('FindById_4', async function() {
      await expect(EvaluationCriterion.findById(criterion.name, criterion.notice_protocol)).to.be.fulfilled;
    });
  });

  describe('FindByNotice method', function() {
    let criterion;

    beforeEach(async function() {
      criterion = JSON.parse(JSON.stringify(evaluationCriterion));
      await db.query(`INSERT INTO ${table} SET ?`, criterion);
    });

    afterEach(async function() {
      criterion = JSON.parse(JSON.stringify(evaluationCriterion));
      await db.query(`DELETE FROM ${table} WHERE notice_protocol = ?`, criterion.notice_protocol);
    });

    it('FindByNotice_1', async function() {
      await expect(EvaluationCriterion.findByNotice(null)).to.be.rejectedWith(Error, 'No parameters');
    });

    it('FindByNotice_2', async function() {
      await expect(EvaluationCriterion.findByNotice({hey: 'hey'})).to.be.rejectedWith(Error);
    });

    it('FindByNotice_3', async function() {
      await expect(EvaluationCriterion.findByNotice(criterion.notice_protocol)).to.be.fulfilled;
    });
  });

  describe('FindAll method', async function() {
    let criterion;

    beforeEach(async function() {
      criterion = JSON.parse(JSON.stringify(evaluationCriterion));
      await db.query(`INSERT INTO ${table} SET ?`, criterion);
    });

    afterEach(async function() {
      criterion = JSON.parse(JSON.stringify(evaluationCriterion));
      await db.query(`DELETE FROM ${table} WHERE notice_protocol = ?`, criterion.notice_protocol);
    });

    it('FindAll_1', async function() {
      await expect(EvaluationCriterion.findAll()).to.be.fulfilled;
    });
  });
});
