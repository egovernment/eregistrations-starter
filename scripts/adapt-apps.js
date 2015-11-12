// Runs adapt script on all apps in a system

'use strict';

var deferred                = require('deferred')
  , resolve                 = require('path').resolve
  , generateAppsConf        = require('mano/scripts/generate-apps-conf')
  , generateAppsControllers = require('mano/scripts/generate-apps-controllers')
  , appsList                = require('../server/apps/list')

  , root = resolve(__dirname, '../');

module.exports = function () {
	return deferred(
		generateAppsConf(root, appsList),
		generateAppsControllers(root, appsList)
	);
};
