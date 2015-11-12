'use strict';

var isFalsy = require('eregistrations/utils/is-falsy')
  , db      = require('mano').db;

module.exports = db.BusinessProcess.instances
	.filterByKey('isFromEregistrations', true)
	.filterByKey('isDemo', isFalsy)
	.filterByKey('isSubmitted', true);
