process.env.NODE_ENV = 'test';

const chai = require('chai');
const expect = chai.expect;
const FixerIO = require('../index')

/*
* Test the Utility functionality
*/
describe('Use utility class to make request', () => {
  const fixerUtility = new FixerIO('some-random-api-key');
  it('it should respond back with a json object', (done) => {
    fixerUtility.request('latest').then((res) => {
      res.should.be.json;
    });
    done();
  });

  it('it should have an error key in json due to invalid api key', (done) => {
    fixerUtility.request('latest').then((res) => {
      expect(res).to.have.key("error");
    })
    done();
  });

  it('it should have an error when endpoint is missing', (done) => {
    expect(fixerUtility.request).to.throw(Error, 'Request endpoint missing');
    done();
  });
});