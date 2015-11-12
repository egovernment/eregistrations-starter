'use strict';

var assign       = require('es5-ext/object/assign')
  , copy         = require('es5-ext/object/copy')
  , primitiveSet = require('es5-ext/object/primitive-set')
  , resolve      = require('path').resolve
  , db           = require('mano').db
  , env          = require('../../env')

  , driver;

var ignored = primitiveSet();

var autoSaveFilter = function (event) {
	var master = event.object.master;
	if (env.readOnly) return false;
	if (ignored[master.constructor.__id__]) return false;
	if (!db.Object.is(master) && (master.constructor !== db.Base)) return false;
	if (master === master.constructor.prototype) return false;
	return true;
};

if (env.db && env.db.driver) {
	driver = env.db.driver(db, assign(copy(env.db), { autoSaveFilter: autoSaveFilter }));
} else {
	driver = require('dbjs-persistence')(db, {
		path: resolve(__dirname, '../../data/db'),
		autoSaveFilter: autoSaveFilter
	});
}
module.exports = driver;
