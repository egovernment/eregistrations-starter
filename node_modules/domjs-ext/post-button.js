'use strict';

var genId = require('time-uuid')

  , slice = Array.prototype.slice;

module.exports = function (domjs/*, options*/) {
	var form = domjs.ns.form, p = domjs.ns.p, button = domjs.ns.button
	  , script = domjs.ns.script, options = arguments[1];

	domjs.ns[(options && options.name) || 'postButton'] = function (attrs) {
		var id, confirm, message, value, buttonClass;
		attrs = Object(attrs);
		if (!attrs.hasOwnProperty('method')) attrs.method = 'post';
		if (!attrs.hasOwnProperty('id')) attrs.id = 'form-' + genId();
		id = String(attrs.id);
		if (attrs.confirm) {
			confirm = true;
			message = (attrs.confirm === true) ? null : String(attrs.confirm);
			delete attrs.confirm;
		}
		buttonClass = attrs.buttonClass;
		delete attrs.buttonClass;
		value = attrs.value;
		delete attrs.value;
		return [form(attrs,
			p(button({ type: 'submit', class: buttonClass }, value),
				slice.call(arguments, 1))),
			confirm && script(function (formId, message) {
				$.confirmSubmit(formId, message);
			}, id, message)];
	};
};
