'use strict';

module.exports = function (t, a) {
	var T = t, err = new T('Message', 'MY_ERROR', { errno: 123 });
	a(err instanceof Error, true, "Instance of error");
	a(err.name, 'AbstractError', "Name");
	a(String(err), 'AbstractError: Message', "String representation");
	a(err.code, 'MY_ERROR', "Code");
	a(err.errno, 123, "Errno");
	a(typeof err.stack, 'string', "Stack trace");
};
