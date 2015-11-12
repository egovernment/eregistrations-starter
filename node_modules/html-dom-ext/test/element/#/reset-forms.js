'use strict';

module.exports = function (t, a) {
	var container = document.createElement('div')
	  , form = container.appendChild(document.createElement('form'))
	  , input = form.appendChild(document.createElement('input'));

	input.type = 'text';
	input.setAttribute('value', 'foo');
	a(input.value, 'foo');
	input.value = 'bar';
	a(input.value, 'bar');
	t.call(container);
	a(input.value, 'foo');
	input.value = 'bar';
	a(input.value, 'bar');
	t.call(form);
	a(input.value, 'foo');
};
