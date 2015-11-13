// Defines the base Cost class, ensures costs api from eregistrations

'use strict';

var db       = require('../../../db')
  , Cost     = require('eregistrations/model/cost')(db)
  , Currency = require('dbjs-ext/number/currency')(db) // TODO: Replace with currency of a system

  , BusinessProcess;

// To make sure we've got BusinessProcess api
BusinessProcess = require('../base');

module.exports = Cost;

// Set base properties with proper currency settings
Cost.prototype.getDescriptor('amount').type = Currency;
Cost.prototype.getDescriptor('amount').step = 1;
Cost.prototype.getDescriptor('sideAmount').type = Currency;
Cost.prototype.getDescriptor('sideAmount').step = 1;
BusinessProcess.prototype.costs.getDescriptor('totalAmount').type = Currency;
