'use strict';

module.exports = function () {
	var parse = Date.parse;
	return Boolean(!parse('2012-11-31T23:59:59.000Z') &&
		parse('2012-11-30T24:00:00.000Z') &&
		!parse('2011-02-29T12:00:00.000Z') &&
		parse('2011-01-01T00:00:00.000Z') &&
		parse('2011-01-01'));
};
