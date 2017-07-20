var load = require('./load');

describe('Loading reCAPTCHA client', () => {
  it('should load the the client library', done => {
    load().then(grecaptcha => {
      expect(grecaptcha).not.toBeUndefined();
      done();
    });
  });
  it('should load the the client library multiple times, without reloading the script', done => {
    Promise.all([load(), load()]).then(() => {
      console.log(arguments);
      expect(true).toBeUndefined();
      done();
    });
  });
});
