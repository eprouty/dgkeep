'use strict';
var q = require('q');

module.exports = function (logger, sequelize){
    logger.info('DGKeep starting...');
    var startupPromises = [];
    var initialized = null;

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
        initialized = true;
    }, function(err){
        logger.error('DGKeep failed to initialize');
        initialized = false;
    });

    //---------------------
    //Public API
    //---------------------
    var dgkeep = {};

    dgkeep.isInitialized = function isInitialized(cb){
        if (initialized === null){
            setTimeout(function(){isInitialized(cb);}, 20);
            return;
        }
        cb(initialized);
    }

    return dgkeep;
};
