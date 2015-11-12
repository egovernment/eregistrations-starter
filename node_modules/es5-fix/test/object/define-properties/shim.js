'use strict';

module.exports = function (t, a) {
	var x = {};
	a(t(x, { foo: { value: 'raz', configurable: true } }), x, "Return");
	t(x, { foo: { value: 'dwa', configurable: true } });
	a(x.foo, 'dwa');
};
