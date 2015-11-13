// All user roles

'use strict';

var _  = require('../../i18n')
  , db = require('../../db');

module.exports = require('eregistrations/model/user')(db);

db.Role.members.add('metaAdmin');
db.Role.members.add('user');
db.Role.members.add('usersAdmin');

db.Role.meta.get('metaAdmin').label = _("Meta Admin");
db.Role.meta.get('user').label = _("User");
db.Role.meta.get('usersAdmin').label = _("Users Admin");
