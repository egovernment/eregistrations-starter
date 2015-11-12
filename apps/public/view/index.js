// Configuration of view tree (relations between view files)

'use strict';

// Base markup (contains <head> and base <body> structure)
exports.base = {
	// Title of a page (Important for SEO, will be displayed in browser tab,
	// can be customized per view)
	title: "TIW",
	// <head> content
	head: require('./html/head'),
	// <body> content
	body: require('./html/body')
};

// Homepage view
exports.home = {
	// Extends base view...
	_parent: exports.base,
	// ...changes content of <main> element to:
	main: require('./html/home'),
	body: {
		class: { fixedFooter: true }
	}
};

// 404 page
exports.notFound = {
	// Extends base view...
	_parent: exports.base,
	// ...changes content of <main> element to:
	main: require('./html/404')
};

exports.extrapages = {
	_parent: exports.base,
	body: {
		class: { inpage: true }
	},
	sectionNav: {
		content: require('./html/topnav-extra')
	}
};

exports.about = {
	_parent: exports.extrapages,
	main: require('./html/about'),
	'btn-about': {
		class: { active: true }
	},
	'btn-reset': {
		class: { hidden: true }
	}

};

exports.contact = {
	_parent: exports.extrapages,
	main: require('./html/contact'),
	'btn-contact': {
		class: { active: true }
	},
	'btn-reset': {
		class: { hidden: true }
	},
	body: {
		class: { fixedFooter: true }
	}
};

exports.resetpswd = {
	_parent: exports.extrapages,
	main: require('./html/reset-password'),
	'btn-about': {
		class: { hidden: true }
	},
	'btn-contact': {
		class: { hidden: true }
	},
	'btn-reset': {
		class: { active: true }
	}
};

/* HELP */

exports.help = {
	_parent: exports.base,
	body: {
		class: { inpage: true }
	},
	sectionNav: require('./html/help/topnav'),
	main: require('./html/help/index')
};

exports.helpInvolved = {
	_parent: exports.help,
	"btn-help-involve": {
		class: { active: true }
	},
	navNext: {
		class: { hidden: false },
		attributes: { href: '/help/user-manual/file/guide', 'data-original-title': 'User Manual' }
	},
	helpContent: require('./html/help/presentation')
};

exports.helpManual = {
	_parent: exports.help,
	"btn-help-manual": {
		class: { active: true }
	},
	helpContent: require('./html/help/manual/index')
};

exports.helpManualFile = {
	_parent: exports.helpManual,
	"navsection-file": {
		class: { active: true }
	},
	"resp-navsection-file": {
		class: { hidden: false }
	},
	sectionContent: require('./html/help/manual/file/index')
};

exports.helpManualFileGuide = {
	_parent: exports.helpManualFile,
	"sidenav-guide": {
		class: { active: true }
	},
	"sidenav-guide-m": {
		class: { active: true }
	},
	navPrev: {
		class: { hidden: false },
		attributes: { href: '/help/presentation',
			'data-original-title': 'Presesntation' }
	},
	navNext: {
		class: { hidden: false },
		attributes: { href: '/help/user-manual/file/form',
			'data-original-title': 'User Manual > File > Form' }
	},
	guidespy: {
		class: { 'nav-spy': true }
	},
	expContent: require('./html/help/manual/file/guide')
};

exports.helpManualFileForm = {
	_parent: exports.helpManualFile,
	"sidenav-form": {
		class: { active: true }
	},
	"sidenav-form-m": {
		class: { active: true }
	},
	navPrev: {
		class: { hidden: false },
		attributes: { href: '/help/user-manual/file/guide',
			'data-original-title': 'User Manual > File > Guide' }
	},
	navNext: {
		class: { hidden: false },
		attributes: { href: '/help/user-manual/file/documents',
			'data-original-title': 'User Manual > File > Documents' }
	},
	formspy: {
		class: { 'nav-spy': true }
	},
	expContent: require('./html/help/manual/file/form')
};

exports.helpManualFileDocuments = {
	_parent: exports.helpManualFile,
	"sidenav-documents": {
		class: { active: true }
	},
	"sidenav-documents-m": {
		class: { active: true }
	},
	navPrev: {
		class: { hidden: false },
		attributes: { href: '/help/user-manual/file/form',
			'data-original-title': 'User Manual > File > Form' }
	},
	navNext: {
		class: { hidden: false },
		attributes: { href: '/help/user-manual/payment',
			'data-original-title': 'User Manual > Payment' }
	},
	expContent: require('./html/help/manual/file/documents')
};

exports.helpManualPayment = {
	_parent: exports.helpManual,
	"navsection-payment": {
		class: { active: true }
	},
	"resp-navsection-payment": {
		class: { hidden: false }
	},
	navPrev: {
		class: { hidden: false },
		attributes: { href: '/help/user-manual/file/documents',
			title: 'User Manual > Guide > Documents' }
	},
	navNext: {
		class: { hidden: false },
		attributes: { href: '/help/user-manual/certificates',
			'data-original-title': 'User Manual > Certificates' }
	},
	sectionContent: require('./html/help/manual/payment')
};

exports.helpManualCertifs = {
	_parent: exports.helpManual,
	"navsection-certificates": {
		class: { active: true }
	},
	"resp-navsection-certificates": {
		class: { hidden: false }
	},
	navPrev: {
		class: { hidden: false },
		attributes: { href: 'help/user-manual/payment',
			'data-original-title': 'User Manual > Payment' }
	},
	sectionContent: require('./html/help/manual/certificates')
};

/* --- CREAR ADMIN --- */

exports.admin = {
	_parent: exports.help,
	'btn-admin': {
		class: { invisibleLink: false, 'pull-right': false }
	},
	'btn-help-involve': {
		class: { hidden: true }
	},
	'btn-help-manual': {
		class: { hidden: true }
	},
	helpContent: require('./html/help/admin/admin')
};

exports.adminProcedures = {
	_parent: exports.admin,
	'navAdmin-procedures': {
		class: { active: true }
	},
	navNext: {
		class: { hidden: false },
		attributes: { href: '/help/admin/datas',
			'data-original-title': 'Admin > Datas' }
	},
	adminContent: require('./html/help/admin/procedures')
};

exports.adminDatas = {
	_parent: exports.admin,
	'navAdmin-datas': {
		class: { active: true }
	},
	navPrev: {
		class: { hidden: false },
		attributes: { href: '/help/admin/procedures',
			'data-original-title': 'Admin > Procedures' }
	},
	navNext: {
		class: { hidden: false },
		attributes: { href: '/help/admin/users',
			'data-original-title': 'Admin > Users' }
	},
	adminContent: require('./html/help/admin/datas')
};

exports.adminUsers = {
	_parent: exports.admin,
	'navAdmin-users': {
		class: { active: true }
	},
	navPrev: {
		class: { hidden: false },
		attributes: { href: '/help/admin/datas',
			'data-original-title': 'Admin > Datas' }
	},
	navNext: {
		class: { hidden: false },
		attributes: { href: '/help/admin/translation',
			'data-original-title': 'Admin > Translation' }
	},
	adminContent: require('./html/help/admin/users')
};

exports.adminTrad = {
	_parent: exports.admin,
	'navAdmin-trad': {
		class: { active: true }
	},
	navPrev: {
		class: { hidden: false },
		attributes: { href: '/help/admin/users',
			'data-original-title': 'Admin > Users' }
	},
	adminContent: require('./html/help/admin/translation')
};
