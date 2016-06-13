'use strict';

var customError    = require('es5-ext/error/custom')
  , callable       = require('es5-ext/object/valid-callable')
  , normalize      = require('es5-ext/string/#/normalize')
  , d              = require('d')
  , rename         = require('fs2/rename')
  , resolve        = require('path').resolve
  , validDb        = require('dbjs/valid-dbjs')
  , typeMap        = require('./lib/type-map')
  , defNameResolve = require('./lib/resolve-file-name')

  , renameOpts = { intermediate: true }
  , defineProperties = Object.defineProperties, defineProperty = Object.defineProperty
  , stringify = JSON.stringify
  , nextTick = process.nextTick;

var handleError = function (err) {
	if (err.code !== 'UNSUPPORTED_FILE_TYPE') throw err;
	console.error(err.message);
};

var invokeOnUpload = function () {
	var result = this.onUpload();
	if (result && (typeof result.done === 'function')) result.done(null, handleError);
};

var scheduleOnUpload = function () {
	if (this.onUpload) nextTick(invokeOnUpload.bind(this));
};

module.exports = function (db, uploadPath/*, nameResolve*/) {
	var nameResolve = arguments[2], unserialize = validDb(db).objects.unserialize
	  , validateCreate = db.File._validateCreate_;

	uploadPath = resolve(String(uploadPath));
	nameResolve = (nameResolve != null) ? callable(nameResolve) : defNameResolve;

	defineProperties(db.File, {
		uploadsInProgress: d([]),
		_validateCreate_: d(function (file) {
			if (!file) return [file];
			if (file.ws && file.headers && file.path && file.name) {
				validateCreate.call(this);
				if (!file.name) this.prototype._validateSet_('name', file.name);
				if (!db.File.accept.has(file.type)) {
					throw customError("Unsupported file type", 'UNSUPPORTED_FILE_TYPE');
				}
				return [file];
			}
			throw new TypeError(file + " does not come from multiparty");
		})
	});

	defineProperty(db.File.prototype, '_initialize_', d(function (file) {
		var filename, path;

		if (!file) return;
		this.name = normalize.call(db.Filename.adapt(file.name));
		this.type = typeMap[file.type] || file.type;

		filename = nameResolve(this, file);
		path = resolve(uploadPath, filename);
		db.File.uploadsInProgress.push(rename(file.path, path)(function () {
			this.path = filename;
			this.diskSize = file.size;
			return this.onUpload();
		}.bind(this)));
	}));

	return {
		validate: function (data) {
			if (!data.id) throw new Error("Upload error: No id");
			if (!data.file) throw new Error("Upload error: Missing file");
			return data;
		},
		submit: function (data) {
			var path, dbFile, filename, desc;

			dbFile = unserialize(data.id);
			if (dbFile._kind_ === 'descriptor') {
				desc = dbFile;
				dbFile = dbFile.object._get_(dbFile._sKey_);
				if (!dbFile) {
					throw new Error("File instance cannot be resolved out of " +
						stringify(desc.__valueId__) +
						". Ensure needed model is defined on database instance");
				}
			}
			filename = nameResolve(dbFile, data.file);
			path = resolve(uploadPath, filename);
			return rename(data.file.path, path, renameOpts)(function () {
				dbFile.path = filename;
				if ((dbFile.name !== data.file.name) || (normalize.call(dbFile.name) !== dbFile.name)) {
					dbFile.name = normalize.call(db.Filename.adapt(data.file.name));
				}
				if (dbFile.type !== data.file.type) dbFile.type = data.file.type;
				dbFile.diskSize = data.file.size;
				if (dbFile.constructor === db.Object) dbFile.once('turn', scheduleOnUpload.bind(dbFile));
				else scheduleOnUpload.call(dbFile);
				return true;
			});
		}
	};
};
