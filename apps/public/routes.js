// Configuration of URL routes for a public website

'use strict';

var viewTree = require('./view');

module.exports = {
	'/': viewTree.home,
	'about-us': viewTree.about,
	contact: viewTree.contact,
	'reset-password': viewTree.resetpswd,
	help: viewTree.helpInvolved,
	'help/presentation': viewTree.helpInvolved,
	'help/user-manual': viewTree.helpManualFileGuide,
	'help/user-manual/file': viewTree.helpManualFileGuide,
	'help/user-manual/file/guide': viewTree.helpManualFileGuide,
	'help/user-manual/file/form': viewTree.helpManualFileForm,
	'help/user-manual/file/documents': viewTree.helpManualFileDocuments,
	'help/user-manual/payment': viewTree.helpManualPayment,
	'help/user-manual/certificates': viewTree.helpManualCertifs,
	'help/admin': viewTree.adminProcedures,
	'help/admin/procedures': viewTree.adminProcedures,
	'help/admin/datas': viewTree.adminDatas,
	'help/admin/users': viewTree.adminUsers,
	'help/admin/translation': viewTree.adminTrad
};
