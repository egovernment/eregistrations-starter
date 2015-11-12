'use strict';

var process = require('../../process');

module.exports = function (t, a) {
	a(process('body div { box-shadow: 0.5px 30%; }', [t]), 'body div { ' +
		t.replacement.replace(/\$2/g, '0.5px 30%') + '; }');
};
