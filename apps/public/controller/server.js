'use strict';

var assign      = require('es5-ext/object/assign')
  , customError = require('es5-ext/error/custom')
  , mano        = require('mano')
  , _           = require('../../../_').bind("Public")

  , registerSubmit;

module.exports = assign(exports, require('eregistrations/controller/public/server'));

registerSubmit = exports.register.submit;

exports.register.submit = function (data) {
	return registerSubmit.apply(this, arguments)(function (result) {
		this.target.roles.add('user');
		return result;
	}.bind(this));
};

exports['contact-us'] = {
	submit: function (data) {
		if (!mano.mail) {
			throw customError("Mail could not be sent because no valid email configuration is present." +
					"Please check env.smtp.",
				"MAIL_NOT_SENT_MAIL_NOT_DEFINED");
		}
		if (!mano.env.smtp || !mano.env.smtp.contactFormReceiver) {
			throw customError("Mail could not be sent because " +
					"no configuration for mano.env.smtp.contactFormReceiver was found.",
				"MAIL_NOT_SENT_NO_CONTACT_OR_SMTP_DEFINED");
		}
		var mailContent = {
			subject: "Comment from Tanzania Investment Window",
			text: "Sender: " + data.name + " - " + data.email + "\r\n" + data.suggestion,
			html: '<p style="font-size: 14px; color: #585858">Sender: ' + data.name +
				' - <span style="color: #69A0EB">'
				+ data.email + '</span></p><br/>'
				+ data.suggestion,
			from: data.email,
			to: mano.env.smtp.contactFormReceiver
		};
		mano.mail(mailContent).done(null, function (err) {
			console.log("Cannot send email", err.stack);
		});
		return { message: _("Thank you for your suggestion.") };
	}
};
