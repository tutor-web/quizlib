#!/usr/bin/env node
var fs = require('fs');
var path = require('path');

var reporter = require('nodeunit').reporters.default;

process.chdir(__dirname);
reporter.run(fs.readdirSync('.').filter(function (str) {
    return str !== path.basename(__filename) && /\.js$/.test(str);
}), null, function (err) {
    // NB: The reporter only reports. Without this we exit 0 however many
    // assertions failed, and "npm test" sails straight past a broken build
    process.exit(err ? 1 : 0);
});
