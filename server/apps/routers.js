// Map of server controllers

'use strict';

var ControllerRouter = require('controller-router');

module.exports = {
	'meta-admin': new ControllerRouter(require('../../apps/meta-admin/server/routes'))
};
