'use strict';

var is = require('./is');

module.exports = function (x) {
	if (!is(x)) throw new TypeError(x + " is not a HTMLUListElement");
	return x;
};
