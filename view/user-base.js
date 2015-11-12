// Customisation for user-base view

'use strict';

var db = require('mano').db;

// Assure base customisations are loaded
require('./base');
require('eregistrations/view/_business-process-sent-back-info');

module.exports = exports = require('eregistrations/view/user-base');

exports._submittedMenu = function (context) {
	var user = context.user;
	return list(user.roles, function (role) {
		var roleTitle = db.Role.meta[role].label;

		if (user.currentRoleResolved === role) {
			return li({ class: 'submitted-menu-item-active' }, a({ href: '/' }, roleTitle));
		}

		return li(form({ method: 'post', action: '/set-role/' },
			input({ type: 'hidden', name: user.__id__ + '/currentRole', value: role }),
			button({ type: 'submit' }, roleTitle)));
	});
};
