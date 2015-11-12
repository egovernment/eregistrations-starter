'use strict';

var location = require('../__playground/get-location')();

module.exports = function (t, a) {
	var ahref = document.createElement('a');
	ahref.href = location.href;
	a(t(location.href, ahref.href, ahref), false);
	ahref.setAttribute('target', '_blank');
	a(t(location.href, ahref.href, ahref), true);
	ahref.removeAttribute('target');
	a(t(location.href, ahref.href, ahref), false);
	ahref.setAttribute('rel', 'nofollow external');
	a(t(location.href, ahref.href, ahref), true);
	ahref.removeAttribute('rel');
	a(t(location.href, ahref.href, ahref), false);
	ahref.href = 'https://onejs.org';
	a(t(location.href, ahref.href, ahref), true);
	ahref.href = 'http://onejs.org';
	a(t(location.href, ahref.href, ahref), true);
};
