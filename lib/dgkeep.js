'use strict';
var q = require('q');

module.exports = function (logger, models){
    logger.info('DGKeep starting...');
    var startupPromises = [];
    var initialized = null;

    if(models){
        startupPromises.push(models.sequelize.authenticate().then(function() {
            logger.info('Connection has been established successfully.');
        })
        .then(function(){
            return models.sequelize.sync({});
        })
        .then(function(){
            logger.info('Models synced to database');
        }));
    }

    q.all(startupPromises).done(function(){
        logger.info('DGKeep initialized');
        initialized = true;
    }, function(err){
        logger.error('DGKeep failed to initialize', err);
        initialized = false;
    });

    //---------------------
    //Public API
    //---------------------
    var dgkeep = {};

    dgkeep.isInitialized = function isInitialized(cb){
        if (initialized === null){
            setTimeout(function(){
                isInitialized(cb);
            }, 20);
            return;
        }
        cb(initialized);
    };

    dgkeep = require('./players')(logger, dgkeep, models);
    dgkeep = require('./courses')(logger, dgkeep, models);
    dgkeep = require('./holes')(logger, dgkeep, models);
    dgkeep = require('./rounds')(logger, dgkeep, models);

    return dgkeep;
};
