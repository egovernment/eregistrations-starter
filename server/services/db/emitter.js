'use strict';

var EmitterHandler    = require('dbjs-persistence/emitter')
  , setupLocalEmitter = require('eregistrations/server/services/db/local/emitter')
  , db                = require('../../../db')
  , storageNames      = require('./storage-names');

module.exports = function () {
	var emitterHandler = new EmitterHandler(db);
	setupLocalEmitter(emitterHandler, storageNames);
};
