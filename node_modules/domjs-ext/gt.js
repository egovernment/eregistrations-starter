'use strict';

var gt       = require('observable-value/gt')
  , validate = require('./lib/validate-injection');

module.exports = function (domjs/*, options*/) {
	var options = arguments[1];
	domjs.ns[(options && options.name) || 'gt'] = function () {
		return validate(gt.apply(this, arguments));
	};
};
