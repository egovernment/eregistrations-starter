'use strict';

var _if      = require('observable-value/if')
  , unbind   = require('./lib/unbind-injected')
  , validate = require('./lib/validate-injection');

module.exports = function (domjs/*, options*/) {
	var options = arguments[1];
	domjs.ns[(options && options.name) || '_if'] = function (cond, t, f) {
		return validate(_if(cond, unbind(t), unbind(f)));
	};
};
