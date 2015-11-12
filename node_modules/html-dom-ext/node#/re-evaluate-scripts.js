// Re-evaluate scripts found in DOM
// Main use case is to run it on DOM nodes for which content was injected via innerHTML
// (as in such case browsers intercepts evaluation of injected scripts)

'use strict';

var aFrom            = require('es5-ext/array/from')
  , includes         = require('es5-ext/array/#/contains')
  , ensureCallable   = require('es5-ext/object/valid-callable')
  , ensureIterable   = require('es5-ext/iterable/validate-object')
  , ensureParentNode = require('dom-ext/parent-node/ensure')

  , forEach = Array.prototype.forEach, push = Array.prototype.push;

var reload = function (oldScript) {
	var nuScript = oldScript.ownerDocument.createElement('script');
	forEach.call(oldScript.attributes, function (attr) {
		nuScript.setAttribute(attr.name, attr.value);
	});
	forEach.call(oldScript.childNodes, function (node) {
		nuScript.appendChild(node.cloneNode(true));
	});
	oldScript.parentNode.insertBefore(nuScript, oldScript);
	oldScript.parentNode.removeChild(oldScript);
};

var getScripts = function (node, ignoredSources, filter) {
	if (node.getElementsByTagName) return aFrom(node.getElementsByTagName('script'));
	var result = [];
	forEach.call(node.childNodes, function (node) {
		if (node.nodeType !== 1) return;
		if (node.nodeName.toLowerCase() === 'script') {
			if (node.src && includes.call(ignoredSources, node.src)) return;
			if (filter && !filter(node)) return;
			result.push(node);
			return;
		}
		push.apply(result, getScripts(node, ignoredSources, filter));
	});
	return result;
};

module.exports = exports = function (/* options */) {
	var options = Object(arguments[0]), filter;
	var ignoredSources = (options.ignoredSources != null)
		? aFrom(ensureIterable(options.ignoredSources)) : [];
	if (options.filter != null) filter = ensureCallable(options.filter);
	getScripts(ensureParentNode(this), ignoredSources, filter).forEach(reload);
};
