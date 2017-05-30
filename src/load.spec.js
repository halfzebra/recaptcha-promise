var load = require('./load');

describe('Loading reCAPTCHA client', () => {

  it('should load the the client library', done => {

    load().then(grecaptcha => {
      expect(grecaptcha).not.toBeUndefined();
      done()
    })
  });
});