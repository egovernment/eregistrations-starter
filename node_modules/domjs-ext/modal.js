'use strict';

var getFactory = require('overlay').getFactory;

module.exports = function (domjs/*, options*/) {
	var factory = getFactory(domjs.document), insert = domjs.ns.insert
	  , normalize = domjs.ns.normalize, options = arguments[1];
	domjs.ns[(options && options.name) || 'modal'] = function (/* options */) {
		var dom = factory.create.apply(factory, arguments);
		insert(normalize(dom));
		return dom;
	};
};
