'use strict';

module.exports = function (domjs/*, options*/) {
	var container = domjs.ns.div(), insert = domjs.ns.insert
	  , options = arguments[1];
	if (container.parentNode) container.parentNode.removeChild(container);
	domjs.ns[(options && options.name) || 'html'] = function (html) {
		container.innerHTML = html;
		return insert(container.childNodes);
	};
};
