'use strict';

var d                 = require('d')
  , isObservableValue = require('observable-value/is-observable-value')

  , defineProperties = Object.defineProperties
  , clear, toDOM, toDOMAttr, getValue, setValue, onNextTick;

clear = function () {
	delete this._domInjected;
	delete this.toDOM;
	delete this.toDOMAttr;
	delete this.value;
};
toDOM = function (document) {
	clear.call(this);
	return this.toDOM.apply(this, arguments);
};
toDOMAttr = function (element, name) {
	clear.call(this);
	return this.toDOMAttr.apply(this, arguments);
};
getValue = function () {
	clear.call(this);
	return this.value;
};
setValue = function (nu) {
	clear.call(this);
	this.value = nu;
};

onNextTick = function () {
	if (!this.hasOwnProperty('_domInjected')) return;
	throw new TypeError("Unconsumed observable\n\n" +
		"Possibly result of '_if' (or similar) domjs extension was neither inserted into " +
		"any of the DOM elements nor set as an attribute value.\n\n" +
		"Results for extensions that return observables must be injected directly into elements " +
		"(eventually passthru via 'insert' function). Otherwise they won't be injected " +
		"automatically by the view engine (as it's the case with results of base domjs functions");
};

module.exports = function (observable) {
	if (!isObservableValue(observable)) return observable;
	defineProperties(observable, {
		_domInjected: d(false),
		toDOM: d(toDOM),
		toDOMAttr: d(toDOMAttr),
		value: d.gs(getValue, setValue)
	});
	// Naturally we should use `nextTick`, still it appears as "too fast" in firefox
	// (some DOM rendering is split among event loops)
	setTimeout(onNextTick.bind(observable), 0);
	return observable;
};
