// Initialisation of in-memory database engine used across process

'use strict';

var Database = require('dbjs')
  , _        = require('./i18n')
  , d        = require('d');

var db = module.exports = require('mano').db = new Database();

db.locale = 'en';

Object.defineProperty(db.Base, 'chooseLabel', d(_("Choose:")));
Object.defineProperties(db.Boolean, {
	trueLabel: d(_("Yes")),
	falseLabel: d(_("No"))
});
