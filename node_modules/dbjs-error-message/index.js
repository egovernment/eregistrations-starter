'use strict';

var validDbjsError = require('dbjs/valid-dbjs-error')
  , getErrMsgPropertyByCode = require('./lib/get-error-message-by-code')
  , template = require('es6-template-strings');

module.exports = function (error) {
	var desc, errProperty;
	validDbjsError(error);
	if (!error.object || !error.code || !error.key) {
		return error.message || '';
	}
	desc = error.object.getDescriptor(error.key);
	errProperty = getErrMsgPropertyByCode(error.code);
	if (!errProperty || !desc[errProperty]) {
		return error.message || '';
	}
	return template(desc[errProperty], error);
};
