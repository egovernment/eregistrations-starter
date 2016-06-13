// Customisation for user-base view

'use strict';

var startsWith   = require('es5-ext/string/#/starts-with')
  , uncapitalize = require('es5-ext/string/#/uncapitalize')
  , db           = require('../db');

// Assure base customisations are loaded
require('./base');
require('eregistrations/view/components/business-process-sent-back-info');

module.exports = exports = require('eregistrations/view/user-base');

exports._submittedMenu = function (context) {
	var user = this.manager || this.user;

	return list(user.roles, function (role) {
		var roleTitle = db.Role.meta[role].label, shortRoleName, pendingCount;

		if (role === 'user' && startsWith.call(this.appName, 'business-process-')) {
			return li(exports._getMyAccountButton(user, roleTitle));
		}

		if (startsWith.call(role, 'official')) {
			shortRoleName = uncapitalize.call(role.slice('official'.length));

			pendingCount = db.views.businessProcesses[shortRoleName].get('pending')._totalSize;

			if (user.currentRoleResolved === role) {
				return li({ class: 'submitted-menu-item-active' }, a({ href: '/' }, roleTitle,
					' (', pendingCount, ')'));
			}

			return li(form({ method: 'post', action: '/set-role/' },
				input({ type: 'hidden', name: user.__id__ + '/currentRole', value: role }),
				button({ type: 'submit' }, roleTitle, ' (', pendingCount, ')')));
		}

		if (user.currentRoleResolved === role) {
			if (user.currentRoleResolved === 'manager') {
				if (this.appName === 'manager' || this.appName === 'manager-registration') {
					return li({ class: 'submitted-menu-item-active' }, a({ href: '/' }, roleTitle));
				}
				return li({ class: 'submitted-menu-item-active' },
					exports._getManagerButton(user, roleTitle));
			}
			return li({ class: 'submitted-menu-item-active' }, a({ href: '/' }, roleTitle));
		}

		return li(form({ method: 'post', action: '/set-role/' },
			input({ type: 'hidden', name: user.__id__ + '/currentRole', value: role }),
			button({ type: 'submit' }, roleTitle)));
	}.bind(this));
};
