'use strict';

var parse    = require('esprima').parse
  , generate = require('escodegen').generate;

module.exports = function (t, a) {
	var ast = parse('var x = { foo: "bar", delete: 1 }; x.break = 34;');
	t(ast);
	a(generate(ast, { format: { compact: true } }),
		'var x={foo:\'bar\',\'delete\':1};x[\'break\']=34;');
};
