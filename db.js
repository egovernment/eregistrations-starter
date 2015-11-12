'use strict';

var db = require('mano').db
  , _  = require('../_')
  , d  = require('d');

db.locale = 'en';

module.exports = db;

Object.defineProperty(db.Base, 'chooseLabel', d(_("Choose:")));
Object.defineProperties(db.Boolean, {
	trueLabel: d(_("Yes")),
	falseLabel: d(_("No"))
});
