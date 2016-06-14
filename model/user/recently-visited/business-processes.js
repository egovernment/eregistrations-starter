// Predefined groups of recentlyVisited.businessProcesses collections
// Those collections will be LRU handled to provide full data for
// recently visited business processes

'use strict';

var forEach             = require('es5-ext/object/for-each')
  , db                  = require('../../../db')
  , processingStepsMeta = require('../../../apps-common/processing-steps/meta');

module.exports = require('eregistrations/model/user/recently-visited/business-processes')(db);

var recentlyVisited = db.User.prototype.recentlyVisited.businessProcesses;

forEach(processingStepsMeta, function (meta, stepShortPath) {
	var pathTokens = stepShortPath.split('/'), target = recentlyVisited, token;
	while (pathTokens.length > 1) {
		token = pathTokens.shift();
		if (!target[token]) target.define(token, { type: db.Object, nested: true });
		target = target[token];
	}
	target.define(pathTokens[0], { multiple: true });
});
