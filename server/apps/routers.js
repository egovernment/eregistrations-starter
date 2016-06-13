// Map of server controllers

'use strict';

var ControllerRouter = require('controller-router');

module.exports = {
	'business-process-submitted':
		new ControllerRouter(require('../../apps/business-process-submitted/server/routes')),
	'meta-admin': new ControllerRouter(require('../../apps/meta-admin/server/routes')),
	user: new ControllerRouter(require('../../apps/user/server/routes')),
	'users-admin': new ControllerRouter(require('../../apps/users-admin/server/routes'))
};
