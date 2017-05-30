# recaptcha-promise [![Build Status](https://travis-ci.org/halfzebra/recaptcha-promise.svg?branch=master)](https://travis-ci.org/halfzebra/recaptcha-promise)

Promisified version of [reCAPTCHA Client API](https://developers.google.com/recaptcha/docs/display) for programmatic use.

## Installation

## Usage

```bash
npm install recaptcha-promise --save
```

### Directly in the browser

Load promisified version of reCAPTCHA client in the browser:

```js
recaptchaPromise
    .load()
    .then(grecaptcha => {
      grecaptcha.render(
        document.querySelector('g-recaptcha'),
        { 'sitekey': 'YOUR_SITEKEY' }
      )
    });
```
You can also promisify already loaded library with:

```js
recaptchaPromise
  .promisify(window.grecaptcha)
  .then(grecaptcha => {
    grecaptcha.render(
        document.querySelector('g-recaptcha'),
        { 'sitekey': 'YOUR_SITEKEY' })
  })
```
### As a module

## Notes

If you re planning on supporting IE11, consider using [core-js](https://github.com/zloirock/core-js) promise polyfill.