'use strict';

var db = require('../../../db');

var dataFormsRenderer =
	require('eregistrations/server/services/query-memory-db/queries/generate-data-forms-pdf')
	.defaultRenderer;

module.exports = {
	documentFilePaths:
		require('eregistrations/server/services/query-memory-db/queries/document-file-paths')(db),
	generateDataFormsPdf:
		require('eregistrations/server/services/query-memory-db/queries/generate-data-forms-pdf')(db,
			{ renderer: dataFormsRenderer })
};
