'use strict';

var autoSubmit = require('dom-ext/html-form-element/#/auto-submit');

module.exports = function (domjs) {
	domjs.getDirectives('form').autoSubmit = function () {
		this.classList.add('auto-submit');
		autoSubmit.call(this);
	};
};
