'use strict';

var _ = require('../../_').bind('Model: Institutions')
  , db = require('../base');

module.exports = require('eregistrations/model/institution')(db).newNamed('tic', {
	name: _("Tanzania Investment Center"),
	abbr: _("TIC")
});
