'use strict';

var process = require('../../process');

module.exports = function (t, a) {
	a(process('::root { --some-var: rgba(100, 100, 100, 0.5); --other-var: 13px amr-sdf; }\n' +
		'body div { }\n' +
		'div.erel { color: white; margin: var(--some-var); padding: 10px; }\n' +
		'div marko { marg: var(--other-var); elos: var(--some-var); }\n' +
		'div msdfs { marg: var(--other-var); elos: var(--other-var); }', [t]),
		'body div { }\n' +
		'div.erel { color: white; margin: rgba(100, 100, 100, 0.5); padding: 10px; }\n' +
		'div marko { marg: 13px amr-sdf; elos: rgba(100, 100, 100, 0.5); }\n' +
		'div msdfs { marg: 13px amr-sdf; elos: 13px amr-sdf; }');

	a(process('/* */\n::root { --some-var: rgba(100, 100, 100, 0.5); --other-var: 13px amr-sdf; }\n' +
		'body div { }\n' +
		'div.erel { color: white; margin: var(--some-var); padding: 10px; }\n' +
		'div marko { marg: var(--other-var); elos: var(--some-var); }\n' +
		'div msdfs { marg: var(--other-var); elos: var(--other-var); }', [t]),
		'/* */\nbody div { }\n' +
		'div.erel { color: white; margin: rgba(100, 100, 100, 0.5); padding: 10px; }\n' +
		'div marko { marg: 13px amr-sdf; elos: rgba(100, 100, 100, 0.5); }\n' +
		'div msdfs { marg: 13px amr-sdf; elos: 13px amr-sdf; }');
};
