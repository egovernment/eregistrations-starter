'use strict';

module.exports = function (t, a) {
	var report = t('* { margin: 10px }');
	a(report.length, 2, "Report length");
	a.deep(report[0], { line: 1, character: 1,
		message: "The universal selector (*) is known to be slow." });
	a.deep(report[1], { line: 1, character: 18,
		message: "Missing end of line at end of file" });
};
