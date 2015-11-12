'use strict';

var slice = Array.prototype.slice;

module.exports = function (t, a) {
	var div = document.body.appendChild(document.createElement('div'))
	  , script = document.createElement('script');
	div.id = 'foo';
	script.appendChild(document.createTextNode(
		'document.getElementById(\'foo\').appendChild(document.createTextNode(\'X\'))'
	));
	div.appendChild(script);
	a(div.firstChild, script);
	t.call(div);
	a.not(div.firstChild, script);
	a(div.firstChild.nodeName, 'SCRIPT');
	a.deep(slice.call(div.childNodes, 1).map(function (node) { return node.data; }), ['X', 'X']);
};
