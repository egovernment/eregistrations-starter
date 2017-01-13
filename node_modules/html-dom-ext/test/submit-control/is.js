'use strict';

module.exports = function (t, a) {
	var el;
	a(t(null), false, "Null");
	a(t(1), false, "Primitive");
	a(t({}), false, "Any object");

	if (typeof document !== 'undefined') {
		a(t(document.createDocumentFragment()), false, "DocumentFragment");
		a(t(document.createElement('div')), false, "Element");
		el = document.createElement('input');
		a(t(el), false);
		el.setAttribute('type', 'submit');
		a(t(el), true);
		el.setAttribute('type', 'image');
		a(t(el), true);
		el.setAttribute('type', 'text');
		a(t(el), false);
		el = document.createElement('button');
		a(t(el), true);
		el.setAttribute('type', 'submit');
		a(t(el), true);
		el.setAttribute('type', 'button');
		a(t(el), false);
		a(t(document.createTextNode('content')), false, "Text node");
		a(t(document.createComment('content')), false, "Comment node");
		a(t(document), false, "Document node");
	}
};
