'use strict';

var d           = require('d')
  , isError     = require('es5-ext/error/is-error')
  , customError = require('es5-ext/error/custom')
  , typeMap     = require('./lib/type-map')

  , defineProperty = Object.defineProperty;

module.exports = function (db, FormData, XMLHttpRequest, File, url) {
	var validateCreate = db.File._validateCreate_;

	defineProperty(db.File, '_validateCreate_', d(function (file) {
		if (file.constructor !== File) return new TypeError(file + " is not a File instance");
		validateCreate.call(this);
		if (!file.name) this.prototype._validateSet_('name', file.name);
		if (!db.File.accept.has(file.type)) {
			// Workaround for Firefox bug that's kept for generations to come:
			// https://bugzilla.mozilla.org/show_bug.cgi?id=373621#c69
			if ((file.type !== 'application/x-download') || !db.File.accept.has('application/pdf')) {
				throw customError("Unsupported file type", 'UNSUPPORTED_FILE_TYPE');
			}
		}
		return [file];
	}));

	defineProperty(db.File.prototype, '_initialize_', d(function (file) {
		var fd, xhr, onError;

		fd = new FormData();
		xhr = new XMLHttpRequest();
		fd.append('file', file);
		fd.append('id', this.__id__);

		onError = function (e) {
			this.emit('error', e);
			this.database.objects.delete(this);
		}.bind(this);

		xhr.open('POST', url, true);
		xhr.onload = function (data) {
			if (isError(data)) onError(data);
			else if ((xhr.status < 200) || (xhr.status >= 300)) onError(new Error(xhr.responseText));
		};
		xhr.onerror = function () { onError(new Error("Error occured")); };
		xhr.onabort = function () { onError(new Error("Operation aborted")); };
		xhr.upload.onabort = xhr.onabort;
		xhr.upload.onprogress = this.emit.bind(this, 'upload-progress');
		xhr.send(fd);

		this.name = db.Filename.adapt(file.name);
		this.type = typeMap[file.type] || file.type;
	}));
};
