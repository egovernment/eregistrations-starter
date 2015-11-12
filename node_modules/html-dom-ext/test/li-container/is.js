'use strict';

module.exports = function (t, a) {
	var menu;
	a(t(null), false, "Null");
	a(t(1), false, "Primitive");
	a(t({}), false, "Any object");

	if (typeof document !== 'undefined') {
		a(t(document.createDocumentFragment()), false, "DocumentFragment");
		a(t(document.createElement('div')), false, "Element");
		a(t(document.createElement('ul')), true);
		a(t(document.createElement('ol')), true);
		menu = document.createElement('menu');
		a(t(menu), false);
		menu.setAttribute('type', 'toolbar');
		a(t(menu), true);
		a(t(document.createTextNode('content')), false, "Text node");
		a(t(document.createComment('content')), false, "Comment node");
		a(t(document), false, "Document node");
	}
};
