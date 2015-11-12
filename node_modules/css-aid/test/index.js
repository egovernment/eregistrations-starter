'use strict';

var rule = require('../rules/flex');

module.exports = function (t, a) {
	var tpl = 'body div { margin-right: 32px; $; margin-left: 23px;}';
	a(t(tpl.replace(/\$/g, 'display:flex')), tpl.replace(/\$/g, rule.replacement));
};
