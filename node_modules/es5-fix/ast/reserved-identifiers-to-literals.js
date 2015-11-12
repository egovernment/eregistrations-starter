'use strict';

var forEach = require('es5-ext/object/for-each')
  , primitiveSet = require('es5-ext/object/primitive-set')

  , restricted = primitiveSet('break', 'case', 'catch', 'class', 'const',
	'continue', 'debugger', 'default', 'delete', 'do', 'else', 'enum', 'export',
	'extends', 'finally', 'for', 'function', 'if', 'import', 'in', 'instanceof',
	'new', 'return', 'switch', 'super', 'this', 'throw', 'try', 'typeof', 'var',
	'void', 'while', 'with');

module.exports = function (ast) {
	forEach(ast, function self(value, key, ast) {
		if (!value) return;
		if (typeof value !== 'object') return;
		if (value.type !== 'Identifier') {
			forEach(value, self);
			return;
		}

		if (!restricted[value.name]) return;
		value.type = 'Literal';
		value.value = value.name;
		value.raw = '\'' + value.name + '\'';
		delete value.name;
		if ((ast.computed === false) && (ast.type === 'MemberExpression')) ast.computed = true;
	});
	return ast;
};
