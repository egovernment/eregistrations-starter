// Populate predefined view objects with data
// (it's about providing (reactive way) state of first pages on business processes lists)

'use strict';

var assign                  = require('es5-ext/object/assign')
  , deferred                = require('deferred')
  , memoize                 = require('memoizee')
  , debug                   = require('debug-ext')('view-snapshot')
  , getDbSet                = require('eregistrations/server/utils/get-db-set')
  , getDbArray              = require('eregistrations/server/utils/get-db-array')
  , trackFirstPage          = require('eregistrations/server/view-tracker/first-page')
  , trackStep               = require('eregistrations/server/view-tracker/processing-step')
  , driver                  = require('mano').dbDriver
  , processingStepsMeta     = require('../../apps-common/processing-steps/meta')
  , businessProcessStorages = require('../business-process-storages')

  , stringify = JSON.stringify
  , resolved = deferred(null)
  , userStorage = driver.getStorage('user')
  , reducedStorage = driver.getReducedStorage();

var trackerOptions = {
	userStorage: userStorage,
	reducedStorage: reducedStorage,
	itemsPerPage: require('../../env').objectsListItemsPerPage
};

module.exports = memoize(function (viewPath) {
	var tokens = viewPath.split('/'), stepShortPath, meta, storages;

	debug('intialize %s', viewPath);

	if (viewPath === 'usersAdmin') {
		// Users Admin
		return getDbSet(userStorage, 'computed', 'isActiveAccount', '11')(function (set) {
			return getDbArray(set, userStorage, 'direct', null)(function (array) {
				return trackFirstPage(userStorage, 'usersAdmin', set, array, trackerOptions);
			});
		});
	}

	if (tokens[0] === 'businessProcesses') {
		tokens.shift();
		if (tokens.length !== 1) {
			console.error("\n\nUnrecognized view path " + stringify(viewPath) + "\n\n");
			return resolved;
		}
		stepShortPath = tokens.shift();
		meta = processingStepsMeta[stepShortPath];
		if (meta) {
			storages = meta._services.map(function (name) {
				return businessProcessStorages[name];
			});
			return trackStep(stepShortPath, meta, assign({
				businessProcessStorage: storages
			}, trackerOptions));
		}
		console.error("\n\nUnrecognized view path " + stringify(viewPath) + "\n\n");
		return resolved;
	}
	console.error("\n\nUnrecognized view path " + stringify(viewPath) + "\n\n");
}, { primitive: true });
