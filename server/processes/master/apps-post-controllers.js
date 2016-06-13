// Map of all apllication controllers

'use strict';

var copy            = require('es5-ext/object/copy')
  , joinControllers = require('mano/utils/join-controllers')
  , globalRoutes    = require('mano/controller/server');

var publicGlobalRoutes = copy(globalRoutes);
delete publicGlobalRoutes.dbupdate;

var publicRoutes = joinControllers(
	require("../../../apps/public/controller"),
	require("../../../apps/public/controller/server-master"),
	{ extendedOnly: true, globalRoutes: publicGlobalRoutes }
);

var nonPublicGlobalRoutes = copy(globalRoutes);
globalRoutes.login = publicRoutes.login;

var joinOptions = { extendedOnly: true, globalRoutes: nonPublicGlobalRoutes };

module.exports = {
	"apps/business-process-submitted": joinControllers(
		require("../../../apps/business-process-submitted/controller"),
		null,
		joinOptions
	),
	"apps/meta-admin": joinControllers(
		require("../../../apps/meta-admin/controller"),
		null,
		joinOptions
	),
	"apps/public": publicRoutes,
	"apps/user": joinControllers(
		require("../../../apps/user/controller"),
		null,
		joinOptions
	),
	"apps/users-admin": joinControllers(
		require("../../../apps/users-admin/controller"),
		null,
		joinOptions
	)
};
