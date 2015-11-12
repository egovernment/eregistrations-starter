'use strict';

var normalize = require('./normalize');

module.exports = normalize(require('csslint').CSSLint);
