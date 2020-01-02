
// Import dotenv
const dotenv = require('dotenv');
// Configure dotenv
dotenv.config();

/* const chai = require('chai');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);
const {expect} = chai;
const proxy = require('proxyquire');
const authenticationControl = proxy('./controllers/authenticationControl', {'../models/user': {}, '../models/student': {}, '../models/verifiedEmail': {}});
const {mockRequest, mockResponse} = require('mock-req-res');

req = mockRequest({method: 'POST'});

res = mockResponse();

describe('Prova', function() {
  it('Test', function(done) {
    authenticationControl.login(req, res);
    expect(res.status).to.have.been.calledWith(412);
    done();
  });
});
*/
const Mail = require('./utils/mail');
c = async () => {
  const x = await Mail.sendEmailToTeachingOfficeBook('roberto250398@gmail.com', {code: 'SO/01', student: 'Carlo@gmail.it'});
  console.log(x);
};

c();
