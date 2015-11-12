'use strict';

module.exports = function (t, a) {
	var T = t('MyError'), err = new T('Message', 'MY_ERROR', { errno: 123 });
	a(err instanceof Error, true, "Instance of error");
	a.throws(function () { t('Bad name'); }, Error, "Bad name");
	a.throws(function () { t('BadName'); }, Error, "Doesn't end with Error");
	a(err.name, 'MyError', "Name");
	a(String(err), 'MyError: Message', "String representation");
	a(err.code, 'MY_ERROR', "Code");
	a(err.errno, 123, "Errno");
	a(typeof err.stack, 'string', "Stack trace");
};
