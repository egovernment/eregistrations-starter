// Setup & initialize HTTP server

'use strict';

var forEach           = require('es5-ext/object/for-each')
  , resolveModule     = require('cjs-module/resolve')
  , dbjsFile          = require('dbjs-file/server')
  , path              = require('path')
  , parse             = require('querystring').parse
  , cookies           = require('cookies').connect
  , connect           = require('connect')
  , compression       = require('compression')
//  , serveFavicon      = require('serve-favicon')
  , mano              = require('mano')
  , appHtml           = require('mano/lib/server/server/app')
  , appResolver       = require('mano/lib/server/server/app-resolver')
  , appLegacySettings = require('mano/lib/server/server/app-legacy-settings')
  , bodyParser        = require('mano/lib/server/server/body-parser')
  , getCss            = require('mano/lib/server/server/get-css')
  , clientId          = require('mano/lib/server/server/client-id')
  , getRouter         = require('mano/lib/server/server/get')
  , post              = require('mano/lib/server/server/post')
  , webmake           = require('mano/lib/server/server/webmake')
  , serverSentEvents  = require('mano/lib/server/server/server-sent-events')
  , st                = require('mano/lib/server/server/static')
  , authentication    = require('mano-auth/server/authentication')
  , getPostRouter     = require('mano/server/post-router')
  , basePostRoutes    = require('mano/controller/server')
  , archiver          = require('eregistrations/server/business-process-files-archiver')
  , documentArchiver  = require('eregistrations/server/business-process-document-files-archiver')
  , db                = require('../db')
  , appsConf          = require('./apps/conf')
  , appsList          = require('./apps/list')
  , appsControllers   = require('./apps/controllers')

  , basename = path.basename, resolve = path.resolve
  , create = Object.create

  , root = resolve(__dirname, '..'), uploadsDir = resolve(root, 'uploads');

basePostRoutes.upload = dbjsFile(db, uploadsDir);

module.exports = function () {
	var app = connect(), env = require('../env'), webmakeRoutes, cssRoutes, postRoutes = create(null)
	  , appViewPaths = mano.appRoutes = create(null), uploadsMiddleware;

	// Favicon
	// TODO: Uncomment as soon as favicon is provided
	// app.use(serveFavicon(resolve(root, 'public/favicon.ico')));

	// Turn on response GZIP compression
	app.use(compression());

	// Serve system common static files
	app.use(st(resolve(root, 'public'), env));

	// Serve eRegistrations common static files
	app.use(st(resolve(root, 'node_modules/eregistrations/public'), env));

	// Serve static files from 'uploads' folder
	app.use(uploadsMiddleware = st(uploadsDir, env, { cache: { fd: false } }));

	// Serve and generate business process zip archives on demand
	app.use(archiver.archiveServer(db, {
		uploadsPath: uploadsDir,
		env: env,
		stMiddleware: uploadsMiddleware
	}));

	// Serve and generate document zip archives on demand
	app.use(documentArchiver.archiveServer(db, {
		uploadsPath: uploadsDir,
		env: env,
		stMiddleware: uploadsMiddleware
	}));

	// Parse cookies
	app.use(cookies());

	// Resolve Client Id
	app.use(clientId);

	if (env.dev) {
		// Serve client JS and CSS bundles on the fly
		webmakeRoutes = create(null);
		cssRoutes = create(null);
		forEach(appsConf, function (conf, appPath) {
			var appName = basename(appPath), appRoot = resolve(root, appPath);
			webmakeRoutes['/' + appName + '.js'] = {
				path: resolve(appRoot, 'client/program.js'),
				tplsPath: resolve(root, appPath, conf.viewPath)
			};
			resolveModule(appRoot, './client/legacy').done(function (modulePath) {
				if (!modulePath) return;
				webmakeRoutes['/' + appName + '.legacy.js'] = { path: modulePath };
			});

			cssRoutes['/' + appName + '.css'] = resolve(appRoot, 'client/css.index');
			cssRoutes['/' + appName + '-legacy.css'] = cssRoutes['/' + appName + '.css'];
			cssRoutes['/' + appName + '-print.css'] = resolve(appRoot, 'client/css-print.index');
		});
		app.use(webmake.bind(webmakeRoutes));
		app.use(getCss().bind(cssRoutes));
	}

	// Serve static files from app public folders
	appsList.forEach(function (appPath) {
		app.use(st(resolve(root, appPath, 'public'), env));
	});

	// Authenticate user
	app.use(authentication.sessionMiddleware);
	app.use(authentication.logoutMiddleware);

	// Resolve app
	app.use(appResolver);
	app.use(appLegacySettings(appsConf));

	// Parse GET Query and mime type
	app.use(function (req, res, next) {
		req.query = req._parsedUrl.query ? parse(req._parsedUrl.query) : {};
		req._mime = (req.headers['content-type'] || '').split(';')[0];
		next();
	});

	// Parse POST requests
	app.use(bodyParser({
		uploadDir: resolve(root, env.tmpFolder || 'tmp'),
		limit: '100mb'
	}));

	// Process POST requests
	forEach(appsControllers, function (controllers, appPath) {
		postRoutes[basename(appPath)] = getPostRouter(controllers, mano.legacyPool);
	});
	app.use(post.bind(postRoutes));

	// Handle Server -> Client update stream
	app.use(serverSentEvents);

	// Process server-side app GET requests
	app.use(getRouter(require('./apps/routers')));

	// Process app GET requests (serve app HTML)
	forEach(appsConf, function (conf, appPath) {
		appViewPaths[basename(appPath)] = resolve(root, appPath, conf.viewPath || 'view');
	});
	app.use(appHtml.bind(appViewPaths));

	// Stop process in case of unhandled error
	app.use(function (err, req, res, next) {
		process.nextTick(function () { throw err; });
	});

	return app;
};
