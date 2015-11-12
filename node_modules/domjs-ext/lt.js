'use strict';

var lt       = require('observable-value/lt')
  , validate = require('./lib/validate-injection');

module.exports = function (domjs/*, options*/) {
	var options = arguments[1];
	domjs.ns[(options && options.name) || 'lt'] = function () {
		return validate(lt.apply(this, arguments));
	};
};
