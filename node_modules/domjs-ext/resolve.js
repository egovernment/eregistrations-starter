'use strict';

var resolve  = require('observable-value/resolve')
  , validate = require('./lib/validate-injection');

module.exports = function (domjs/*, name*/) {
	var options = arguments[1];
	domjs.ns[(options && options.name) || 'resolve'] = function () {
		return validate(resolve.apply(this, arguments));
	};
};
