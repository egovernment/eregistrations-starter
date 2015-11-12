'use strict';

var assign = require('es5-ext/object/assign');

module.exports = assign(exports, require('eregistrations/controller/public/client'));

exports['contact-us'] = {
	remoteSubmit: true
};
