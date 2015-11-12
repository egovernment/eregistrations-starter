'use strict';

var db   = require('../../../model/base')
  , User = require('../../../model/user/roles');

require('dbjs-ext/string/string-line/password')(db);

User.prototype.$password.type = db.Password;

module.exports = db;
