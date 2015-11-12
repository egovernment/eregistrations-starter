'use strict';

module.exports = function (t, a) {
	var link;

	a(t(null), false, "Null");
	a(t(1), false, "Primitive");
	a(t({}), false, "Any object");

	if (typeof document !== 'undefined') {
		a(t(document.createDocumentFragment()), false, "DocumentFragment");
		a(t(document.createElement('div')), false, "Element");
		link = document.createElement('link');
		a(t(link), false);
		link.setAttribute('rel', 'stylesheet');
		a(t(link), true);
		a(t(document.createTextNode('content')), false, "Text node");
		a(t(document.createComment('content')), false, "Comment node");
		a(t(document), false, "Document node");
	}
};
