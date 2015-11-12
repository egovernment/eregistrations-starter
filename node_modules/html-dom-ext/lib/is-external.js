'use strict';

var parse       = require('url3/parse')
  , hasExternal = RegExp.prototype.test.bind(/(^|\s)external(\s|$)/);

module.exports = function (currentUrl, targetUrl, target) {
	if (target.getAttribute('target') === '_blank') return true;
	if (hasExternal(target.getAttribute('rel'))) return true;
	currentUrl = parse(currentUrl);
	targetUrl = parse(targetUrl);
	if (targetUrl.protocol !== currentUrl.protocol) return true;
	if (targetUrl.host !== currentUrl.host) return true;
	if (targetUrl.auth !== currentUrl.auth) return true;
	return false;
};
