'use strict';

var process = require('../../process');

module.exports = function (t, a) {
	a(process('body div { transition: 0.3s ease; }', [t]), 'body div { ' +
		t.replacement.replace(/\$2/g, '0.3s ease') + '; }');
};
