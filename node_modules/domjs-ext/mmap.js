'use strict';

var map      = require('observable-value/map')
  , validate = require('./lib/validate-injection');

module.exports = function (domjs/*, name*/) {
	var options = arguments[1];
	domjs.ns[(options && options.name) || 'mmap'] =  function () {
		return validate(map.apply(this, arguments));
	};
};
