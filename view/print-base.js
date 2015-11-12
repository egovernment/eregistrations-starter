'use strict';

module.exports = require('eregistrations/view/print-base');

module.exports.head = function () {
	return link({ href: stUrl(this.appName + '-print.css'), rel: 'stylesheet' });
};

module.exports._logo = function () {
	return img({ src: stUrl('/img/logo.png') });
};
