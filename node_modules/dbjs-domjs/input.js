'use strict';

var isObservableValue = require('observable-value/is-observable-value')
  , isDbjsType        = require('dbjs/is-dbjs-type');

module.exports = function (domjs) {
	var input = domjs.ns.input;

	return (domjs.ns.input = function (attrs) {
		var isType;
		if (attrs && (attrs.dbjs != null)) {
			if (!isObservableValue(attrs.dbjs)) {
				isType = isDbjsType(attrs.dbjs);
				if (!isType) {
					throw new TypeError(attrs.dbjs + " is not dbjs observable or type");
				}
			}
			if (attrs.type === 'hidden') {
				if (!isType) attrs.name = attrs.dbjs.dbId;
				if (attrs.value != null) {
					attrs.value = (isType ? attrs.dbjs : attrs.dbjs.descriptor.type)
						.toInputValue(attrs.value);
				}
				delete attrs.dbjs;
				return input.apply(this, arguments);
			}
			return attrs.dbjs.toDOMInput(domjs.document, attrs).dom;
		}
		return input.apply(this, arguments);
	});
};
