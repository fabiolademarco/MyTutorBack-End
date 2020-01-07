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


const student = {
  email: 'f.migliaro69@studenti.unisa.it',
  name: 'Francesco',
  surname: 'Migliaro',
  role: 'Student',
  verified: '1',
  registration_number: 'aaaaBBBB11112222',
  password: 'Abcde123',
  birth_date: '1998-03-03 ',
};

const ratingTemp = {
  student: {
    email: 'f.migliaro69@studenti.unisa.it',
    name: 'Francesco',
    surname: 'Migliaro',
    role: 'Student',
    verified: '1',
    registration_number: 'aaaaBBBB11112222',
    password: 'Abcde123',
    birth_date: '1998-03-03 ',
  },
  assignment_id: 3,
  titles_score: 10,
  interview_score: 10,
};

describe('Rating test', function() {
  let rating;

  describe('Create Method', function() {
    beforeEach(function() {
      rating = JSON.parse(JSON.stringify(ratingTemp));
    });

    afterEach(async function() {
      rating = JSON.parse(JSON.stringify(ratingTemp));
      await db.query(`DELETE FROM ${table} WHERE student=? AND assignment_id=?`, [rating.student.email, rating.assignment_id]);
    });

    it('create 1', async () => {
      await expect(Rating.create(null)).to.be.rejectedWith(Error, /The rating must not be null/);
    });

    it('create 2', async function() {
      rating.student.email = 'tralalalalaliday';
      await expect(Rating.create(rating)).to.be.rejectedWith(Error);
    });

    it('create 3', async function() {
      expect(Rating.create(rating)).to.be.fulfilled;
    });
  });

  describe('Update Method', function() {
    beforeEach(async function() {
      rating = JSON.parse(JSON.stringify(ratingTemp));

      await Rating.create(rating);
    });

    afterEach(async function() {
      rating = JSON.parse(JSON.stringify(ratingTemp));
      await db.query(`DELETE FROM ${table} WHERE student=? AND assignment_id=?`, [rating.student.email, rating.assignment_id]);
    });

    it('Update 1', async function() {
      await expect(Rating.update(null)).to.be.rejectedWith(Error, /The rating must not be null/);
    });

    it('Update 2', async function() {
      rating.assignment_id = 0;
      await expect(Rating.update(rating)).to.be.rejectedWith(Error, /The rating doesn't exists/);
    });

    it('Update 3', async function() {
      expect(Rating.update(rating)).to.be.fulfilled;
    });
  });

  describe('Remove Method', function() {
    beforeEach(async function() {
      rating = JSON.parse(JSON.stringify(ratingTemp));

      await Rating.create(rating);
    });

    afterEach(async function() {
      rating = JSON.parse(JSON.stringify(ratingTemp));
      await db.query(`DELETE FROM ${table} WHERE student=? AND assignment_id=?`, [rating.student.email, rating.assignment_id]);
    });

    it('remove 1', async function() {
      await expect(Rating.remove(null)).to.be.rejectedWith(Error, /The rating must not be null/);
    });

    it('remove 2', async function() {
      expect(Rating.remove(rating)).to.be.fulfilled;
    });
  });

  describe('exists Method', function() {
    beforeEach(async function() {
      rating = JSON.parse(JSON.stringify(ratingTemp));

      await Rating.create(rating);
    });

    afterEach(async function() {
      rating = JSON.parse(JSON.stringify(ratingTemp));
      await db.query(`DELETE FROM ${table} WHERE student=? AND assignment_id=?`, [rating.student.email, rating.assignment_id]);
    });

    it('exists 1', async function() {
      await expect(Rating.exists(null)).to.be.rejectedWith(Error, /The rating must not be null/);
    });

    it('exists 2', async function() {
      expect(Rating.exists(rating)).to.be.fulfilled;
    });
  });

  describe('Find by id Method', function() {
    beforeEach(async function() {
      rating = JSON.parse(JSON.stringify(ratingTemp));

      await Rating.create(rating);
      await Student.create(student);
    });

    afterEach(async function() {
      rating = JSON.parse(JSON.stringify(ratingTemp));
      await db.query(`DELETE FROM ${table} WHERE student=? AND assignment_id=?`, [rating.student.email, rating.assignment_id]);
      await db.query(`DELETE FROM student WHERE user_email=?`, [ratingTemp.student.email]);
    });

    it('Find by id 1', async function() {
      await expect(Rating.findById(null)).to.be.rejectedWith(Error, /The rating must not be null/);
    });

    it('Find by d 2', async function() {
      rating.assignment_id = 0;
      await expect(Rating.findById(rating.student.email, rating.assignment_id)).to.be.rejectedWith(Error, 'No result was found');
    });

    it('Find by id 3', function() {
      expect(Rating.findById(rating.student.name, rating.assignment_id)).to.be.fulfilled;
    });
  });

  describe('Find by student Method', function() {
    beforeEach(async function() {
      rating = JSON.parse(JSON.stringify(ratingTemp));

      await Rating.create(rating);
      await Student.create(student);
    });

    afterEach(async function() {
      rating = JSON.parse(JSON.stringify(ratingTemp));
      await db.query(`DELETE FROM ${table} WHERE student=? AND assignment_id=?`, [rating.student.email, rating.assignment_id]);
      await db.query(`DELETE FROM student WHERE user_email=?`, [ratingTemp.student.email]);
    });

    it('Find by student 1', async function() {
      await expect(Rating.findByStudent(null)).to.be.rejectedWith(Error, /The rating must not be null/);
    });

    it('Find by student 2', async function() {
      await expect(Rating.findByStudent(rating.student.email)).to.be.fulfilled;
    });
  });

  describe('Find by assignment Method', function() {
    beforeEach(async function() {
      rating = JSON.parse(JSON.stringify(ratingTemp));

      await Rating.create(rating);
      await Student.create(student);
    });

    afterEach(async function() {
      rating = JSON.parse(JSON.stringify(ratingTemp));
      await db.query(`DELETE FROM ${table} WHERE student=? AND assignment_id=?`, [rating.student.email, rating.assignment_id]);
      await db.query(`DELETE FROM student WHERE user_email=?`, [ratingTemp.student.email]);
    });

    it('Find by assignment 1', async function() {
      await expect(Rating.findByAssignment(null)).to.be.rejectedWith(Error, /The rating must not be null/);
    });

    it('Find by assignment 2', async function() {
      await expect(Rating.findByAssignment(rating.student.assignment_id)).to.be.fulfilled;
    });
  });

  describe('Find by protocol Method', function() {
    beforeEach(async function() {
      rating = JSON.parse(JSON.stringify(ratingTemp));

      await Rating.create(rating);
      await Student.create(student);
    });

    afterEach(async function() {
      rating = JSON.parse(JSON.stringify(ratingTemp));
      await db.query(`DELETE FROM ${table} WHERE student=? AND assignment_id=?`, [rating.student.email, rating.assignment_id]);
      await db.query(`DELETE FROM student WHERE user_email=?`, [ratingTemp.student.email]);
    });

    it('Find by protocol 1', async function() {
      await expect(Rating.findByProtocol(null)).to.be.rejectedWith(Error, /The rating must not be null/);
    });

    it('Find by protocol 2', async function() {
      await expect(Rating.findByProtocol('Prot. n. 0279008')).to.be.fulfilled;
    });
  });
});
