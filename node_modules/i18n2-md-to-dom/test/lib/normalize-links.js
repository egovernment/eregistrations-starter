'use strict';

module.exports = function (t, a) {
	var el  = document.createElement('div');

	el.innerHTML = 'marko <a href="/raz">mrako</a> dwa<a href="http://miszka.com">Wiszko</a>' +
		'<a href="elo.pdf">ssdfs</a>';
	t(el);
	a(el.childNodes[1].hasAttribute('target'), false);
	a(el.childNodes[3].getAttribute('target'), '_blank');
	a(el.childNodes[4].getAttribute('target'), '_blank');
};
