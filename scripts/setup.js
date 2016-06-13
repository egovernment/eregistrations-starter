'use strict';

var deferred                  = require('deferred')
  , resolve                   = require('path').resolve
  , generateAppsClientModel   = require('mano/scripts/generate-apps-client-model')
  , generateAppsHtmlIndex     = require('mano/scripts/generate-apps-html-index')
  , generateAppsClientProgram = require('mano/scripts/generate-apps-client-program')
  , generateAppsClientCss     = require('mano/scripts/generate-apps-client-css')
  , generateClientEnv         = require('eregistrations/scripts/generate-client-env')
  , cloudfrontInvalidate      = require('eregistrations/server/scripts/cloudfront-invalidate')
  , dbRecompute               = require('../server/scripts/db-recompute-in-sandbox')
  , i18nScan                  = require('./i18n-scan')
  , env                       = require('../env')
  , appsList                  = require('../server/apps/list')

  , root = resolve(__dirname, '..');

require('debug-ext')('setup').color = 4;

module.exports = function () {
	return deferred.reduce([
		// 1. Generate map of all i18n messages used in a system
		i18nScan,
		// 2. Generate client-side dedicated env.json
		generateClientEnv.bind(null, env, root),
		// 3. Generate client-side fast model loading files
		generateAppsClientModel.bind(null, root, appsList),
		// 4. Generate client-side index.html entry files
		generateAppsHtmlIndex.bind(null, root, appsList),
		// 5. Ensure to have actual state of indexes
		dbRecompute,
		// 6. Generate CSS bundles (clide-side stylesheets)
		!env.dev && generateAppsClientCss.bind(null, root, appsList),
		// 7. Generate JS bundles (client-side programs)
		!env.dev && generateAppsClientProgram.bind(null, root, appsList),
		// 8. Invalidate Cloudfront (if configured)
		env.cloudfront && cloudfrontInvalidate.bind(null, root, appsList, env.cloudfront)
	], function (ignore, next) { return next && next(); }, null);
};
