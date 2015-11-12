'use strict';

var aFrom               = require('es5-ext/array/from')
  , compact             = require('es5-ext/array/#/compact')
  , flatten             = require('es5-ext/array/#/flatten')
  , iterable            = require('es5-ext/iterable/validate-object')
  , assign              = require('es5-ext/object/assign')
  , callable            = require('es5-ext/object/valid-callable')
  , isMap               = require('es6-map/is-map')
  , d                   = require('d')
  , autoBind            = require('d/auto-bind')
  , memoize             = require('memoizee/plain')
  , getOneArgNormalizer = require('memoizee/normalizers/get-1')
  , getNormalizer       = require('memoizee/normalizers/get-fixed')
  , isObservable        = require('observable-value/is-observable')
  , isObservableValue   = require('observable-value/is-observable-value')
  , remove              = require('dom-ext/node/#/remove')

  , DOMList, List;

DOMList = function (domjs, list, cb, thisArg) {
	var df;
	this.domjs = domjs;
	this.thisArg = thisArg;
	this.location = domjs.document.createTextNode("");
	this.cb = cb;
	if (isObservableValue(list)) {
		this.onNewList(list.value);
		list.on('change', function (event) { this.onNewList(event.newValue); }.bind(this));
	} else {
		this.onNewList(list);
	}
	this.current = this.build();
	df = domjs.document.createDocumentFragment();
	this.current.forEach(df.appendChild, df);
	df.appendChild(this.location);
	df._domjsList = this;
	return df;
};

Object.defineProperties(DOMList.prototype, assign({
	build: d(function () {
		var isKeyValue;
		if (!this.list) return [];
		isKeyValue = isMap(this.list);
		return compact.call(flatten.call(aFrom(this.list, function (item, index) {
			return isKeyValue ? this.buildItem(item[1], item[0]) : this.buildItem(item, index);
		}, this)));
	}),
	buildItem: d(function (item, index) {
		return this.domjs.safeCollect(this.cb.bind(this.thisArg, item, index,
			this.list));
	}),
	onNewList: d(function (newList) {
		if (isObservable(this.list)) this.list.off('change', this.reload);
		if (isObservable(newList)) {
			if (!this.hasOwnProperty('buildItem')) {
				this.buildItem = memoize(this.buildItem.bind(this),
					{ normalizer: isMap(newList) ? getNormalizer(2) : getOneArgNormalizer() });
			}
			newList.on('change', this.reload);
		}
		this.list = newList;
		if (this.current) this.reload();
	})
}, autoBind({
	reload: d(function () {
		this.current.forEach(function (el) { remove.call(el); });
		this.current = this.build();
		this.current.forEach(function (el) {
			this.parentNode.insertBefore(el, this);
		}, this.location);
	})
})));

List = function (domjs, list, cb, thisArg) {
	this.args = arguments;
};
Object.defineProperties(List.prototype, {
	toDOM: d(function () {
		return new DOMList(this.args[0], this.args[1], this.args[2], this.args[3]);
	})
});

module.exports = function (domjs/*, options*/) {
	var options = arguments[1], name = (options && options.name) || 'list';
	domjs.ns[name] = function (list, cb/*, thisArg*/) {
		if (!isObservableValue(list)) iterable(list);
		return new List(domjs, list, callable(cb), arguments[2]);
	};
};
