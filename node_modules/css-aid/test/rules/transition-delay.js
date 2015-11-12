'use strict';

var process = require('../../process');

module.exports = function (t, a) {
	a(process('body div { transition-delay: 100ms; }', [t]), 'body div { ' +
		t.replacement.replace(/\$2/g, '100ms') + '; }');
};
