'use strict';

Error.stackTraceLimit = Infinity;

var copy             = require('es5-ext/object/copy')
  , forEach          = require('es5-ext/object/for-each')
  , toArray          = require('es5-ext/object/to-array')
  , path             = require('path')
  , DbjsEvent        = require('dbjs/_setup/event')
  , debugLoad        = require('debug-ext')('load', 6)
  , debug            = require('debug-ext')('start-service', 2)
  , mano             = require('mano')
  , archiver         = require('eregistrations/server/business-process-files-archiver')
  , documentArchiver = require('eregistrations/server/business-process-document-files-archiver')
  , env              = require('../../../env')
  , postListener     = require('mano/server/post-slave')
  , appsConf         = require('../../apps/conf')

  , create = Object.create
  , basename = path.basename, resolve = path.resolve
  , root = env.root = resolve(__dirname, '../../..')
  , uploadsDir = resolve(root, 'uploads'), db, dbService;

require('../../../i18n');
db = require('../../../db');
dbService = require('../../services/db/emitter');

mano.uploadsPath = resolve(root, 'uploads');

mano.apps = toArray(appsConf, function (appConf, appPath) {
	appConf = copy(appConf);
	appConf.name = basename(appPath);
	appConf.root = resolve(root, appPath);
	return appConf;
}).sort(function (a, b) {
	return (isNaN(a.order) ? 0 : a.order) - (isNaN(b.order) ? 0 : b.order);
});

mano.mail = require('mano/lib/server/mailer').setup(env.smtp);

debugLoad('model');
DbjsEvent.stampZeroMode = true;
require('../../model');
DbjsEvent.stampZeroMode = false;

dbService();

var dbjsFile = require('dbjs-file/server')
  , uploadsHandler = dbjsFile(mano.db, uploadsDir)
  , appsControllers = require('./apps-post-controllers')
  , getPostRouter   = require('mano/server/post-slave-router');

process.send({ type: 'init' });

process.once('message', function (message) {
	var postRoutes;
	if (message.type !== 'continue') {
		console.log(message);
		throw new Error("Unrecognized emitter message");
	}

	debug('db indexes (computed)');
	require('../../db/indexes');

	debug('memory-db query handler');
	require('eregistrations/server/services/query-memory-db')(require('./process-query-routes'));

	debug('uploaded files converter');
	require('eregistrations/server/services/on-upload');

	debug('status log generator');
	require('eregistrations/server/services/status-log');

	debug('uploads status log generator');
	require('eregistrations/server/services/uploads-status-log')(db);

	debug('notifications mailer');
	require('eregistrations/server/services/notifications');

	debug('business-process flow handler');
	require('../../services/business-process-flow');

	debug('business process files zip archiver');
	archiver.filenameResetService(mano.db, { uploadsPath: mano.uploadsPath });

	debug('document files zip archiver');
	documentArchiver.filenameResetService(mano.db, { uploadsPath: mano.uploadsPath });

	debug('post requests handler');
	postRoutes = create(null);
	forEach(appsControllers, function (controllers, appPath) {
		controllers.upload = uploadsHandler;
		postRoutes[basename(appPath)] = getPostRouter(controllers);
	});
	postListener(postRoutes);

	require('eregistrations/server/services/ipc-messenger');

	require('eregistrations/server/services/debug-time')('memory-db');
});
