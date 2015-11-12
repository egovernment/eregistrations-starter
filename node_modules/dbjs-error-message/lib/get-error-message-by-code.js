'use strict';

module.exports = function (errorCode) {
	var errorMessageProperty;
	errorMessageProperty = 'error' + errorCode[0] +
		errorCode.substr(1).toLowerCase().replace(/_([a-z0-9])/g, function (m, a) {
			return a.toUpperCase();
		});

	return errorMessageProperty;
};
