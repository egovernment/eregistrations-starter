// Adapts newly created application
// Precisely, creates needed scripts

'use strict';

var deferred                       = require('deferred')
  , generateAppClientModelScript   = require('mano/scripts/generate-app-client-model-script')
  , generateAppClientProgramScript = require('mano/scripts/generate-app-client-program-script')
  , generateAppHtmlIndexScript     = require('mano/scripts/generate-app-html-index-script');

module.exports = function (appPath) {
	return deferred(
		// Generate app specific scripts:
		// 1. Script that generates client model
		generateAppClientModelScript(appPath),
		// 2. Script that generates bundled JS files
		generateAppClientProgramScript(appPath),
		// 3. Script that generates index html
		generateAppHtmlIndexScript(appPath)
	);
};
