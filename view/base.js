'use strict';

var _                = require('../i18n').bind('View')
  , isReadOnlyRender = require('mano/client/utils/is-read-only-render');

module.exports = exports = require('eregistrations/view/base');

exports.title = _("CHANGEME");

exports.head = function () {
	meta({ name: 'viewport', content: 'width=device-width' });

	if (isReadOnlyRender) {
		script({ src: stUrl(this.appName + '.legacy.js') });
		// SPA takeover
		script(function (appUrl) {
			var isStrict;
			if (typeof Object.getPrototypeOf !== 'function') return;
			if (typeof Object.defineProperty !== 'function') return;
			if (!window.history) return;
			isStrict = !(function () { return this; }());
			if (!isStrict) return;
			if (Object.getPrototypeOf({ __proto__: Function.prototype }) !== Function.prototype) return;
			if (Object.defineProperty({}, 'foo',  { get: function () { return 'bar'; } }).foo !== 'bar') {
				return;
			}
			if (document.cookie.indexOf('legacy=1') !== -1) return;
			document.write('<scr' + 'ipt defer src="' + appUrl + '"></sc' + 'ript>');
		}, stUrl(this.appName + '.js'));
	}

	link({ href: stUrl(this.appName + '.css'), rel: 'stylesheet' });
	if (isReadOnlyRender) link({ href: stUrl(this.appName + '-legacy.css'), rel: 'stylesheet' });
};

exports._logo = function () {
	return img({ src: '/img/logo.png' });
};
