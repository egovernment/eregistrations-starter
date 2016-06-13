'use strict';

var forEach                    = require('es5-ext/object/for-each')
  , db                         = require('../../db')
  , processingStepsMeta        = require('../../apps-common/processing-steps/meta')
  , BusinessProcessesSnapshots = db.Object.extend('BusinessProcessesSnapshots');

module.exports = require('./base').defineProperties({
	businessProcesses: {
		type: BusinessProcessesSnapshots,
		nested: true
	}
});

var defineStatus = function (key) {
	this.define(key, {
		type: db.DataSnapshots,
		nested: true
	});
};

forEach(processingStepsMeta, function (meta, stepShortPath) {
	BusinessProcessesSnapshots.prototype.define(stepShortPath, { type: db.Object, nested: true });
	Object.keys(meta).forEach(defineStatus, BusinessProcessesSnapshots.prototype[stepShortPath]);
});
