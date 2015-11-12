'use strict';

var process = require('../../process');

module.exports = function (t, a) {
	a(process('body div { display: flex; }', [t]), 'body div { ' + t.replacement + '; }');
};
