'use strict';

module.exports = function (t, a) {
	var linter = t(__dirname + '/../jslint/jslint.js')
	  , report = linter('foo = \'raz\';');
	a(report.length, 1, "Report length");
	a.deep(report[0], { line: 1, character: 1,
		message: '\'foo\' was used before it was defined.' });
};
