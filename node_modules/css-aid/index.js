'use strict';

var process = require('./process')

  , allRules;

allRules = [
	require('./rules/align-self'),
	require('./rules/border-radius'),
	require('./rules/box-shadow'),
	require('./rules/box-sizing'),
	require('./rules/flex-wrap'),
	require('./rules/flex'),
	require('./rules/justify-content'),
	require('./rules/transform'),
	require('./rules/transition'),
	require('./rules/transition-delay'),
	require('./rules/transition-duration'),
	require('./rules/variables')
];

module.exports = function (content/*, rules*/) {
	var rules = arguments[1];
	if (rules == null) rules = allRules;
	return process(content, rules);
};
