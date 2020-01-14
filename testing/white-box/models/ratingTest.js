const dotenv = require('dotenv');

dotenv.config();

const chai = require('chai');
const sinonChai = require('sinon-chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(sinonChai);
chai.use(chaiAsPromised);

const {expect} = chai;

const Rating = require('../../../models/rating');
const Student = require('../../../models/student');
const Notice = require('../../../models/notice');
const exampleNotice = require('./exampleNotices.json');

const noticeConst = JSON.parse(JSON.stringify(exampleNotice.notice));

const studentConst = {
  email: 'f.migliaro69@studenti.unisa.it',
  name: 'Francesco',
  surname: 'Migliaro',
  role: 'Student',
  verified: '1',
  registration_number: 'aaaaB1122',
  password: 'Abcde123',
  birth_date: '1998-03-03 ',
};

const ratingConst = {
  student: JSON.parse(JSON.stringify(studentConst)),
  assignment_id: null,
  titles_score: 10,
  interview_score: 10,
};

new Rating({});

describe('Rating model', function() {
  this.timeout(5000);

  let rating;

  before(async function() {
    const notice = await Notice.create(noticeConst);

    await Student.create(studentConst);

    ratingConst.assignment_id = notice.assignments[0].id;
    rating = JSON.parse(JSON.stringify(ratingConst));
  });

  after(async function() {
    await Notice.remove(noticeConst);
    await Student.delete(studentConst);
  });

  describe('Create method', function() {
    beforeEach(function() {
      rating = JSON.parse(JSON.stringify(ratingConst));
    });

    after(async function() {
      rating = JSON.parse(JSON.stringify(ratingConst));

      await Rating.remove(rating);
    });

    it('Create_1', function() {
      return expect(Rating.create(null)).to.be.rejectedWith(Error, /The rating must not be null/);
    });

    it('Create_2', function() {
      rating.student.email = 'tralalalalaliday';

      return expect(Rating.create(rating)).to.be.rejectedWith(Error);
    });

    it('Create_3', function() {
      rating.student.email = studentConst.email;

      return expect(Rating.create(rating)).to.be.fulfilled;
    });
  });

  describe('Update method', function() {
    before(async function() {
      rating = JSON.parse(JSON.stringify(ratingConst));

      await Rating.create(rating);
    });

    after(async function() {
      rating = JSON.parse(JSON.stringify(ratingConst));

      await Rating.remove(rating);
    });

    it('Update_1', function() {
      return expect(Rating.update(null)).to.be.rejectedWith(Error, /The rating must not be null/);
    });

    it('Update_2', function() {
      rating.assignment_id = 0;

      return expect(Rating.update(rating)).to.be.rejectedWith(Error, /The rating doesn't exists/);
    });

    it('Update_3', async function() {
      rating.assignment_id = ratingConst.assignment_id;

      return expect(Rating.update(rating)).to.be.fulfilled;
    });
  });

  describe('Remove method', function() {
    before(async function() {
      rating = JSON.parse(JSON.stringify(ratingConst));

      await Rating.create(rating);
    });

    after(async function() {
      rating = JSON.parse(JSON.stringify(ratingConst));

      await Rating.remove(rating);
    });

    it('Remove_1', function() {
      return expect(Rating.remove(null)).to.be.rejectedWith(Error, /The rating must not be null/);
    });

    it('Remove_2', function() {
      return expect(Rating.remove(rating)).to.be.fulfilled;
    });
  });

  describe('Exists method', function() {
    it('Exists_1', function() {
      return expect(Rating.exists(null)).to.be.rejectedWith(Error, /The rating must not be null/);
    });

    it('Exists_2', function() {
      return expect(Rating.exists(rating)).to.be.fulfilled;
    });
  });

  describe('FindById method', function() {
    before(async function() {
      rating = JSON.parse(JSON.stringify(ratingConst));

      await Rating.create(rating);
    });

    after(async function() {
      rating = JSON.parse(JSON.stringify(ratingConst));

      await Rating.remove(rating);
    });

    it('FindById_1', function() {
      return expect(Rating.findById(null)).to.be.rejectedWith(Error, /valid/);
    });

    it('FindById_2', function() {
      rating.assignment_id = 0;

      return expect(Rating.findById(rating.student.email, rating.assignment_id)).to.be.rejectedWith(Error, 'No result was found');
    });

    it('FindById_3', function() {
      rating.assignment_id = ratingConst.assignment_id;

      return expect(Rating.findById(rating.student.email, rating.assignment_id)).to.be.fulfilled;
    });
  });

  describe('FindByStudent method', function() {
    before(async function() {
      rating = JSON.parse(JSON.stringify(ratingConst));

      await Rating.create(rating);
    });

    after(async function() {
      rating = JSON.parse(JSON.stringify(ratingConst));

      await Rating.remove(rating);
    });

    it('FindByStudent_1', function() {
      return expect(Rating.findByStudent(null)).to.be.rejectedWith(Error, /null/);
    });

    it('FindByStudent_2', function() {
      return expect(Rating.findByStudent(rating.student.email)).to.be.fulfilled;
    });
  });

  describe('FindByAssignment method', function() {
    before(async function() {
      rating = JSON.parse(JSON.stringify(ratingConst));

      await Rating.create(rating);
    });

    after(async function() {
      rating = JSON.parse(JSON.stringify(ratingConst));

      await Rating.remove(rating);
    });

    it('FindByAssignment_1', function() {
      return expect(Rating.findByAssignment(null)).to.be.rejectedWith(Error, /null/);
    });

    it('FindByAssignment_2', function() {
      return expect(Rating.findByAssignment(rating.assignment_id)).to.be.fulfilled;
    });
  });

  describe('FindByProtocol method', function() {
    it('FindByProtocol_1', function() {
      return expect(Rating.findByProtocol(null)).to.be.rejectedWith(Error, /null/);
    });

    it('FindByProtocol_2', function() {
      return expect(Rating.findByProtocol('Prot. n. 0279008')).to.be.fulfilled;
    });
  });
});
