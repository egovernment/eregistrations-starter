'use strict';

var assign         = require('es5-ext/object/assign')
  , setPrototypeOf = require('es5-ext/object/set-prototype-of')
  , d              = require('d')

  , captureStackTrace = Error.captureStackTrace
  , AbstractError;

AbstractError = function AbstractError(message/*, code, ext*/) {
	var ext, code;
	if (!(this instanceof AbstractError)) {
		return new AbstractError(message, arguments[1], arguments[2]);
	}
	code = arguments[1];
	ext = arguments[2];
	if (ext == null) {
		if (code && (typeof code === 'object')) {
			ext = code;
			code = null;
		}
	}
	if (ext != null) assign(this, ext);
	this.message = String(message);
	if (code != null) this.code = String(code);

	this.name = this.constructor.name;
	if (captureStackTrace) captureStackTrace(this, this.constructor);
};
if (setPrototypeOf) setPrototypeOf(AbstractError, Error);

AbstractError.prototype = Object.create(Error.prototype, {
	constructor: d(AbstractError)
});

module.exports = AbstractError;
