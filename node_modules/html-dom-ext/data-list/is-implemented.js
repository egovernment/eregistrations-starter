'use strict';

var validateDocument = require('dom-ext/html-document/valid-html-document');

module.exports = function (document) {
	return Boolean(validateDocument(document).createElement('input').list === null);
};
