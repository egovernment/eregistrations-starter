// https://html.spec.whatwg.org/multipage/semantics.html#the-li-element

'use strict';

var isUl   = require('../u-list/is')
  , isOl   = require('../o-list/is')
  , isMenu = require('../menu/is');

module.exports = function (list) {
	if (isUl(list) || isOl(list)) return true;
	if (isMenu(list) && (list.getAttribute('type') === 'toolbar')) return true;
	return false;
};
