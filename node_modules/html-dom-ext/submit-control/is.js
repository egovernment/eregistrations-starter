'use strict';

var primitiveSet = require('es5-ext/object/primitive-set')
  , isInput      = require('../input/is')
  , isButton     = require('../button/is')

  , submittableTypes = primitiveSet('submit', 'image');

module.exports = function (element) {
	if (isInput(element)) {
		return Boolean(submittableTypes[element.type]);
	}
	if (isButton(element)) {
		return (element.type === 'submit');
	}
	return false;
};
