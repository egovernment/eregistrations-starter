'use strict';

var forEach      = require('es5-ext/object/for-each')
  , reEscape     = require('es5-ext/reg-exp/escape')

  , rootRuleRe = /((?:^|\}|\/)\s*)::root\s*\{([^\}]+\}\s*)/g
  , varsDefineRe = /\s*--([a-z0-9\-]+)\s*:\s*([^;\}]+)(?:;|\})/g

  , create = Object.create;

module.exports = exports = function (str) {
	var variables = create(null);
	str = str.replace(rootRuleRe, function (all, first, data) {
		data.replace(varsDefineRe, function (property, name, value) {
			variables[name] = value.trim();
		});
		return first;
	});
	forEach(variables, function (value, name) {
		str = str.replace(new RegExp('(\\s|:)var\\(\\s*--' + reEscape(name) + '\\s*\\)', 'g'),
			'$1' + value);
	});
	return str;
};
