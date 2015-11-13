// Customisation for user-base view

'use strict';

var startsWith = require('es5-ext/string/#/starts-with')
  , db         = require('../db');

// Assure base customisations are loaded
require('./base');
require('eregistrations/view/_business-process-sent-back-info');

module.exports = exports = require('eregistrations/view/user-base');

exports._submittedMenu = function (context) {
	var user = context.user;
	return list(user.roles, function (role) {
		var roleTitle = db.Role.meta[role].label;

		if (role === 'user' && startsWith.call(context.appName, 'business-process-')) {
			return li(form({ method: 'post', action: '/change-business-process/' },
				input({ type: 'hidden',
					name: user.__id__ + '/currentBusinessProcess', value: null }),
				button({ type: 'submit' }, roleTitle)));
		}

		if (user.currentRoleResolved === role) {
			return li({ class: 'submitted-menu-item-active' }, a({ href: '/' }, roleTitle));
		}

		return li(form({ method: 'post', action: '/set-role/' },
			input({ type: 'hidden', name: user.__id__ + '/currentRole', value: role }),
			button({ type: 'submit' }, roleTitle)));
	});
};
