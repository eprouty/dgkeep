'use strict';

var logger = require('./lib/logger');
var dgkeep = require('./lib/dgkeep');
var models = require('./models');

module.exports = dgkeep(logger, models);
