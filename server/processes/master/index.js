'use strict';

var path      = require('path')
  , debugLoad = require('debug-ext')('load')
  , debug     = require('debug-ext')('start-service')
  , mano      = require('mano')
  , DbjsEvent = require('dbjs/_setup/event')
  , env       = require('../../../env')

  , resolve = path.resolve
  , root = resolve(__dirname, '../../..')
  , dbService;

env.root = root;

require('../../../i18n');
require('../../../db');

dbService = require('../../services/db');

mano.mail = require('mano/lib/server/mailer').setup(env.smtp);

// TODO: Remove it when model will no longer be needed in this process
DbjsEvent.stampZeroMode = true;
require('../../model');
DbjsEvent.stampZeroMode = false;

debug('db persistence');
dbService().done(function () {
	var httpServerApp, Client, port, server, driver = mano.dbDriver;

	debug('db indexes (reduced)');
	require('../../db/indexes');

	Client = require('mano/lib/server/client');
	debugLoad('db data access rules');
	Client.getAppFragment = require('./apps-access-rules');
	Client.dataPath = resolve(root, 'tmp');

	if (env.legacyPool !== false) env.legacyPool = true;
	if (env.legacyPool) {
		debug('server-side html renderer');
		mano.legacyPool = require('mano/lib/server/legacy-pool')(env);
	}

	debug('recently visited lists limiter');
	require('eregistrations/server/services/recently-visited-limiter')(driver.getStorage('user'));

	debug('inactive demo users cleanup');
	require('eregistrations/server/services/clear-demo-users')(driver);

	debug('data forms print reset service');
	require('eregistrations/server/business-process-data-forms-print').filenameResetService({
		uploadsPath: resolve(root, 'uploads')
	});

	debug('manager relations sizes computer');
	require('eregistrations/server/services/compute-manager-relations-sizes')(driver).done();

	debug('compute processing times');
	require('eregistrations/server/services/compute-processing-time')(driver,
		require('../../../apps-common/processing-steps/meta'));

	// Configure & start server
	if (isNaN(env.port)) port = 80;
	else port = Number(env.port);
	httpServerApp = require('../../services/http-server');
	debug('http server [' + port + ']');
	mano.httpServer = server = require('http').createServer(httpServerApp());
	server.on('error', function (err) {
		console.error("Server error!");
		throw err;
	});
	server.on('close', function () { throw new Error("Server closed!"); });
	server.listen(port);

	require('eregistrations/server/services/debug-time')('master');
});
