// Reset all forms within container
// If container is a form itself, then reset it

'use strict';

var ensureElement = require('dom-ext/html-element/valid-html-element')
  , isForm        = require('dom-ext/html-form-element/is-html-form-element')

  , forEach = Array.prototype.forEach;

module.exports = function () {
	if (isForm(ensureElement(this))) {
		this.reset();
		return;
	}
	forEach.call(this.getElementsByTagName('form'), function (form) { form.reset(); });
};
