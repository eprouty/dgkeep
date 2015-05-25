'use strict';

var winston = require('winston');

var LOG_LEVEL = process.env.LOG_LEVEL || 'silly';
winston.add(winston.transports.DailyRotateFile, {filename: './logs/dgkeep.log',
                                                   level:LOG_LEVEL,
                                                   timestamp:true,
                                                   colorize:true,
                                                   json:true,
                                                   datePattern: '.dd-MM-yyyy'});
winston.remove(winston.transports.Console);
winston.add(winston.transports.Console, {level:'debug', timestamp:true, colorize:true});

module.exports = winston;
