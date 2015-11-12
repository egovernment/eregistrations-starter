# error-create
## Utility for creating custom JavaScript errors
### Usage

```javascript
var MyCustomError = require('error-create')('MyCustomError');

try {
  throw new MyCustomError("My message", 'MY_CODE', { foo: 'bar' });
} catch (e) {
  console.log(e instanceof Error);         // true
  console.log(e instanceof MyCustomError); // true
  console.log(String(e));                  // 'MyCustomError: My message'
  console.log(e.code);                     // 'MY_CODE'
  console.log(e.foo);                      // 'bar'
}
```

### Installation

	$ npm install error-create
	
To port it to Browser or any other (non CJS) environment, use your favorite CJS bundler. No favorite yet? Try: [Browserify](http://browserify.org/), [Webmake](https://github.com/medikoo/modules-webmake) or [Webpack](http://webpack.github.io/)

## Tests [![Build Status](https://travis-ci.org/medikoo/error-create.png)](https://travis-ci.org/medikoo/error-create)

	$ npm test
