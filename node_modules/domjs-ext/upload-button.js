'use strict';

var copy     = require('es5-ext/object/copy')
  , dispatch = require('dom-ext/html-element/#/dispatch-event-2')

  , slice = Array.prototype.slice

  , onFileSelect;

onFileSelect = function () { dispatch.call(this.form, 'submit'); };

module.exports = function (domjs/*, options*/) {
	var form = domjs.ns.form, input = domjs.ns.input, div = domjs.ns.div
	  , label = domjs.ns.label, options = arguments[1];

	domjs.ns[(options && options.name) || 'uploadButton'] = function (options) {
		var attrs, dom;
		options = Object(options);
		attrs = copy(options);
		attrs.method = 'post';
		attrs.enctype = 'multipart/form-data';
		delete attrs.inputName;
		delete attrs.multiple;
		delete attrs.progressContainer;
		delete attrs.label;
		dom = form(attrs, slice.call(arguments, 1),
			div(label(options.label, input({ type: 'file',
				name: options.inputName || 'file',
				multiple: (options.multiple == null) ? true :
							Boolean(options.multiple),
					onchange: onFileSelect }))));
		dom._progressContainer = options.progressContainer;
		return dom;
	};
};
