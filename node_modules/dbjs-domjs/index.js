'use strict';

var field    = require('./field')
  , fieldset = require('./fieldset')
  , input    = require('./input');

module.exports = function (domjs) {
	field(domjs);
	fieldset(domjs);
	input(domjs);
};
