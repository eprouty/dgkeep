'use strict';
var winston = require('winston');
var LOG_LEVEL = process.env.LOG_LEVEL || 'silly';
var logger = new winston.Logger({transports: [new winston.transports.Console({level:'debug', timestamp:true, colorize:true}),
                                              new winston.transports.DailyRotateFile({filename: './logs/dgkeep.log',
                                                                           level:LOG_LEVEL,
                                                                           timestamp:true,
                                                                           colorize:true,
                                                                           json:true,
                                                                           datePattern: '.dd-MM-yyyy'})]});
logger.info('DGKeep starting...');
