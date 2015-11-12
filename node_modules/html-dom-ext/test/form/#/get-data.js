'use strict';

module.exports = function (t, a) {
	var form = document.createElement('form')
	  , content = form.appendChild(document.createElement('div'))
	  , input;

	input = document.createElement('input');
	input.setAttribute('type', 'text');
	input.setAttribute('name', 'foo');
	input.setAttribute('value', 'bar');
	content.appendChild(input);

	input = document.createElement('textarea');
	input.setAttribute('name', 'elo');
	input.appendChild(document.createTextNode('marko\nelo'));
	content.appendChild(input);

	a.deep(t.call(form), { foo: 'bar', elo: 'marko\nelo' });
};
