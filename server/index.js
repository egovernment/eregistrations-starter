'use strict';

var copy              = require('es5-ext/object/copy')
  , toArray           = require('es5-ext/object/to-array')
  , DbjsEvent         = require('dbjs/_setup/event')
  , readFileSync      = require('fs').readFileSync
  , path              = require('path')
  , debugLoad         = require('debug-ext')('load')
  , debug             = require('debug-ext')('start-service')
  , i18n              = require('i18n2')
  , mano              = require('mano')
  , appsConf          = require('./apps/conf')

  , basename = path.basename, resolve = path.resolve
  , root = resolve(__dirname, '..')
  , stdout   = process.stdout.write.bind(process.stdout);

module.exports = function () {
	var env = require('../env'), ssl, port, server;

	// Expose env
	// TODO: Always refer to env module (never through mano.env)
	mano.env = env;
	env.root = root;

	// Expose uploads path
	// TODO: either treat as hardcoded or provide resolution module
	mano.uploadsPath = resolve(root, 'uploads');

	// Expose i18n
	// TODO: Provide i18n module and always refer it (never through mano.i18n)
	mano.i18n = i18n((env.i18n === false) ? null : require('../i18n-messages'));

	// Expose mailer
	// TODO: provide resolution module (do not rely on mano)
	mano.mail = require('mano/lib/server/mailer').setup(env.smtp);

	// Expose apps on mano
	// TODO: We should not rely on mano.apps
	mano.apps = toArray(appsConf, function (appConf, appPath) {
		appConf = copy(appConf);
		appConf.name = basename(appPath);
		appConf.root = resolve(root, appPath);
		return appConf;
	}).sort(function (a, b) {
		return (isNaN(a.order) ? 0 : a.order) - (isNaN(b.order) ? 0 : b.order);
	});

	debugLoad.open('db model');
	DbjsEvent.stampZeroMode = true;
	require('./model');
	DbjsEvent.stampZeroMode = false;
	debugLoad.close();

	debugLoad.open('db data');
	require('./db/persistent').loadAll().on('progress', debugLoad.progress).done(function (events) {
		var httpServerApp, Client;
		stdout(' [' + events.length + ' objects]');
		debugLoad.close();

		if (env.legacyPool !== false) env.legacyPool = true;
		if (env.legacyPool) {
			debug('server-side html renderer');
			mano.legacyPool = require('mano/lib/server/legacy-pool')(env);
		}

		debug('db data saver');
		require('./db');

		debug('db indexes');
		require('./db/indexes');

		debug('uploaded files converter');
		require('eregistrations/server/on-upload');

		debug('status log generator');
		require('eregistrations/server/status-log');

		debug('notifications mailer');
		require('eregistrations/server/notifications');

		debug('db views populator');
		require('./db/views');

		Client = require('mano/lib/server/client');
		debugLoad.open('db data access rules');
		Client.getAppFragment = require('../apps/access');
		debugLoad.close();

		// Provide dataPath folder to save client states
		Client.dataPath = resolve(root, 'tmp');

		// Configure & start server
		ssl = env.ssl;
		if (isNaN(env.port)) port = (ssl ? 443 : 80);
		else port = Number(env.port);
		httpServerApp = require('./http-server-app');
		if (ssl) {
			debug('https server [' + port + ']');
			mano.httpServer = server = require('https').createServer({
				key: ssl.key && readFileSync(resolve(root, ssl.key)),
				cert: ssl.cert && readFileSync(resolve(root, ssl.cert)),
				pfx: ssl.pfx && readFileSync(resolve(root, ssl.pfx)),
				passphrase: ssl.passphrase
			}, httpServerApp());
		} else {
			debug('http server [' + port + ']');
			mano.httpServer = server = require('http').createServer(httpServerApp());
		}
		server.on('error', function (err) {
			console.error("Server error!");
			throw err;
		});
		server.on('close', function () { throw new Error("Server closed!"); });
		server.listen(port);

		require('eregistrations/server/ipc-messenger');

		require('eregistrations/server/debug-time');
	});
};
