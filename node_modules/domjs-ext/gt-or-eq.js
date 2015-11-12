'use strict';

var gtOrEq   = require('observable-value/gt-or-eq')
  , validate = require('./lib/validate-injection');

module.exports = function (domjs/*, options*/) {
	var options = arguments[1];
	domjs.ns[(options && options.name) || 'gtOrEq'] = function () {
		return validate(gtOrEq.apply(this, arguments));
	};
};
