// Indexes for computed and reduced values resolution

'use strict';

var isFalsy           = require('eregistrations/utils/is-falsy')
  , businessProcesses = require('../../apps-common/business-processes-submitted')
  , driver            = require('mano').dbDriver

  , db = driver.db;

// App resolution
driver.indexKeyPath('appAccessId', db.User.filterByKey('password')).done();
driver.indexKeyPath('appName', db.User.filterByKey('password')).done();

// Users table
driver.indexCollection('isActiveAccount',
	db.User.filterByKey('password').filterByKey('isDemo', isFalsy)).done();

// Business processes table
driver.indexKeyPath('searchString', businessProcesses).done();
