'use strict';

module.exports = function (t, a) {
	a(t('foo __bar__ lorem'), '<p>foo <strong>bar</strong> lorem</p>');
};
