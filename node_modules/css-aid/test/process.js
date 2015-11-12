'use strict';

var rule = require('../rules/flex');

module.exports = function (t, a) {
	[
		'body div { $; }',
		'body div { margin-right: 23px;$; }',
		'body div { margin-right: 32px; $; }',
		'body div { margin-right: 32px; $}',
		'body div { margin-right: 32px; $; margin-left: 23px;}',
		'body div { margin-right: 32px; $ ; margin-left: 23px;}',
		'body div {$;margin-right: 32px; } body { $ ; margin-left: 23px; } div {$;} div { $;}' +
			' div{$} span{$;}}'
	].forEach(function (tpl, index) {
		var css = tpl.replace(/\$/g, 'display: flex');
		a(t(css, [rule]), tpl.replace(/\$/g, rule.replacement), index);
	});
};
