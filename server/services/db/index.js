'use strict';

var resolve       = require('path').resolve
  , debug         = require('debug-ext')('start-service')
  , FragmentGroup = require('data-fragment/group')
  , service       = require('eregistrations/server/services/db')
  , env           = require('../../../env')
  , db            = require('../../../db')
  , queryMemoryDb = require('../../processes/master/query-memory-db')
  , storageNames  = require('./storage-names')

  , root = resolve(__dirname, '../../../');

module.exports = function () {
	return service(root, {
		dbDriverConf: env.db,
		storageNames: storageNames,
		getMemoryUserFragment: function (objId) {
			return require('eregistrations/server/data-fragments/get-direct-object-fragments')()(objId);
		},
		getMemoryInitialFragment: function () {
			var getOfficialsFragment = require('eregistrations/server/utils/get-officials-fragment')
			  , driver = require('mano').dbDriver
			  , fragment = new FragmentGroup();

			fragment.addFragment(getOfficialsFragment(db, driver.getStorage('user')));
			return fragment;
		},
		registerSlaveProcess: function (memoryDbProcess) {
			debug('master query handler');
			require('eregistrations/server/services/query-master')(
				require('../../processes/master/process-query-routes'),
				memoryDbProcess
			);
			queryMemoryDb.registerAsEmitter(memoryDbProcess);
		}
	});
};
