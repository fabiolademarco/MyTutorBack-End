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
  });
});
