const dotenv = require('dotenv');

dotenv.config();

const chai = require('chai');
const sinonChai = require('sinon-chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(sinonChai);
chai.use(chaiAsPromised);

const {expect} = chai;

const Rating = require('../../models/rating');
const Student = require('../../models/student');
const db = require('../../db');
const table = 'rating';


const studentConst = {
  email: 'f.migliaro69@studenti.unisa.it',
  name: 'Francesco',
  surname: 'Migliaro',
  role: 'Student',
  verified: '1',
  registration_number: 'aaaaBBBB11112222',
  password: 'Abcde123',
  birth_date: '1998-03-03 ',
};

const ratingConst = {
  student: studentConst,
  assignment_id: 3,
  titles_score: 10,
  interview_score: 10,
};

describe('Rating model', function() {
  let rating;

  describe('Create method', function() {
    beforeEach(function() {
      rating = JSON.parse(JSON.stringify(ratingConst));
    });

    afterEach(async function() {
      rating = JSON.parse(JSON.stringify(ratingConst));
      await db.query(`DELETE FROM ${table} WHERE student=? AND assignment_id=?`, [rating.student.email, rating.assignment_id]);
    });

    it('Create_1', async () => {
      await expect(Rating.create(null)).to.be.rejectedWith(Error, /The rating must not be null/);
    });

    it('Create_2', async function() {
      rating.student.email = 'tralalalalaliday';
      await expect(Rating.create(rating)).to.be.rejectedWith(Error);
    });

    it('Create_3', async function() {
      expect(Rating.create(rating)).to.be.fulfilled;
    });
  });

  describe('Update method', function() {
    beforeEach(async function() {
      rating = JSON.parse(JSON.stringify(ratingConst));

      await Rating.create(rating);
    });

    afterEach(async function() {
      rating = JSON.parse(JSON.stringify(ratingConst));
      await db.query(`DELETE FROM ${table} WHERE student=? AND assignment_id=?`, [rating.student.email, rating.assignment_id]);
    });

    it('Update_1', async function() {
      await expect(Rating.update(null)).to.be.rejectedWith(Error, /The rating must not be null/);
    });

    it('Update_2', async function() {
      rating.assignment_id = 0;
      await expect(Rating.update(rating)).to.be.rejectedWith(Error, /The rating doesn't exists/);
    });

    it('Update_3', async function() {
      expect(Rating.update(rating)).to.be.fulfilled;
    });
  });

  describe('Remove method', function() {
    beforeEach(async function() {
      rating = JSON.parse(JSON.stringify(ratingConst));

      await Rating.create(rating);
    });

    afterEach(async function() {
      rating = JSON.parse(JSON.stringify(ratingConst));
      await db.query(`DELETE FROM ${table} WHERE student=? AND assignment_id=?`, [rating.student.email, rating.assignment_id]);
    });

    it('Remove_1', async function() {
      await expect(Rating.remove(null)).to.be.rejectedWith(Error, /The rating must not be null/);
    });

    it('Remove_2', async function() {
      expect(Rating.remove(rating)).to.be.fulfilled;
    });
  });

  describe('Exists method', function() {
    beforeEach(async function() {
      rating = JSON.parse(JSON.stringify(ratingConst));

      await Rating.create(rating);
    });

    afterEach(async function() {
      rating = JSON.parse(JSON.stringify(ratingConst));
      await db.query(`DELETE FROM ${table} WHERE student=? AND assignment_id=?`, [rating.student.email, rating.assignment_id]);
    });

    it('Exists_1', async function() {
      await expect(Rating.exists(null)).to.be.rejectedWith(Error, /The rating must not be null/);
    });

    it('Exists_2', async function() {
      expect(Rating.exists(rating)).to.be.fulfilled;
    });
  });

  describe('FindById method', function() {
    beforeEach(async function() {
      rating = JSON.parse(JSON.stringify(ratingConst));

      await Rating.create(rating);
      await Student.create(studentConst);
    });

    afterEach(async function() {
      rating = JSON.parse(JSON.stringify(ratingConst));
      await db.query(`DELETE FROM ${table} WHERE student=? AND assignment_id=?`, [rating.student.email, rating.assignment_id]);
      await db.query(`DELETE FROM student WHERE user_email=?`, [ratingConst.student.email]);
    });

    it('FindById_1', async function() {
      await expect(Rating.findById(null)).to.be.rejectedWith(Error, /The rating must not be null/);
    });

    it('FindById_2', async function() {
      rating.assignment_id = 0;
      await expect(Rating.findById(rating.student.email, rating.assignment_id)).to.be.rejectedWith(Error, 'No result was found');
    });

    it('FindById_3', function() {
      expect(Rating.findById(rating.student.name, rating.assignment_id)).to.be.fulfilled;
    });
  });

  describe('FindByStudent method', function() {
    beforeEach(async function() {
      rating = JSON.parse(JSON.stringify(ratingConst));

      await Rating.create(rating);
      await Student.create(studentConst);
    });

    afterEach(async function() {
      rating = JSON.parse(JSON.stringify(ratingConst));
      await db.query(`DELETE FROM ${table} WHERE student=? AND assignment_id=?`, [rating.student.email, rating.assignment_id]);
      await db.query(`DELETE FROM student WHERE user_email=?`, [ratingConst.student.email]);
    });

    it('FindByStudent_1', async function() {
      await expect(Rating.findByStudent(null)).to.be.rejectedWith(Error, /The rating must not be null/);
    });

    it('FindByStudent_2', async function() {
      await expect(Rating.findByStudent(rating.student.email)).to.be.fulfilled;
    });
  });

  describe('FindByAssignment method', function() {
    beforeEach(async function() {
      rating = JSON.parse(JSON.stringify(ratingConst));

      await Rating.create(rating);
      await Student.create(studentConst);
    });

    afterEach(async function() {
      rating = JSON.parse(JSON.stringify(ratingConst));
      await db.query(`DELETE FROM ${table} WHERE student=? AND assignment_id=?`, [rating.student.email, rating.assignment_id]);
      await db.query(`DELETE FROM student WHERE user_email=?`, [ratingConst.student.email]);
    });

    it('FindByAssignment_1', async function() {
      await expect(Rating.findByAssignment(null)).to.be.rejectedWith(Error, /The rating must not be null/);
    });

    it('FindByAssignment_2', async function() {
      await expect(Rating.findByAssignment(rating.student.assignment_id)).to.be.fulfilled;
    });
  });

  describe('FindByProtocol method', function() {
    beforeEach(async function() {
      rating = JSON.parse(JSON.stringify(ratingConst));

      await Rating.create(rating);
      await Student.create(studentConst);
    });

    afterEach(async function() {
      rating = JSON.parse(JSON.stringify(ratingConst));
      await db.query(`DELETE FROM ${table} WHERE student=? AND assignment_id=?`, [rating.student.email, rating.assignment_id]);
      await db.query(`DELETE FROM student WHERE user_email=?`, [ratingConst.student.email]);
    });

    it('FindByProtocol_1', async function() {
      await expect(Rating.findByProtocol(null)).to.be.rejectedWith(Error, /The rating must not be null/);
    });

    it('FindByProtocol_2', async function() {
      await expect(Rating.findByProtocol('Prot. n. 0279008')).to.be.fulfilled;
    });
  });
});
