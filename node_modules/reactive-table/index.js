'use strict';

var aFrom            = require('es5-ext/array/from')
  , assign           = require('es5-ext/object/assign')
  , pluck            = require('es5-ext/function/pluck')
  , d                = require('d')
  , autoBind         = require('d/auto-bind')
  , lazy             = require('d/lazy')
  , memoize          = require('memoizee/weak-plain')
  , validateDocument = require('dom-ext/document/valid-document')
  , replaceContent   = require('dom-ext/element/#/replace-content')
  , makeElement      = require('dom-ext/document/#/make-element')
  , normalize        = require('dom-ext/document/#/normalize')
  , isTableCell      = require('html-dom-ext/table-cell/is')
  , List             = require('./list')

  , map = Array.prototype.map
  , noop = Function.prototype;

var Table = module.exports = function (document, list, columns) {
	this.document = validateDocument(document);
	this.makeElement = makeElement.bind(document);
	if (list != null) {
		if (!(list instanceof List)) throw new TypeError(list + " is not an instance of list");
		this.list = list;
		this.list.on('change', this.reload);
	}
	this.setup(columns);
};

var renderRow = function (item) {
	var el = this.makeElement;
	return el('tr',
		this.cellRenderers.map(function (render, index) {
			var cell = render(item);
			return isTableCell(cell) ? cell : el('td', { class: this.columnsConf[index].class }, cell);
		}, this));
};

Object.defineProperties(Table.prototype, assign({
	setup: d(function (columns) {
		var el = this.makeElement;
		this.columnsConf = columns = aFrom(columns);
		if (!columns.length) throw new TypeError("There must be at least one column");

		// Table
		this.table = el('table');

		// Head
		if (columns.some(function (column) { return column.head != null; })) {
			this.table.appendChild(this.head = el('thead', el('tr', columns.map(function (column) {
				var cell = normalize.call(this.document, column.head);
				return isTableCell(cell) ? cell : el('th', { class: column.class }, cell);
			}, this))));
		}

		// Body
		this.body = this.table.appendChild(el('tbody'));

		// Configure column renderers
		this.cellRenderers = columns.map(function (options, index) {
			if (options.data == null) return noop;
			if (typeof options.data === 'function') return options.data;
			return pluck(options.data);
		}, this);
	}),
	toDOM: d(function () { return this.table; })
}, lazy({
	renderRow: d(function () { return memoize(renderRow.bind(this)); }),
	emptyRow: d(function () {
		var el = this.makeElement;
		return el('tr', { class: 'empty' },
			el('td', { colspan: this.cellRenderers.length }, "No data"));
	})
}), autoBind({
	reload: d(function (list) {
		if (!list) list = this.list.result;
		replaceContent.call(this.body, list.length ? map.call(list, this.renderRow) : this.emptyRow);
	})
})));
