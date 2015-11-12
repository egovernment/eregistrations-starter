'use strict';

var isLink = require('./is');

module.exports = function (link) {
	return Boolean(isLink(link) && (link.getAttribute('rel') === 'stylesheet'));
};
