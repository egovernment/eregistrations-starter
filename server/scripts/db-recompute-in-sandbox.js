'use strict';

var resolve    = require('path').resolve
  , runProgram = require('eregistrations/server/utils/run-program')

  , scriptPath = resolve(__dirname, '../../bin/db-recompute');

module.exports = function () { return runProgram(scriptPath); };
