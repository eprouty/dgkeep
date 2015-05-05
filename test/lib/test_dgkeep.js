'use strict';

var dgkeep = require('../../lib/dgkeep');
var winston = require('winston');
var logger = new winston.Logger({transports: [new winston.transports.Console({level:'silly',timestamp:true,colorize:true})]});

describe('dgkeep', function(){
    it ('Should be able to initialize', function(){
        dgkeep(logger);
    });
});
