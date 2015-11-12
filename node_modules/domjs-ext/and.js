'use strict';

var and      = require('observable-value/and')
  , validate = require('./lib/validate-injection');

module.exports = function (domjs/*, options*/) {
	var options = arguments[1];
	domjs.ns[(options && options.name) || 'and'] = function () {
		return validate(and.apply(this, arguments));
	};
};
