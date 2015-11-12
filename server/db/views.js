// Populate predefined view objects with data
// (it's about providing (reactive way) state of first pages on business processes lists)

// See example configurations at:
// https://github.com/egovernment/eregistrations-lomas/blob/master/server/db/views.js

'use strict';

var toNaturalNumber   = require('es5-ext/number/to-pos-integer')
  , getCompare        = require('eregistrations/utils/get-compare')
  , serialize         = require('eregistrations/utils/db-view/serialize')
  , db                = require('../../model/base')
  , users             = require('eregistrations/users/index.js')
  , getUserOrderIndex = require('eregistrations/users/get-default-order-index')
  , envItemsPerPage   = toNaturalNumber(require('../../env').objectsListItemsPerPage)

  , pageLimit = envItemsPerPage || require('eregistrations/conf/objects-list-items-per-page');

var bindCollection = function (collection, snapshot, getIndex) {
	var slice = collection.toArray(getCompare(getIndex)).slice(0, pageLimit)
	  , view = serialize(slice, getIndex);
	if (snapshot.totalSize !== collection.size) snapshot.totalSize = collection.size;
	collection._size.on('change', function (event) { snapshot.totalSize = collection.size; });
	if (view !== snapshot.get(1)) snapshot.set(1, view);
	slice.on('change', function () { snapshot.set(1, serialize(slice, getIndex)); });
};

// Users Admin
bindCollection(users, db.views.usersAdmin, getUserOrderIndex);
