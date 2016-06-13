'use strict';

var db          = require('../../db')
  , defineViews = require('eregistrations/model/views');

module.exports = defineViews(db);
