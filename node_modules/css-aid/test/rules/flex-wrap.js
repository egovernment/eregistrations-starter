'use strict';

var process = require('../../process');

module.exports = function (t, a) {
	a(process('body div { flex-wrap: wrap; }', [t]), 'body div { ' +
		t.replacement.replace(/\$2/g, 'wrap') + '; }');
};
