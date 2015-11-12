'use strict';

var aFrom             = require('es5-ext/array/from')
  , ObservableValue   = require('observable-value')
  , isObservable      = require('observable-value/is-observable')
  , isObservableValue = require('observable-value/is-observable-value')

  , forEach = Array.prototype.forEach, resolve;

resolve = function (paths) {
	var base = [], query = [], hash = '', path;
	forEach.call(paths, function (path) {
		if (path == null) return;
		path = isObservableValue(path) ? String(path.value) : String(path);
		if (!path) return;
		if (path[0] === '?') query.push(path.slice(1));
		else if (path[0] === '#') hash = path;
		else base.push(path);
	});
	path = base.length ? ('/' + base.join('/') + '/') : '/';
	if (query.length) path += '?' + query.join('&');
	return path + hash;
};

module.exports = function (domjs/*, options*/) {
	var options = arguments[1];
	domjs.ns[(options && options.name) || 'url'] = function (/*,  …paths*/) {
		var paths = arguments, observable;
		if (this) {
			paths = aFrom(paths);
			paths.unshift(this);
		}
		if (!paths.length) return '/';
		forEach.call(paths, function (path) {
			if (!isObservable(path)) return;
			if (!observable) observable = new ObservableValue(resolve(paths));
			path.on('change', function () { observable.value = resolve(paths); });
		});
		return observable || resolve(paths);
	};
};
