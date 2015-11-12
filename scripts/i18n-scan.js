// Scan (detect) all i18n messages in a project, and save to i18n-scan-map

'use strict';

var debug    = require('debug-ext')('setup')
  , i18nScan = require('mano/scripts/i18n-scan')
  , resolve  = require('path').resolve

  , root = resolve(__dirname, '..')
  , nodeModulesPath = resolve(root, 'node_modules');

var extraPaths = [
	resolve(nodeModulesPath, 'eregistrations'),
	resolve(nodeModulesPath, 'mano'),
	resolve(nodeModulesPath, 'mano-auth')
];

module.exports = function () {
	debug.open('i18n-scan');
	var promise = i18nScan(root, { extraPaths: extraPaths });
	promise.on('progress', debug.progress);
	return promise.finally(debug.close);
};
