'use strict';

var linter = require('csslint').CSSLint;

module.exports = function (t, a) {
	var report = t(linter)('* { margin: 10px }');
	a(report.length, 1, "Report length");
	a.deep(report[0], { line: 1, character: 1,
		message: "The universal selector (*) is known to be slow." });
};
