// Indexes for computed and reduced values resolution

'use strict';

var forEach                    = require('es5-ext/object/for-each')
  , capitalize                 = require('es5-ext/string/#/capitalize')
  , Set                        = require('es6-set')
  , mano                       = require('mano')
  , db                         = require('../../db')
  , businessProcesses          = require('../../apps-common/business-processes')
  , businessProcessesSubmitted = require('../../apps-common/business-processes/submitted')
  , processingSteps            = require('../../apps-common/processing-steps')
  , businessProcessStorages    = require('../business-process-storages')

  , driver = mano.dbDriver

  , userAccounts = db.User.filterByKey('email').filterByKey('password')
  , visitableUsers = userAccounts.or(db.User.filterByKey('isDemo', true))
  , managerClients = db.User.filterByKey('manager')
  , managers = userAccounts.filterByKey('roles', function (roles) { return roles.has('manager'); })
  , userStorage = driver.getStorage('user');

// App resolution
userStorage.indexKeyPath('appAccessId', visitableUsers).done();
userStorage.indexKeyPath('appName', visitableUsers).done();
// Resolved roles is used in server GET routes conf map resolver
userStorage.indexKeyPath('currentRoleResolved', userAccounts.filterByKey('currentRoleResolved'))
	.done();

// Users table
userStorage.indexCollection('isActiveAccount', userAccounts).done();
userStorage.indexKeyPath('fullName', userAccounts).done();

userStorage.indexKeyPath('managerDataForms/progress',
	managers.filterByKeyPath('managerDataForms/progress', 1)).done();
userStorage.indexKeyPath('isManagerActive',
	managers.filterByKey('isManagerActive', true)).done();
userStorage.indexKeyPath('isManagerDesctructionBlocker', managerClients).done();
userStorage.indexKeyPath('canManagedUserBeDestroyed', managerClients).done();
userStorage.indexKeyPath('canManagerBeDestroyed', managers).done();

userStorage.indexKeyPath('searchString', userAccounts).done();

forEach(businessProcessStorages, function (storage, name) {
	// Needed for My Account
	storage.indexKeyPath('status', businessProcesses[name]).done();
	storage.indexKeyPath('certificates/applicable', businessProcesses[name]).done();
	// Needed for Part B search
	storage.indexKeyPath('searchString', businessProcessesSubmitted[name]).done();
	// Needed for print forms generator
	storage.indexKeyPath('dataForms/lastEditStamp', businessProcesses[name]).done();
});

// Statuses and sort indexes
forEach(processingSteps, function (meta, stepShortPath) {
	var keyPaths = new Set()
	  , storages = {};

	meta._services.forEach(function (name) { storages[name] = businessProcessStorages[name]; });

	forEach(meta, function (conf) { keyPaths.add(conf.indexName); });

	keyPaths.forEach(function (keyPath) {
		forEach(storages, function (storage, name) {
			storage.indexKeyPath(keyPath, businessProcessesSubmitted[name]
				.filterByKeyPath(meta.all.indexName, meta.all.indexValue)).done();
		});
	});
});

// Computed properties
require('../../apps-common/business-process-list-computed-properties').forEach(function (keyPath) {
	forEach(businessProcessStorages, function (storage, name) {
		if (storage._indexes[keyPath]) return; // Already configured
		// Filter not applicable to given service
		if (!db['BusinessProcess' + capitalize.call(name)].prototype.resolveSKeyPath(keyPath)) return;
		storage.indexKeyPath(keyPath, businessProcessesSubmitted[name]).done();
	});
});
