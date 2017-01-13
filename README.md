# eRegistrations Starter

__Warning: This project is updated on-demand basis. If you want to setup new eRegistrations system, please contact project authors to confirm whether its codebase us up to date and safe for initialization of new a system__

For more information about eRegistrations project see [help.eregistrations.org](http://help.eregistrations.org/)

### To initialize new system proceed with following steps:

- Clone this repository into folder where you wish to develop new system
- Remove .git folder
- Run `npm rebuild`
- Run `node bin/initialise` (it will setup: `public`, `users-admin`, `meta-admin`, `user` and `business-process-submitted` applications for you)
- Remove `bin/initialise` script from repository
- In `package.json` replace occurrences of _eregistrations-CHANGEME_ with proper system name
- Update application title (as it's expected to be seen in browser) in `view/base.js` file
- Define correct system currency `model/business-process/costs/base.js`  _(if you don't have that information yet, this step can be done later)_
- Replace dummy system logo with right one at `public/img/logo.png` _(if you don't have logo yet, this step can be done later)_
- Provide system favicon.ico at `public/favicon.ico` and uncomment corresponding line at `server/http-server-app.js` _(if you don't have favicon yet, this step can be done later)_
- Replace content of this `README.md` document with system specific information
- Update LICENSE for the project (if MIT one is not intended)
- Initialize repository for the new system, and push initial state to Github

Before you start the system, you need to provide environment settings (`env.js`) first, they can be as minimal as below:

```javascript
'use strict';

module.exports = require('mano').env = {
	// Development or production environment
	// If true then client JS and CSS bundles are refreshed at each request
	// (no server restarts are needed to see changes in client specific code)
	// Additionally note:
	// - Any model changes require full server restarts to be propagated
	// - Any changes to server side script require restarts of server process
	//   (can done via be `npm run quick-start)
	dev: true,

	// HTTP server port
	// Must not be taken by any other app in your environment
	port: 3000,

	// URL at which application would be served
	// Information used e.g. for email notifications, but also for cookies resolution
	// It must be accurate, for application to work properly
	url: "http://localhost:3000/",

	// Legacy pool functionality
	// It's about server-side HTML rendering for legacy browsers. Leave it to "true"
	legacyPool: true,

	// Secret string
	// Random string (as typed by your cat).
	// Used to maintain authentication sessions between server restarts
	secret: "asdfq31321423",

	// SMTP settings
	// Set `logOnly: true`, if you do not which to send any real email but prefer to see
	// them just in server log
	smtp: {
		from: "eRegistrations <eregistrations@eregistrations.org>",
		logOnly: true
	}
};
```

Fully initialized system can be run via `npm start`
