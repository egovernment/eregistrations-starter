// Map of server controllers
// Should be filled as:
//
// 'app-name': new ControllerRouter(require('../../apps/app-name/server/routes')),

'use strict';

var ControllerRouter = require('controller-router');

module.exports = {
	'meta-admin':
		new ControllerRouter(require('../../apps/meta-admin/server/routes'))
};
