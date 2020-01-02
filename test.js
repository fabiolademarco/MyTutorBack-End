const dotenv = require('dotenv');
dotenv.config();

const notice = require('./models/notice');
const chai = require('chai');
chai.should();

describe('NoticeModel', function() { // Nome della classe
  describe('findAll()', function() { // Solo function per problemi di this
    it('should have length 3', async function() {
      const notices = await notice.findAll();

      notices.should.have.length(3);
    });
  });
});
