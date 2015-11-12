'use strict';

var dispatchEvent = require('dom-ext/html-element/#/dispatch-event-2')
  , location      = require('html-dom-ext/test/__playground/get-location')();

module.exports = function (t, a) {
	var form = document.documentElement.appendChild(document.createElement('form'))
	  , called = 0;
	form.action = '/foo/';
	t(document, location, function (eventedForm) {
		++called;
		a(form, eventedForm);
	});
	dispatchEvent.call(form, 'submit');
	a(called, 1);
};
