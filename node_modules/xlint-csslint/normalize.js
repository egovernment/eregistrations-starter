'use strict';

var camelToHyphen = require('es5-ext/string/#/camel-to-hyphen')
  , startsWith    = require('es5-ext/string/#/starts-with')
  , forEach       = require('es5-ext/object/filter')
  , callable      = require('es5-ext/object/valid-callable')
  , object        = require('es5-ext/object/valid-object')

  , compare = function (a, b) { return (a.line - b.line) || (a.character - b.character); };

module.exports = function (CSSLint) {
	var result;
	(object(CSSLint) && callable(CSSLint.verify));
	result = function (src, allOptions) {
		var ruleset = CSSLint.getRuleset();
		allOptions = Object(allOptions);
		forEach(allOptions, function (value, name) {
			name = camelToHyphen.call(name);
			if (!startsWith.call(name, 'css-')) return;
			name = name.slice(4);
			if (!value) delete ruleset[name];
			else ruleset[name] = 1;
		});
		return CSSLint.verify(src, ruleset).messages.map(function (message) {
			return { line: message.line, character: message.col, message: message.message };
		}).sort(compare);
	};
	result.xlintId = 'csslint';
	return result;
};
