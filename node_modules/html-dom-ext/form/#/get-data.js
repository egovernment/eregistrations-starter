'use strict';

var toArray  = require('es5-ext/array/from')
  , htmlForm = require('dom-ext/html-form-element/valid-html-form-element')

  , isArray = Array.isArray, forEach = Array.prototype.forEach
  , push = Array.prototype.push;

module.exports = function () {
	var data = {};
	forEach.call(htmlForm(this).elements, function (control) {
		var name, type, nodeName, value;
		if (control.disabled) return;
		nodeName = control.nodeName.toLowerCase();
		if (nodeName === 'fieldset') return;
		if (nodeName === 'button') return;

		value = control.value;
		if (nodeName === 'select') {
			if (control.multiple) {
				value = [];
				forEach.call(control.options, function (option) {
					if (option.selected) value.push(option.value);
				});
				if (!value.length) return;
			}
		} else if (nodeName === 'input') {
			type = control.getAttribute('type') || 'text';
			if ((type === 'submit') || (type === 'image') || (type === 'reset') || (type === 'button')) {
				return;
			}
			if (((type === 'radio') || (type === 'checkbox')) && !control.checked) {
				return;
			}
			if (type === 'file') {
				value = toArray(control.files);
				if (!value.length) return;
				if (value.length === 1) value = value[0];
			}
		}
		name = control.name;
		if (data.hasOwnProperty(name)) {
			if (!isArray(data[name])) data[name] = [data[name]];
			if (isArray(value)) push.apply(data[name], value);
			else data[name].push(value);
			return;
		}
		data[name] = value;
	});
	return data;
};
