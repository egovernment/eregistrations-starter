'use strict';

var assign                = require('es5-ext/object/assign')
  , callable              = require('es5-ext/object/valid-callable')
  , trunc                 = require('es5-ext/math/trunc')
  , d                     = require('d')
  , autoBind              = require('d/auto-bind')
  , lazy                  = require('d/lazy')
  , ee                    = require('event-emitter')
  , once                  = require('timers-ext/once')
  , validateObservableSet = require('observable-set/valid-observable-set')

  , max = Math.max;

var List = module.exports = function (set, compare) {
	this._set = validateObservableSet(set);
	if (compare !== undefined) callable(compare);
	this._compare = compare;
	this.update();
};

var update = function () {
	var list = this.set.toArray(this.compare), from;
	if (this.filter) list = list.filter(this.filter);
	if (this.reverse) list = list.reverse();
	if (isFinite(this.limit)) {
		from = (this.page - 1) * this.limit;
		list = list.slice(from, from + this.limit);
	}
	if (list === this.result) return;
	if (this.result) this.result.off('change', this.changeListener);
	this.result = list;
	this.result.on('change', this.changeListener);
	this.emit('change');
};

ee(Object.defineProperties(List.prototype, assign({
	_page: d(1),
	_limit: d(Infinity),
	set: d.gs(function () { return this._set; }, function (set) {
		if (validateObservableSet(set) === this._set) return;
		this._set = set;
		this._page = 1;
		this.update();
	}),
	compare: d.gs(function () { return this._compare; }, function (compare) {
		if (compare === this._compare) return;
		if (compare !== undefined) callable(compare);
		this._compare = compare;
		this.update();
	}),
	reverse: d.gs(function () { return this._reverse; }, function (reverse) {
		reverse = Boolean(reverse);
		if (reverse === this._reverse) return;
		this._reverse = reverse;
		this.update();
	}),
	filter: d.gs(function () { return this._filter; }, function (filter) {
		if (filter === this._filter) return;
		if (filter !== undefined) callable(filter);
		this._filter = filter;
		this.update();
	}),
	page: d.gs(function () { return this._page; }, function (page) {
		page = max(trunc(page) || 0, 1);
		if (page === this._page) return;
		this._page = page;
		this.update();
	}),
	limit: d.gs(function () { return this._limit; }, function (limit) {
		limit = max(trunc(limit) || Infinity, 1);
		if (limit === this._limit) return;
		this._limit = limit;
		this.update();
	})
}, autoBind({
	changeListener: d(function () { this.emit('change'); })
}), lazy({
	update: d(function () { return once(update); })
}))));
