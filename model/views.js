// Predefined view objects
// They will contain view strings describing state of first pages on business processes lists

'use strict';

var db          = require('./base')
  , defineViews = require('eregistrations/model/views');

module.exports = defineViews(db).defineProperties({
	pendingBusinessProcesses: {
		type: db.Object,
		nested: true
	},
	usersAdmin: {
		type: db.DataSnapshots,
		nested: true
	}
});

// TODO: On how to configure business process maps, see:
// https://github.com/egovernment/eregistrations-lomas/blob/master/model/views.js
