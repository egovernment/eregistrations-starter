'use strict';

var genId = require('time-uuid')

  , slice = Array.prototype.slice;

module.exports = function (domjs/*, options*/) {
	var form = domjs.ns.form, p = domjs.ns.p, button = domjs.ns.button
	  , script = domjs.ns.script, options = arguments[1], mmap = domjs.ns.mmap;

	domjs.ns[(options && options.name) || 'postButton'] = function (attrs) {
		var id, value, buttonClass;
		attrs = Object(attrs);
		if (!attrs.hasOwnProperty('method')) attrs.method = 'post';
		if (!attrs.hasOwnProperty('id')) attrs.id = 'form-' + genId();
		id = String(attrs.id);
		buttonClass = attrs.buttonClass;
		delete attrs.buttonClass;
		value = attrs.value;
		delete attrs.value;
		return [form(attrs,
			p(button({ type: 'submit', class: buttonClass }, value),
				slice.call(arguments, 1))),
			mmap(attrs.confirm, function (message) {
				if (!message) return;
				if (message === true) message = null;
				return script(function (formId, message) {
					$.confirmSubmit(formId, message);
				}, id, message);
			})];
	};
};
