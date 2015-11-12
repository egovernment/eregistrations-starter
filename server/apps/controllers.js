// Map of all apllication controllers
// This module was initially generated by mano/scripts/generate-apps-controllers

'use strict';

var joinControllers = require('mano/utils/join-controllers');

module.exports = {
	"apps/meta-admin": joinControllers(
		require("../../apps/meta-admin/controller"),
		require("../../apps/meta-admin/controller/server")
	),
	"apps/public": joinControllers(
		require("../../apps/public/controller"),
		require("../../apps/public/controller/server")
	),
	"apps/user": joinControllers(
		require("../../apps/user/controller"),
		require("../../apps/user/controller/server")
	),
	"apps/users-admin": joinControllers(
		require("../../apps/users-admin/controller"),
		require("../../apps/users-admin/controller/server")
	)
};
