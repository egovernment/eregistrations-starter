// Data access/propagation rules for apps

'use strict';

var endsWith            = require('es5-ext/string/#/ends-with')
//  , find                = require('es5-ext/object/find')
  , uncapitalize        = require('es5-ext/string/#/uncapitalize')
  , memoize             = require('memoizee/plain')
  , Set                 = require('es6-set')
  , once                = require('timers-ext/once')
  , ObservableSet       = require('observable-set')
  , Fragment            = require('data-fragment/group')
  , db                  = require('../db')
//  , getCompare          = require('eregistrations/utils/get-compare')
  , limitObjectsList    = require('eregistrations/utils/limit-objects-list')
  , unserializeView     = require('eregistrations/utils/db-view/unserialize')
  , getFullFragments    = require('eregistrations/server/data-fragments/get-full-data-fragments')
  , getPartFragments    = require('eregistrations/server/data-fragments/get-part-data-fragments')
  , getIndexedFragments = require('eregistrations/server/data-fragments/get-indexed-data-fragments')
  , getManyFragments    = require('eregistrations/server/data-fragments/get-many-data-fragments')
  , bpListProps         = require('../apps-common/business-process-list-properties')
  , bpListComputedProps = require('../apps-common/business-process-list-computed-properties')
  , userListProps       = require('../apps-common/user-list-properties')
  , dbDriver            = require('../server/db/persistent')
  , users               = require('eregistrations/users/index')

  , getObjectFragment = getFullFragments(db.Object)
  , isOfficialRole = RegExp.prototype.test.bind(/^official[A-Z]/)
  , getBusinessProcessFragment = getFullFragments(db.BusinessProcess);
//  , getDefault = function (conf) { return conf.default; };

// Full user data for logged-in user
var getUserFragment = getFullFragments(db.User, {
	filter: function (event) { return !endsWith.call(event.object.__valueId__, '/password'); }
});

// Users admin specific fragment
var getListUserFragment = getPartFragments(db.User, userListProps);

var getVisitedUsersFragment = function (userId, roleName) {
	var list = db.User.getById(userId).visitedUsers;
	limitObjectsList(list, users);
	return getManyFragments(list, getListUserFragment);
};

// Official roles fragments
var applicableBusinessProcesses = {
	// TODO: fill as here:
	// https://github.com/egovernment/eregistrations-lomas/blob/
	//   652cac843d9c81269a158e3c52d10f9e08644906/apps/access.js#L64-L70
};

// TOOD: Uncomment on first use
// var getPreferred = function (map, getOrderIndex) {
//	return find(map, getDefault).data.toArray(getCompare(getOrderIndex));
// };

var preferredBusinessProcesses = {
	// TODO: fill as here:
	// https://github.com/egovernment/eregistrations-lomas/blob/
	//   652cac843d9c81269a158e3c52d10f9e08644906/apps/access.js#L78-L91
};

var getListBusinessProcessFragment = getPartFragments(db.BusinessProcess, bpListProps);

var getListComputedBusinessProcessFragment = getIndexedFragments(dbDriver, bpListComputedProps);

var getVisitedBusinessProcessesFragment = function (userId, roleName) {
	var list = db.User.getById(userId).visitedBusinessProcesses[roleName];
	limitObjectsList(list, applicableBusinessProcesses[roleName], {
		preferred: preferredBusinessProcesses[roleName]
	});
	return getManyFragments(list);
};

var getViewsObjects = function (views, type) {
	var objects = new ObservableSet();
	var refresh = function () {
		var nu = new Set();
		views.forEach(function (snapshot) {
			if (!(snapshot instanceof db.DataSnapshots)) return;
			unserializeView(snapshot.get(1), type).forEach(nu.add, nu);
		});
		objects.reload(nu);
	};
	refresh();
	refresh = once(refresh);
	views.forEach(function (snapshot, key) {
		if (!(snapshot instanceof db.DataSnapshots)) return;
		snapshot.getObservable(1).on('change', refresh);
	});
	return objects;
};

var getViewObjects = function (view, type) {
	var objects = new ObservableSet();
	var refresh = function () {
		var nu = new Set();
		unserializeView(view.get(1), type).forEach(nu.add, nu);
		objects.reload(nu);
	};
	refresh();
	view.getObservable(1).on('change', refresh);
	return objects;
};

var getListBusinessProcessFragments = memoize(function (views) {
	var businessProcesses = getViewsObjects(views, db.BusinessProcess);
	return [
		getManyFragments(businessProcesses, getListBusinessProcessFragment),
		getManyFragments(businessProcesses, getListComputedBusinessProcessFragment)
	];
});

var getPendingBusinessProcessesLimitedFragment = memoize(function (roleName) {
	return getManyFragments(preferredBusinessProcesses[roleName].slice(0, 10),
		getBusinessProcessFragment);
});

module.exports = memoize(function (appId) {
	var userId, roleName, shortRoleName, custom, fragment, view, views, businessProcess;
	appId = appId.split('.');
	userId = appId[0];
	roleName = appId[1];
	custom = appId[2];

	fragment = new Fragment();

	if (!db.User.getById(userId)) return fragment; // Database change, user doesn't exist

	// In all cases: User profile data
	fragment.addFragment(getUserFragment(userId));

	if (!roleName) return fragment.flush(); // Temporary inconsistent state (client migration)

	if (roleName === 'user') {
		// User role:
		if (custom) {
			businessProcess = db.BusinessProcess.getById(custom);
			while (businessProcess.previousBusinessProcess) {
				// - Previous business process to business update
				businessProcess = businessProcess.previousBusinessProcess;
				fragment.addFragment(getBusinessProcessFragment(businessProcess.__id__));
			}
			// - Business process data
			fragment.addFragment(getBusinessProcessFragment(custom));
		} else {
			// - My Account, data for all business processes
			fragment.addFragment(getManyFragments(db.User.getById(userId).businessProcesses,
				getBusinessProcessFragment));
		}
		return fragment.flush();
	}
	if (roleName === 'metaAdmin') {
		// Meta admin role (nothing to add at this point)
		return fragment.flush();
	}
	if (roleName === 'statistics') {
		// Statitistics role (TODO)
		return fragment.flush();
	}
	if (roleName === 'usersAdmin') {
		// Users admin role
		view = db.views.usersAdmin;
		// - List of visited users
		fragment.addFragment(getVisitedUsersFragment(userId));
		// - Users data for first page of users list
		//   (rest will be propagated on demand via different channel)
		fragment.addFragment(getManyFragments(getViewObjects(view, db.User), getListUserFragment));
		// - View of first page of users list
		fragment.addFragment(getObjectFragment(view.__id__));
		return fragment.flush();
	}

	if (isOfficialRole(roleName)) {
		// Official role:
		shortRoleName = uncapitalize.call(roleName.slice('official'.length));
		// - Full data for recently visited business processes
		fragment.addFragment(getVisitedBusinessProcessesFragment(userId, shortRoleName));
		// - Full data of recently pending business proceses
		fragment.addFragment(getPendingBusinessProcessesLimitedFragment(shortRoleName));
		views = db.views.pendingBusinessProcesses[shortRoleName];
		// - Views of business process table first pages
		fragment.addFragment(getObjectFragment(views.__id__));
		// - Brief data of business processes shown on first pages in business processes table
		getListBusinessProcessFragments(views).forEach(fragment.addFragment, fragment);
		// (rest will be propagated on demand via different channel)
		return fragment.flush();
	}
	console.error("\n\nError: Unrecognized role " + roleName + "\n\n");
	return fragment.flush();
});
