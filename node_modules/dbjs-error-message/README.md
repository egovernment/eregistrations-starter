# dbjs-error-message
## Error message handling for [dbjs](https://github.com/medikoo/dbjs)

### Installation

	$ npm install dbjs-error-message

### Description

We use DbjsError object (with embedded coresponding DbjsObject) to prepare error message.

### Usage example

In order to retrieve an error message from module, one must provide DbjsError. If no specific error message field is defined on a given property the default error message for the error will be returned. For a property specific error message a special property containing error message must be provided. Such propery must follow naming convention error<DbjsErrorCodeCamelCase>.

```javascript
var getErrorMessage = require('dbjs-error-message');
var knight, dbjsError;
dbjsError = new DbjsError();
  db.Object.extend('Knight', {
  battleCry: {
    type: db.String,
    value: 'I will prevail!!!',
    errorKnightIsDead: "The knight will never say '${object.battleCry}' again"
} });

knight = new db.Knight();

//in real world below 4 lines will be setup for you in validation phase
dbjsError.object = knight;
dbjsError.key = 'battleCry';
dbjsError.code = 'KNIGHT_IS_DEAD';
dbjsError.message = 'default error message';

getErrorMessage(dbjsError); // The knight will never say 'I will prevail!!!' again
dbjsError.code = 'VALUE_REQUIRED';
getErrorMessage(dbjsError); //default error message

```

## Tests [![Build Status](https://travis-ci.org/kamsi/dbjs-error-message.svg)](https://travis-ci.org/kamsi/dbjs-error-message)

	$ npm test
