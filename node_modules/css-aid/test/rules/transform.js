'use strict';

var process = require('../../process');

module.exports = function (t, a) {
	a(process('body div { transform: translate3d(0, 0, 0); }', [t]), 'body div { ' +
		t.replacement.replace(/\$2/g, 'translate3d(0, 0, 0)') + '; }');
};
