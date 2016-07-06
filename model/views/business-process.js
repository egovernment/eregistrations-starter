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
	var pathTokens = stepShortPath.split('/'), target = BusinessProcessesSnapshots.prototype;
	do {
		if (!target[pathTokens[0]]) target.define(pathTokens[0], { type: db.Object, nested: true });
		target = target[pathTokens.shift()];
	} while (pathTokens.length);
	Object.keys(meta).forEach(defineStatus, target);
});
