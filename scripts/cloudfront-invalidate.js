'use strict';

var forEach          = require('es5-ext/object/for-each')
  , deferred         = require('deferred')
  , resolve          = require('path').resolve
  , createHash       = require('crypto').createHash
  , inspect          = require('util').inspect
  , createReadStream = require('fs').createReadStream
  , invalidate       = deferred.promisify(require('invalidatejs'))
  , readFile         = require('fs2/read-file')
  , writeFile        = require('fs2/write-file')
  , readdir          = require('fs2/readdir')
  , resolveApps      = require('mano/scripts/resolve-apps')

  , root = resolve(__dirname, '../')
  , cachePath = resolve(root, '.cloudfront')
  , parse = JSON.parse, stringify = JSON.stringify;

module.exports = function () {
	var old, nu = {}, result = [], conf = require('../env').cloudfront;
	if (!conf) throw new TypeError("No cloudfront configuration found");
	return deferred(
		readFile(cachePath)(parse).catch({}).aside(function (data) { old = data; }),
		resolveApps(root)
			.map(function (app) {
				var dir = resolve(app.root, 'public');
				return readdir(dir, { type: { file: true }, depth: Infinity })
					.map(function (path) {
						var hash, def, fd, fullPath;
						if (path === '.gitignore') return;
						hash = createHash('sha1');
						def = deferred();
						fullPath = resolve(dir, path);
						fd = createReadStream(fullPath);
						hash.setEncoding('hex');
						fd.on('error', def.reject);
						fd.on('end', function () {
							hash.end();
							hash = hash.read();
							if (nu[path]) console.error("Duplicate path in " + fullPath);
							nu[path] = hash;
							def.resolve();
						});
						fd.pipe(hash);
						return def.promise;
					});
			})
	)(function () {
		forEach(nu, function (hash, path) {
			if (old[path] !== hash) result.push('/' + path);
		});
		if (!result.length) {
			console.log("All up to date");
			return;
		}
		console.log("Invalidate: ", result);
		return invalidate({
			resourcePaths: result,
			secret_key: conf.secret,
			access_key: conf.key,
			dist: conf.distribution
		}).spread(function (statusCode, body) {
			console.log("Code: ", statusCode);
			console.log(inspect(body, { depth: 20, colors: true }));
			return writeFile(cachePath, stringify(nu));
		});
	});
};
