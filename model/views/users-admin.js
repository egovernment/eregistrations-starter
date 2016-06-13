'use strict';

var db = require('../../db');

module.exports = require('./base').defineProperties({
	usersAdmin: {
		type: db.DataSnapshots,
		nested: true
	}
});
