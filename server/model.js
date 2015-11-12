// Loads model required for main server process

'use strict';

var db = module.exports = require('../model/base');

require('dbjs-ext/string/string-line/password')(db);

require('../model/user/roles');
require('../model/institutions');

require('../model/business-process');

require('../model/views');
