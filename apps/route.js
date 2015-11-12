'use strict';

var db            = require('mano').db
  , camelToHyphen = require('es5-ext/string/#/camel-to-hyphen');

var standardRolesMap = {
	usersAdmin: true,
	metaAdmin: true
};

module.exports = function (req) {
	var user = req.$user && db.User.getById(req.$user), role, businessProcess;
	if (!user) {
		req.$appName = 'public';
	} else {
		role = user.currentRoleResolved;
		if (role === 'user') {
			businessProcess = user.currentBusinessProcess;
			if (!businessProcess) {
				req.$appName = 'user';
			} else {
				if (!businessProcess.isAtDraft) {
					req.$appName = 'business-process-submitted';
				} else { //jslint: ignore
					// TODO: Update after business process app is added
					// req.$appName = 'business-process-?';
				}
			}
		} else if (standardRolesMap.hasOwnProperty(role)) {
			req.$appName = camelToHyphen.call(role);
		}
	}
};
