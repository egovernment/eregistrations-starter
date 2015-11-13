// Initialisation of messages translations handler, which should be used
// across system processes

'use strict';

module.exports = require('mano').i18n = require('i18n2')(require('./i18n-messages'));
