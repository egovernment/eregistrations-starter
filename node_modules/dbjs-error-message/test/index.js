'use strict';
var Dbjs = require('dbjs')
  , DbjsError = require('dbjs/_setup/error');

module.exports = function (t, a) {
	var db = new Dbjs(), dbjsError = new DbjsError(), dbjsObject;
	db.Object.extend('ErrorTestObject', {
		errorTestProp: {
			type: db.String,
			value: 'I am a vary bad value that yields errors',
			errorSomethingWrong: "something is wrong with value '${object.errorTestProp}'"
		}
	});
	dbjsObject = new db.ErrorTestObject();
	dbjsError.message = "default error message";
	dbjsError.object = dbjsObject;
	dbjsError.key = 'errorTestProp';
	dbjsError.code = 'SOMETHING_WRONG';

	a(t(dbjsError), "something is wrong with value 'I am a vary bad value that yields errors'",
		'Is an error message found?');
	dbjsError.code = 'NON_EXISTANT_CODE';
	a(t(dbjsError), dbjsError.message, 'Is a default error message returned?');
	a.throws(function () { t(); }, TypeError, 'What there is no error?');
	a.throws(function () { t(new Error()); }, TypeError, 'Not a DbjsError?');
};
