'use strict';

var logger = require('./lib/logger');
var dgkeep = require('./lib/dgkeep');

module.exports = dgkeep(logger);
