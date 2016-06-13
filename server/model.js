// Loads model required for main server process

'use strict';

var db = module.exports = require('../db');

require('dbjs-ext/string/string-line/password')(db);

require('../model/user/roles');
require('../model/user/recently-visited/business-processes');
require('../model/institutions');

// TODO: Remove below line as soon as first business process is configured
require('../model/business-process');

// Ensure domId property on sections
require('eregistrations/view/dbjs/form-section-base-dom-id');

require('../model/views');
