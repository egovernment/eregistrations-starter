'use strict';

var assign      = require('es5-ext/object/assign')
  , customError = require('es5-ext/error/custom')
  , db          = require('mano').db
  , _           = require('mano').i18n.bind('Public');

module.exports = assign(exports, require('eregistrations/controller/public'));

exports.login.redirectUrl = '/';
exports.register.redirectUrl = '/';
exports['contact-us'] = {
	validate: function (data) {
		if (!data || !data.name || !data.email || !db.Email.validate(data.email) || !data.suggestion) {
			throw customError(_("Please fill all the fields."),
				"CONTACT_DATA_MISSING", { statusCode: 401 });
		}
		return data;
	}
};
