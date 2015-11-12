'use strict';

var process = require('../../process');

module.exports = function (t, a) {
	a(process('body div { justify-content: flex-start; }', [t]), 'body div { ' +
		t.replacement.replace(/\$2/g, 'flex-start') + '; }');
};
