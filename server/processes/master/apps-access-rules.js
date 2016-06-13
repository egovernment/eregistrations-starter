'use strict';

var aFrom               = require('es5-ext/array/from')
  , configure           = require('eregistrations/server/configure-apps-access-rules')
  , mano                = require('mano')
  , db                  = require('../../../db')
  , processingStepsMeta = require('../../../apps-common/processing-steps/meta')

  , dbDriver = mano.dbDriver;

module.exports = configure(db, dbDriver, {
	processingStepsMeta: processingStepsMeta,
	initializeView: require('../../db/views'),
	businessProcessListProperties:
		aFrom(require('../../../apps-common/business-process-list-properties'))
		.concat(aFrom(require('../../../apps-common/business-process-list-computed-properties')))
});
