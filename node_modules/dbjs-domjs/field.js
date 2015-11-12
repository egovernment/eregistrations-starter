'use strict';

var isObservableValue = require('observable-value/is-observable-value')
  , isDbjsType        = require('dbjs/is-dbjs-type');

module.exports = function (domjs) {
	var input = domjs.ns.input;

	return (domjs.ns.field = function (attrs) {
		var isType;
		if (attrs && (attrs.dbjs != null)) {
			if (!isObservableValue(attrs.dbjs)) {
				isType = isDbjsType(attrs.dbjs);
				if (!isType) throw new TypeError(attrs.dbjs + " is not dbjs observable or type");
			}
			return attrs.dbjs.toDOMInputComponent(domjs.document, attrs).dom;
		}
		return input.apply(this, arguments);
	});
};
