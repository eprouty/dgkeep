'use strict';
var q = require('q');

module.exports = function (logger, sequelize, cb){
    logger.info('DGKeep starting...');
    var startupPromises = [];

    if(sequelize){
        startupPromises.push(sequelize.authenticate().then(function() {
            logger.info('Connection has been established successfully.');
        }, function(err) {
            logger.error('Unable to connect to the database:', err);
            throw err;
        }));
    }

    q.all(startupPromises).done(function(){
        logger.info('DGKeep initialized');
        cb();
    }, function(err){
        logger.error('DGKeep failed to initialize');
        cb(err);
    });
};
