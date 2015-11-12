'use strict';

var callable = require('es5-ext/object/valid-callable')
  , value    = require('es5-ext/object/valid-value')
  , object   = require('es5-ext/object/valid-object')

  , forEach = Array.prototype.forEach;

module.exports = function (content, rules) {
	(value(content) && object(rules));
	content = String(content);

	forEach.call(rules, function (rule) { content = String(value(callable(rule)(content))); });
	return content;
};
