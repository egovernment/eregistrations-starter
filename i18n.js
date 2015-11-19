// Initialisation of messages translations handler, which should be used
// across system processes

'use strict';

var env      = require('mano').env
  , passI18n = require('eregistrations/utils/pass-i18n');

module.exports = require('mano').i18n = require('i18n2')(passI18n(env, require('./i18n-messages')));
