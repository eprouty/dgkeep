'use strict';
var q = require('q');
var fs = require('fs');
var path = require('path');

module.exports = function (logger, models){
    logger.info('DGKeep starting...');
    var startupPromises = [];
    var initialized = null;
    var dgkeep = {};

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

        startupPromises.push(q.denodeify(fs.readdir)(path.join(__dirname, 'controllers'))
            .then(function(files){
                files.filter(function(file) {
                    return file.indexOf('.js') !== 0;
                })
                .forEach(function(file) {
                    var mod = path.join(__dirname, 'controllers', file);
                    var mixin = require(mod);
                    dgkeep = mixin(logger, dgkeep, models);
                });
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
    dgkeep.isInitialized = function isInitialized(cb){
        if (initialized === null){
            setTimeout(function(){
                isInitialized(cb);
            }, 20);
            return;
        }
        cb(initialized);
    };

    return dgkeep;
};
