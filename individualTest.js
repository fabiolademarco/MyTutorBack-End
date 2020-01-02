const dotenv = require('dotenv');
dotenv.config();
const assert = require('assert'); // Serve per le assert
const notice = require('./models/notice');

describe('NoticeModel', function() { // Nome della classe
  describe('findAll()', function() { // Solo function per problemi di this
    it('should have length 2', async function() {
      const notices = await notice.findAll();
      assert.strictEqual(notices.length, 1);
    });
  });

  describe('findAll2()', function() { // Solo function per problemi di this
    it('should have length 3', async function() {
      const notices = await notice.findAll();
      assert.strictEqual(notices.length, 3);
    });
  });
});
