// Generate client env

'use strict';

var debug     = require('debug-ext')('setup')
  , writeFile = require('fs2/write-file')
  , resolve   = require('path').resolve
  , env       = require('../env')

  , stringify = JSON.stringify
  , writeOpts = { intermediate: true }
  , clientEnvPath = resolve(__dirname, '../apps-common/client/env.json');

module.exports = function () {
	debug('generate-client-env');
	return writeFile(clientEnvPath, stringify({
		static: { host: (env.static && env.static.host) || '/' },
		url: env.url,
		googleAnalytics: env.googleAnalytics,
		i18n: (env.i18n !== false)
	}), writeOpts);
};
