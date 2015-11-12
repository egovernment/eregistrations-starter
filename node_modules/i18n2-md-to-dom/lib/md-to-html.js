'use strict';

var Remarkable = require('remarkable')

  , md = new Remarkable();

module.exports = function (mdText) { return md.render(mdText).trim(); };
