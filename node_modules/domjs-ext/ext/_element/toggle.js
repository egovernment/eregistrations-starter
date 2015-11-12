'use strict';

var isObservable = require('observable-value/is-observable-value')
  , ext          = require('domjs/ext/_element')

  , toggle = ext.toggle;

ext.toggle = function (value) {
	if (!isObservable(value)) return toggle.call(this, value);
	toggle.call(this, value.value);
	value.on('change', function (event) { toggle.call(this, event.newValue); }.bind(this));
};
