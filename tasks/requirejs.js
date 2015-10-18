/**
 * Compiles JS files using r.js
 */
module.exports = function(grunt) {
	var requirejs = require("requirejs");

	requirejs.define("node/print", [], function() {
		return function(msg) {
			if (msg.substring(0, 5) === "Error") {
				grunt.log.errorlns(msg);

				grunt.fail.warn("RequireJS failed.");
			}
			else {
				grunt.log.oklns(msg);
			}
		};
	});

	grunt.registerTask("requirejs", "Build a RequireJS project.", function(flag) {
		requirejs.optimize({
			logLevel: 2,
			baseUrl: "build/js/",
			out: "build/js/app.js",
			mainConfigFile: "build/js/app.js",
			stubModules: ["widgetTemplate", "text", "json"],
			optimize: flag === "webstore" ? "uglify2" : "none",

			// By including the main app file this way we ensure that the widget
			// modules are registered before require is switched to "sync mode" (
			// see app.js)
			include: (grunt.option("widgetModules") || []).concat("app")
		}, this.async());
	});
};